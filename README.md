# Discord Bot Dashboard

A full-stack Discord bot application with a React web dashboard for management and monitoring.

## Features

### Discord Bot Features
- **18+ Commands** across multiple categories:
  - **Basic**: help, ping, invite, serverinfo
  - **Moderation**: kick, ban, mute, unmute, deafen, undeafen, clear
  - **Utility**: userinfo, prefix, debug, stats
- **Advanced Moderation**: Timed mutes, bulk message deletion, permission checks
- **Dynamic Configuration**: Customizable prefix per server
- **Activity Tracking**: Command usage statistics and moderation logs

### Web Dashboard Features
- **Real-time Monitoring**: Bot status, uptime, memory usage
- **Server Management**: View all connected Discord servers
- **Command Documentation**: Complete list of available commands
- **Statistics**: Usage analytics and performance metrics
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Backend**: Node.js, Express.js, Discord.js
- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM (optional, falls back to in-memory)
- **Build Tools**: Vite (frontend), esbuild (backend)
- **Deployment**: Ready for Railway, Render, Heroku

## Quick Start

### Prerequisites
- Node.js 20+
- Discord Bot Token ([Create one here](https://discord.com/developers/applications))
- PostgreSQL database (optional)

### Local Development

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd zedox
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your Discord bot token
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Access the dashboard**:
   - Open http://localhost:5000 in your browser
   - The bot will automatically connect to Discord

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DISCORD_BOT_TOKEN` | Yes | Your Discord bot token |
| `DATABASE_URL` | No | PostgreSQL connection string |
| `NODE_ENV` | No | Environment (development/production) |
| `PORT` | No | Server port (default: 5000) |

## Deployment

### Railway (Recommended)
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add environment variables:
   - `DISCORD_BOT_TOKEN`: Your bot token
   - `NODE_ENV`: production
5. Railway will automatically detect and deploy

### Render
1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Create "Web Service" from GitHub
4. Set build command: `npm run build`
5. Set start command: `npm start`
6. Add environment variables

### Heroku
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Set environment variables: `heroku config:set DISCORD_BOT_TOKEN=your_token`
4. Deploy: `git push heroku main`

## Discord Bot Setup

1. **Create Application**:
   - Go to [Discord Developer Portal](https://discord.com/developers/applications)
   - Click "New Application"
   - Give it a name and create

2. **Create Bot**:
   - Go to "Bot" section
   - Click "Add Bot"
   - Copy the bot token for your `.env` file

3. **Set Permissions**:
   - Go to "OAuth2" > "URL Generator"
   - Select "bot" scope
   - Select these permissions:
     - Send Messages
     - Read Message History
     - Manage Messages
     - Kick Members
     - Ban Members
     - Mute Members
     - Deafen Members
     - Move Members

4. **Invite Bot**:
   - Use the generated URL to invite the bot to your server
   - Or use the `!invite` command from the dashboard

## Database Setup (Optional)

The application works without a database using in-memory storage, but for production use:

### PostgreSQL
1. Create a PostgreSQL database
2. Set `DATABASE_URL` environment variable
3. The app will automatically create required tables

### Neon (Recommended for deployment)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string to `DATABASE_URL`

## Commands Reference

### Basic Commands
- `!help [command]` - Show help information
- `!ping` - Test bot responsiveness
- `!invite` - Get bot invite link
- `!serverinfo` - Show server information

### Moderation Commands
- `!kick @user [reason]` - Kick a member
- `!ban @user [reason]` - Ban a member
- `!mute @user [minutes]` - Mute a member
- `!unmute @user` - Unmute a member
- `!deafen @user` - Deafen a member
- `!undeafen @user` - Undeafen a member
- `!clear [amount]` - Delete messages

### Utility Commands
- `!userinfo [@user]` - Show user information
- `!prefix [new_prefix]` - Change bot prefix
- `!debug` - Show debug information
- `!stats` - Show bot statistics

## Troubleshooting

### Bot Not Starting
- Check if `DISCORD_BOT_TOKEN` is set correctly
- Verify the token is valid in Discord Developer Portal
- Check server logs for specific error messages

### Commands Not Working
- Ensure bot has necessary permissions in Discord server
- Check if the prefix is correct (default: `!`)
- Verify bot is online in the dashboard

### Dashboard Not Loading
- Check if the build completed successfully
- Verify the server is running on the correct port
- Check browser console for JavaScript errors

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test them
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please:
1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue if needed
4. Join our Discord server (if available)

---

Built with ❤️ using Discord.js and React