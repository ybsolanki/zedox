import type { Message, PermissionFlagsBits } from "discord.js";
import { storage } from "../db/index.js";

export const utilityCommands = {
  userinfo: {
    name: "userinfo",
    description: "Shows information about a user",
    category: "utility" as const,
    usage: "!userinfo [@user]",
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      const user = message.mentions.users.first() || message.author;
      const member = message.guild.members.cache.get(user.id);

      if (!member) {
        await message.reply("User not found in this server!");
        return;
      }

      const embed = {
        title: `User Info: ${user.tag}`,
        thumbnail: { url: user.displayAvatarURL() },
        fields: [
          { name: "User ID", value: user.id, inline: true },
          { name: "Username", value: user.username, inline: true },
          { name: "Discriminator", value: user.discriminator, inline: true },
          { name: "Account Created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
          { name: "Joined Server", value: member.joinedAt ? `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:F>` : "Unknown", inline: true },
          { name: "Roles", value: member.roles.cache.map(role => role.toString()).join(" ") || "None", inline: false },
        ],
        color: parseInt(member.displayHexColor.replace('#', ''), 16) || 0x0099ff,
      };

      await message.reply({ embeds: [embed] });
    },
  },

  prefix: {
    name: "prefix",
    description: "Change the bot prefix for this server",
    category: "utility" as const,
    usage: "!prefix [new prefix]",
    permissions: ["ManageGuild"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      if (!args[0]) {
        const guild = await storage.getGuild(message.guild.id);
        const currentPrefix = guild?.prefix || "!";
        await message.reply(`Current prefix: \`${currentPrefix}\``);
        return;
      }

      const newPrefix = args[0];
      if (newPrefix.length > 5) {
        await message.reply("Prefix cannot be longer than 5 characters!");
        return;
      }

      // Update guild prefix
      const guild = await storage.getGuild(message.guild.id) || {
        id: message.guild.id,
        name: message.guild.name,
        joinedAt: new Date().toISOString(),
        isActive: true,
      };

      await storage.addGuild({
        ...guild,
        prefix: newPrefix,
      });

      await message.reply(`✅ Prefix changed to: \`${newPrefix}\``);
    },
  },

  debug: {
    name: "debug",
    description: "Shows debug information about the bot",
    category: "utility" as const,
    usage: "!debug",
    permissions: ["Administrator"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message) => {
      const client = message.client;
      const uptime = process.uptime();
      const memoryUsage = process.memoryUsage();

      const embed = {
        title: "🔧 Debug Information",
        fields: [
          { name: "Bot Version", value: "1.0.0", inline: true },
          { name: "Node.js Version", value: process.version, inline: true },
          { name: "Discord.js Version", value: "14.21.0", inline: true },
          { name: "Uptime", value: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`, inline: true },
          { name: "Memory Usage", value: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`, inline: true },
          { name: "Guilds", value: client.guilds.cache.size.toString(), inline: true },
          { name: "Users", value: client.users.cache.size.toString(), inline: true },
          { name: "Channels", value: client.channels.cache.size.toString(), inline: true },
          { name: "Ping", value: `${client.ws.ping}ms`, inline: true },
        ],
        color: 0x0099ff,
        timestamp: new Date().toISOString(),
      };

      await message.reply({ embeds: [embed] });
    },
  },

  stats: {
    name: "stats",
    description: "Shows bot statistics",
    category: "utility" as const,
    usage: "!stats",
    execute: async (message: Message) => {
      const client = message.client;
      const commandUsage = await storage.getCommandUsage(1000);
      
      const embed = {
        title: "📊 Bot Statistics",
        fields: [
          { name: "Servers", value: client.guilds.cache.size.toString(), inline: true },
          { name: "Users", value: client.users.cache.size.toString(), inline: true },
          { name: "Commands Used", value: commandUsage.length.toString(), inline: true },
          { name: "Uptime", value: `${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m`, inline: true },
        ],
        color: 0x0099ff,
        timestamp: new Date().toISOString(),
      };

      await message.reply({ embeds: [embed] });
    },
  },
};