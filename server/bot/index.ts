import { Client, GatewayIntentBits, Events, type Interaction } from "discord.js";
import { commandHandler } from "../commands/index.js";
import { storage } from "../db/index.js";

let client: Client;

export async function initializeBot() {
  if (!process.env.DISCORD_BOT_TOKEN) {
    throw new Error("DISCORD_BOT_TOKEN is required");
  }

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  // Bot ready event
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Bot is ready! Logged in as ${readyClient.user.tag}`);
  });

  // Guild join event
  client.on(Events.GuildCreate, async (guild) => {
    console.log(`Joined guild: ${guild.name} (${guild.id})`);
    await storage.addGuild({
      id: guild.id,
      name: guild.name,
      prefix: "!",
      joinedAt: new Date().toISOString(),
      isActive: true,
    });
  });

  // Guild leave event
  client.on(Events.GuildDelete, async (guild) => {
    console.log(`Left guild: ${guild.name} (${guild.id})`);
    const existingGuild = await storage.getGuild(guild.id);
    if (existingGuild) {
      await storage.addGuild({
        ...existingGuild,
        leftAt: new Date().toISOString(),
        isActive: false,
      });
    }
  });

  // Message handling for commands
  client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;

    const guild = await storage.getGuild(message.guild?.id || "");
    const prefix = guild?.prefix || "!";

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift()?.toLowerCase();

    if (!commandName) return;

    try {
      await commandHandler(message, commandName, args);
    } catch (error) {
      console.error("Command execution error:", error);
      await message.reply("There was an error executing that command!");
    }
  });

  // Error handling
  client.on(Events.Error, (error) => {
    console.error("Discord client error:", error);
  });

  await client.login(process.env.DISCORD_BOT_TOKEN);
  return client;
}

export function getBot() {
  return client;
}