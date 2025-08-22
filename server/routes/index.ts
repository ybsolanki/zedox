import { Router } from "express";
import { getBot } from "../bot/index.js";
import { getCommands } from "../commands/index.js";
import { storage } from "../db/index.js";

export function setupRoutes() {
  const router = Router();

  // Bot status endpoint
  router.get("/status", (req, res) => {
    const bot = getBot();
    const isOnline = bot && bot.isReady();
    
    res.json({
      success: true,
      data: {
        online: isOnline,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024, // MB
        guilds: bot?.guilds.cache.size || 0,
        users: bot?.users.cache.size || 0,
      },
    });
  });

  // Bot statistics endpoint
  router.get("/stats", async (req, res) => {
    try {
      const bot = getBot();
      const commandUsage = await storage.getCommandUsage(1000);
      
      const stats = {
        guildCount: bot?.guilds.cache.size || 0,
        userCount: bot?.users.cache.size || 0,
        commandsUsed: commandUsage.length,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage().heapUsed / 1024 / 1024,
      };

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch stats",
      });
    }
  });

  // Commands list endpoint
  router.get("/commands", (req, res) => {
    const commands = getCommands();
    res.json({
      success: true,
      data: commands,
    });
  });

  // Guild information endpoint
  router.get("/guilds", async (req, res) => {
    try {
      const bot = getBot();
      if (!bot || !bot.isReady()) {
        return res.status(503).json({
          success: false,
          message: "Bot is not ready",
        });
      }

      const guilds = bot.guilds.cache.map(guild => ({
        id: guild.id,
        name: guild.name,
        memberCount: guild.memberCount,
        channelCount: guild.channels.cache.size,
        roleCount: guild.roles.cache.size,
        ownerId: guild.ownerId,
        icon: guild.iconURL(),
        joinedAt: guild.joinedAt?.toISOString(),
      }));

      res.json({
        success: true,
        data: guilds,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch guilds",
      });
    }
  });

  // Command usage statistics
  router.get("/usage", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const commandUsage = await storage.getCommandUsage(limit);
      
      res.json({
        success: true,
        data: commandUsage,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch command usage",
      });
    }
  });

  // Moderation logs endpoint
  router.get("/moderation/:guildId", async (req, res) => {
    try {
      const { guildId } = req.params;
      const limit = parseInt(req.query.limit as string) || 50;
      const logs = await storage.getModerationLogs(guildId, limit);
      
      res.json({
        success: true,
        data: logs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch moderation logs",
      });
    }
  });

  // Health check endpoint
  router.get("/health", (req, res) => {
    res.json({
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
    });
  });

  return router;
}