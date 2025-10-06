import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Client, GatewayIntentBits, Events } from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static files from the correct location based on environment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "public")));
} else {
  // In development, we need to serve files differently since Vite handles the frontend
  console.log("📁 Static files will be served by Vite dev server on port 5173");
}

// Initialize Discord Bot
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

// Bot event handlers
client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Discord bot is ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;
  
  // Basic ping command
  if (message.content === "!ping") {
    message.reply("Pong! 🏓");
  }
  
  // Basic help command
  if (message.content === "!help") {
    message.reply("Available commands:\n!ping - Test bot responsiveness\n!help - Show this help message");
  }
});

// API Routes
app.get("/api/bot/status", (req, res) => {
  res.json({
    status: client.isReady() ? "online" : "offline",
    guilds: client.guilds.cache.size,
    users: client.users.cache.size,
    uptime: client.uptime,
  });
});

app.get("/api/bot/stats", (req, res) => {
  res.json({
    serverCount: client.guilds.cache.size,
    userCount: client.users.cache.size,
    uptime: client.uptime || 0,
    commandsExecuted: 0, // This would be tracked in a real implementation
  });
});

// Serve React app
app.get("*", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } else {
    res.json({ 
      message: "Development mode - use Vite dev server on port 5173 for frontend",
      api: "This is the API server running on port " + PORT 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Start Discord bot if token is provided
if (process.env.DISCORD_BOT_TOKEN) {
  client.login(process.env.DISCORD_BOT_TOKEN).catch((error) => {
    console.error("❌ Failed to login to Discord:", error);
  });
} else {
  console.warn("⚠️  DISCORD_BOT_TOKEN not provided. Bot will not start.");
}

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("🛑 Shutting down gracefully...");
  if (client.isReady()) {
    client.destroy();
  }
  process.exit(0);
});