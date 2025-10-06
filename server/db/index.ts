import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../../shared/schema.js";

let db: ReturnType<typeof drizzle>;

export async function setupDatabase() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not found. Using in-memory storage.");
    return;
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    db = drizzle(sql, { schema });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}

export function getDatabase() {
  return db;
}

// In-memory storage fallback when no database is available
class InMemoryStorage {
  private data = {
    guilds: new Map(),
    commandUsage: new Map(),
    userSettings: new Map(),
    moderationLogs: new Map(),
  };

  async addGuild(guild: any) {
    this.data.guilds.set(guild.id, guild);
  }

  async getGuild(id: string) {
    return this.data.guilds.get(id);
  }

  async addCommandUsage(usage: any) {
    this.data.commandUsage.set(usage.id, usage);
  }

  async getCommandUsage(limit = 100) {
    return Array.from(this.data.commandUsage.values()).slice(-limit);
  }

  async addModerationLog(log: any) {
    this.data.moderationLogs.set(log.id, log);
  }

  async getModerationLogs(guildId: string, limit = 50) {
    return Array.from(this.data.moderationLogs.values())
      .filter((log: any) => log.guildId === guildId)
      .slice(-limit);
  }
}

export const storage = new InMemoryStorage();