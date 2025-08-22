import type { Message } from "discord.js";
import { getCommands } from "./index.js";

export const basicCommands = {
  help: {
    name: "help",
    description: "Shows all available commands",
    category: "basic" as const,
    usage: "!help [command]",
    execute: async (message: Message, args: string[]) => {
      if (args[0]) {
        // Show help for specific command
        const commands = getCommands();
        const command = commands.find(cmd => cmd.name === args[0]);
        if (command) {
          const embed = {
            title: `Help: ${command.name}`,
            description: command.description,
            fields: [
              { name: "Usage", value: command.usage || `!${command.name}`, inline: true },
              { name: "Category", value: command.category, inline: true },
            ],
            color: 0x0099ff,
          };
          await message.reply({ embeds: [embed] });
        } else {
          await message.reply("Command not found!");
        }
      } else {
        // Show all commands
        const commands = getCommands();
        const categories = {
          basic: commands.filter(cmd => cmd.category === "basic"),
          moderation: commands.filter(cmd => cmd.category === "moderation"), 
          utility: commands.filter(cmd => cmd.category === "utility"),
        };

        const embed = {
          title: "Bot Commands",
          description: "Here are all available commands:",
          fields: [
            {
              name: "📋 Basic Commands",
              value: categories.basic.map(cmd => `\`!${cmd.name}\` - ${cmd.description}`).join("\n") || "None",
              inline: false,
            },
            {
              name: "🔨 Moderation Commands", 
              value: categories.moderation.map(cmd => `\`!${cmd.name}\` - ${cmd.description}`).join("\n") || "None",
              inline: false,
            },
            {
              name: "🛠️ Utility Commands",
              value: categories.utility.map(cmd => `\`!${cmd.name}\` - ${cmd.description}`).join("\n") || "None",
              inline: false,
            },
          ],
          color: 0x0099ff,
        };
        await message.reply({ embeds: [embed] });
      }
    },
  },

  ping: {
    name: "ping",
    description: "Shows bot latency",
    category: "basic" as const,
    usage: "!ping",
    execute: async (message: Message) => {
      const sent = await message.reply("Pinging...");
      const latency = sent.createdTimestamp - message.createdTimestamp;
      await sent.edit(`🏓 Pong! Latency: ${latency}ms`);
    },
  },

  invite: {
    name: "invite",
    description: "Get the bot invite link",
    category: "basic" as const,
    usage: "!invite",
    execute: async (message: Message) => {
      const embed = {
        title: "Invite me to your server!",
        description: "Click the link below to add me to your Discord server:",
        fields: [
          {
            name: "Invite Link",
            value: `[Click here to invite](https://discord.com/api/oauth2/authorize?client_id=${message.client.user?.id}&permissions=8&scope=bot)`,
            inline: false,
          },
        ],
        color: 0x0099ff,
      };
      await message.reply({ embeds: [embed] });
    },
  },

  serverinfo: {
    name: "serverinfo",
    description: "Shows information about the server",
    category: "basic" as const,
    usage: "!serverinfo",
    execute: async (message: Message) => {
      if (!message.guild) {
        await message.reply("This command can only be used in a server!");
        return;
      }

      const guild = message.guild;
      const embed = {
        title: `Server Info: ${guild.name}`,
        thumbnail: { url: guild.iconURL() || "" },
        fields: [
          { name: "Server ID", value: guild.id, inline: true },
          { name: "Owner", value: `<@${guild.ownerId}>`, inline: true },
          { name: "Members", value: guild.memberCount.toString(), inline: true },
          { name: "Channels", value: guild.channels.cache.size.toString(), inline: true },
          { name: "Roles", value: guild.roles.cache.size.toString(), inline: true },
          { name: "Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:F>`, inline: true },
        ],
        color: 0x0099ff,
      };
      await message.reply({ embeds: [embed] });
    },
  },
};