import type { Message, PermissionFlagsBits } from "discord.js";
import { storage } from "../db/index.js";

export const moderationCommands = {
  kick: {
    name: "kick",
    description: "Kick a member from the server",
    category: "moderation" as const,
    usage: "!kick @user [reason]",
    permissions: ["KickMembers"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      const user = message.mentions.users.first();
      if (!user) {
        await message.reply("Please mention a user to kick!");
        return;
      }

      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        await message.reply("User not found in this server!");
        return;
      }

      if (!member.kickable) {
        await message.reply("I cannot kick this user!");
        return;
      }

      const reason = args.slice(1).join(" ") || "No reason provided";

      try {
        await member.kick(reason);
        await message.reply(`✅ Kicked ${user.tag} for: ${reason}`);

        // Log the action
        await storage.addModerationLog({
          id: Date.now().toString(),
          guildId: message.guild.id,
          moderatorId: message.author.id,
          targetId: user.id,
          action: "kick",
          reason,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        await message.reply("Failed to kick the user!");
      }
    },
  },

  ban: {
    name: "ban",
    description: "Ban a member from the server",
    category: "moderation" as const,
    usage: "!ban @user [reason]",
    permissions: ["BanMembers"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      const user = message.mentions.users.first();
      if (!user) {
        await message.reply("Please mention a user to ban!");
        return;
      }

      const member = message.guild.members.cache.get(user.id);
      if (member && !member.bannable) {
        await message.reply("I cannot ban this user!");
        return;
      }

      const reason = args.slice(1).join(" ") || "No reason provided";

      try {
        await message.guild.members.ban(user, { reason });
        await message.reply(`✅ Banned ${user.tag} for: ${reason}`);

        // Log the action
        await storage.addModerationLog({
          id: Date.now().toString(),
          guildId: message.guild.id,
          moderatorId: message.author.id,
          targetId: user.id,
          action: "ban",
          reason,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        await message.reply("Failed to ban the user!");
      }
    },
  },

  mute: {
    name: "mute",
    description: "Mute a member in voice channels",
    category: "moderation" as const,
    usage: "!mute @user [duration in minutes]",
    permissions: ["MuteMembers"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      const user = message.mentions.users.first();
      if (!user) {
        await message.reply("Please mention a user to mute!");
        return;
      }

      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        await message.reply("User not found in this server!");
        return;
      }

      const duration = parseInt(args[1]) || 0;

      try {
        await member.voice.setMute(true);
        await message.reply(`✅ Muted ${user.tag}${duration ? ` for ${duration} minutes` : ""}`);

        // Log the action
        await storage.addModerationLog({
          id: Date.now().toString(),
          guildId: message.guild.id,
          moderatorId: message.author.id,
          targetId: user.id,
          action: "mute",
          duration: duration || undefined,
          createdAt: new Date().toISOString(),
        });

        // Auto unmute after duration
        if (duration > 0) {
          setTimeout(async () => {
            try {
              await member.voice.setMute(false);
            } catch (error) {
              console.error("Failed to auto-unmute:", error);
            }
          }, duration * 60000);
        }
      } catch (error) {
        await message.reply("Failed to mute the user!");
      }
    },
  },

  unmute: {
    name: "unmute",
    description: "Unmute a member in voice channels",
    category: "moderation" as const,
    usage: "!unmute @user",
    permissions: ["MuteMembers"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      const user = message.mentions.users.first();
      if (!user) {
        await message.reply("Please mention a user to unmute!");
        return;
      }

      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        await message.reply("User not found in this server!");
        return;
      }

      try {
        await member.voice.setMute(false);
        await message.reply(`✅ Unmuted ${user.tag}`);

        // Log the action
        await storage.addModerationLog({
          id: Date.now().toString(),
          guildId: message.guild.id,
          moderatorId: message.author.id,
          targetId: user.id,
          action: "unmute",
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        await message.reply("Failed to unmute the user!");
      }
    },
  },

  deafen: {
    name: "deafen",
    description: "Deafen a member in voice channels",
    category: "moderation" as const,
    usage: "!deafen @user",
    permissions: ["DeafenMembers"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      const user = message.mentions.users.first();
      if (!user) {
        await message.reply("Please mention a user to deafen!");
        return;
      }

      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        await message.reply("User not found in this server!");
        return;
      }

      try {
        await member.voice.setDeaf(true);
        await message.reply(`✅ Deafened ${user.tag}`);

        // Log the action
        await storage.addModerationLog({
          id: Date.now().toString(),
          guildId: message.guild.id,
          moderatorId: message.author.id,
          targetId: user.id,
          action: "deafen",
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        await message.reply("Failed to deafen the user!");
      }
    },
  },

  undeafen: {
    name: "undeafen",
    description: "Undeafen a member in voice channels",
    category: "moderation" as const,
    usage: "!undeafen @user",
    permissions: ["DeafenMembers"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild) return;

      const user = message.mentions.users.first();
      if (!user) {
        await message.reply("Please mention a user to undeafen!");
        return;
      }

      const member = message.guild.members.cache.get(user.id);
      if (!member) {
        await message.reply("User not found in this server!");
        return;
      }

      try {
        await member.voice.setDeaf(false);
        await message.reply(`✅ Undeafened ${user.tag}`);

        // Log the action
        await storage.addModerationLog({
          id: Date.now().toString(),
          guildId: message.guild.id,
          moderatorId: message.author.id,
          targetId: user.id,
          action: "undeafen",
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        await message.reply("Failed to undeafen the user!");
      }
    },
  },

  clear: {
    name: "clear",
    description: "Clear messages from the channel",
    category: "moderation" as const,
    usage: "!clear [amount]",
    permissions: ["ManageMessages"] as (keyof typeof PermissionFlagsBits)[],
    execute: async (message: Message, args: string[]) => {
      if (!message.guild || !message.channel.isTextBased()) return;

      const amount = parseInt(args[0]) || 10;
      if (amount < 1 || amount > 100) {
        await message.reply("Please provide a number between 1 and 100!");
        return;
      }

      try {
        if ('bulkDelete' in message.channel) {
          const deleted = await message.channel.bulkDelete(amount + 1); // +1 to include the command message
          const reply = await message.channel.send(`✅ Deleted ${deleted.size - 1} messages!`);
          setTimeout(() => reply.delete().catch(() => {}), 3000);
        } else {
          await message.reply("This command can only be used in text channels!");
        }
      } catch (error) {
        await message.reply("Failed to delete messages!");
      }
    },
  },
};