import { pgTable, serial, text, timestamp, integer, boolean, uuid } from "drizzle-orm/pg-core";

// Users table for authentication and management
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  discordId: text("discord_id").unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bot settings configuration
export const botSettings = pgTable("bot_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  prefix: text("prefix").default("!").notNull(),
  loggingEnabled: boolean("logging_enabled").default(true).notNull(),
  dmPermissions: boolean("dm_permissions").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Command statistics and configuration
export const commandStats = pgTable("command_stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  commandName: text("command_name").notNull(),
  usageCount: integer("usage_count").default(0).notNull(),
  enabled: boolean("enabled").default(true).notNull(),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Bot statistics
export const botStats = pgTable("bot_stats", {
  id: uuid("id").primaryKey().defaultRandom(),
  serverCount: integer("server_count").default(0).notNull(),
  userCount: integer("user_count").default(0).notNull(),
  uptime: integer("uptime").default(0).notNull(),
  commandsExecuted: integer("commands_executed").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Activity logs for detailed logging
export const activityLogs = pgTable("activity_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  action: text("action").notNull(),
  userId: text("user_id"),
  serverId: text("server_id"),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type BotSettings = typeof botSettings.$inferSelect;
export type CommandStats = typeof commandStats.$inferSelect;
export type BotStats = typeof botStats.$inferSelect;
export type ActivityLog = typeof activityLogs.$inferSelect;