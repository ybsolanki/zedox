import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

// Discord servers/guilds table
export const guilds = pgTable("guilds", {
  id: text("id").primaryKey(), // Discord guild ID
  name: text("name").notNull(),
  prefix: text("prefix").default("!"),
  joinedAt: timestamp("joined_at").defaultNow(),
  leftAt: timestamp("left_at"),
  isActive: boolean("is_active").default(true),
});

// Bot commands usage tracking
export const commandUsage = pgTable("command_usage", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  guildId: text("guild_id").references(() => guilds.id),
  userId: text("user_id").notNull(), // Discord user ID
  command: text("command").notNull(),
  usedAt: timestamp("used_at").defaultNow(),
});

// User preferences and settings
export const userSettings = pgTable("user_settings", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull().unique(), // Discord user ID
  guildId: text("guild_id").references(() => guilds.id),
  preferences: text("preferences"), // JSON string
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Moderation actions log
export const moderationLogs = pgTable("moderation_logs", {
  id: uuid("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  guildId: text("guild_id").references(() => guilds.id),
  moderatorId: text("moderator_id").notNull(), // Discord user ID of moderator
  targetId: text("target_id").notNull(), // Discord user ID of target
  action: text("action").notNull(), // kick, ban, mute, etc.
  reason: text("reason"),
  duration: integer("duration"), // in minutes for timed actions
  createdAt: timestamp("created_at").defaultNow(),
});