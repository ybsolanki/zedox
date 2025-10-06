# Discord Bot Dashboard

A full-stack Discord bot with a React web dashboard for monitoring and managing bot statistics.

## Features

- **Discord Bot**: Basic bot with ping and help commands
- **Web Dashboard**: Real-time bot status and statistics
- **Database Integration**: PostgreSQL with Drizzle ORM (ready for use)
- **Modern Stack**: React + TypeScript + Tailwind CSS + Express.js

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment (Optional)
Copy the example environment file and configure:
```bash
cp .env.example .env
```

Edit `.env` with your Discord bot token:
```env
DISCORD_BOT_TOKEN=your_bot_token_here
DATABASE_URL=postgresql://username:password@localhost:5432/discord_bot
NODE_ENV=development
PORT=5000
```

### 3. Development Mode

#### Option A: Run both frontend and backend separately (recommended for development)
```bash
# Terminal 1: Start backend API server
npm run dev:backend

# Terminal 2: Start frontend dev server  
npm run dev:frontend
```

Then open: http://localhost:5173 (frontend with hot reload)

#### Option B: Run backend only
```bash
npm run dev
```

Then open: http://localhost:5000 (backend API only)

### 4. Production Mode
```bash
# Build the application
npm run build

# Start production server
npm start
```

Then open: http://localhost:5000

## Bot Setup

1. Create a Discord application at https://discord.com/developers/applications
2. Create a bot and copy the token
3. Add the token to your `.env` file as `DISCORD_BOT_TOKEN`
4. Invite the bot to your server with appropriate permissions

## Available Commands

- `!ping` - Test bot responsiveness
- `!help` - Show available commands

## API Endpoints

- `GET /api/bot/status` - Get bot status, guild count, user count, and uptime
- `GET /api/bot/stats` - Get detailed bot statistics

## Project Structure

```
├── client/          # React frontend
├── server/          # Express.js backend
├── shared/          # Shared types and database schema
├── dist/            # Built files (generated)
└── package.json     # Dependencies and scripts
```

## Deployment

See [README-DEPLOYMENT.md](README-DEPLOYMENT.md) for detailed deployment instructions for various platforms like Railway, Render, and Heroku.