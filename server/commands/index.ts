import type { Message } from "discord.js";
import { basicCommands } from "./basic.js";
import { moderationCommands } from "./moderation.js";
import { utilityCommands } from "./utility.js";
import { storage } from "../db/index.js";

// Define command interface
interface BaseCommand {
  name: string;
  description: string;
  category: "basic" | "moderation" | "utility";
  usage?: string;
  aliases?: string[];
  permissions?: string[];
  execute: (message: Message, args: string[]) => Promise<void>;
}

// Combine all commands
const allCommands: Record<string, BaseCommand> = {
  ...basicCommands,
  ...moderationCommands,
  ...utilityCommands,
};

export async function commandHandler(message: Message, commandName: string, args: string[]) {
  const command = allCommands[commandName];
  
  if (!command) {
    return; // Command not found, ignore
  }

  // Check permissions
  if (command.permissions && message.guild) {
    const member = message.guild.members.cache.get(message.author.id);
    if (!member?.permissions.has(command.permissions as any)) {
      await message.reply("You don't have permission to use this command!");
      return;
    }
  }

  // Track command usage
  await storage.addCommandUsage({
    id: Date.now().toString(),
    guildId: message.guild?.id,
    userId: message.author.id,
    command: commandName,
    usedAt: new Date().toISOString(),
  });

  // Execute command
  await command.execute(message, args);
}

// Get all available commands
export function getCommands() {
  return Object.values(allCommands);
}