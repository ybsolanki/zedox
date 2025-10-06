import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { initializeBot } from "./bot/index.js";
import { setupRoutes } from "./routes/index.js";
import { setupDatabase } from "./db/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Setup database
await setupDatabase();

// Setup API routes
app.use("/api", setupRoutes());

// Initialize Discord bot
if (process.env.DISCORD_BOT_TOKEN) {
  await initializeBot();
  console.log("Discord bot initialized");
} else {
  console.warn("DISCORD_BOT_TOKEN not found. Bot will not start.");
}

// Serve React app for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Shutting down gracefully...");
  process.exit(0);
});