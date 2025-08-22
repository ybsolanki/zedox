import { z } from "zod";

// Bot command types
export const CommandCategory = z.enum(["basic", "moderation", "utility"]);
export type CommandCategory = z.infer<typeof CommandCategory>;

// Discord bot command schema
export const BotCommand = z.object({
  name: z.string(),
  description: z.string(),
  category: CommandCategory,
  usage: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  permissions: z.array(z.string()).optional(),
});
export type BotCommand = z.infer<typeof BotCommand>;

// Guild/Server information schema
export const GuildInfo = z.object({
  id: z.string(),
  name: z.string(),
  memberCount: z.number(),
  channelCount: z.number(),
  roleCount: z.number(),
  ownerId: z.string(),
  prefix: z.string(),
  joinedAt: z.string().optional(),
});
export type GuildInfo = z.infer<typeof GuildInfo>;

// User information schema  
export const UserInfo = z.object({
  id: z.string(),
  username: z.string(),
  discriminator: z.string(),
  avatar: z.string().optional(),
  bot: z.boolean().optional(),
  joinedAt: z.string().optional(),
  roles: z.array(z.string()).optional(),
});
export type UserInfo = z.infer<typeof UserInfo>;

// Bot statistics schema
export const BotStats = z.object({
  guildCount: z.number(),
  userCount: z.number(),
  commandsUsed: z.number(),
  uptime: z.number(),
  memoryUsage: z.number(),
});
export type BotStats = z.infer<typeof BotStats>;

// API response schemas
export const ApiResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
});
export type ApiResponse = z.infer<typeof ApiResponse>;

// Command usage tracking
export const CommandUsage = z.object({
  id: z.string(),
  guildId: z.string().optional(),
  userId: z.string(),
  command: z.string(),
  usedAt: z.string(),
});
export type CommandUsage = z.infer<typeof CommandUsage>;

// Moderation action schema
export const ModerationAction = z.object({
  id: z.string(),
  guildId: z.string(),
  moderatorId: z.string(),
  targetId: z.string(),
  action: z.enum(["kick", "ban", "mute", "unmute", "deafen", "undeafen", "warn"]),
  reason: z.string().optional(),
  duration: z.number().optional(), // in minutes
  createdAt: z.string(),
});
export type ModerationAction = z.infer<typeof ModerationAction>;