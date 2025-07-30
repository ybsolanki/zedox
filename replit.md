# Discord Bot Dashboard

## Overview

This is a full-stack Discord bot management application built with Express.js backend and React frontend. The application provides a web-based dashboard to manage and monitor a Discord bot with 18+ moderation and utility commands. The architecture follows a monorepo pattern with shared TypeScript code between client and server.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Full-Stack TypeScript Application
- **Frontend**: React with TypeScript, styled using Tailwind CSS and shadcn/ui components
- **Backend**: Express.js server with TypeScript that handles both API endpoints and Discord bot functionality
- **Database**: PostgreSQL with Drizzle ORM for schema management and migrations
- **Discord Integration**: Discord.js library for comprehensive bot functionality
- **Build System**: Vite for frontend bundling, esbuild for backend compilation

### Monorepo Structure
The application follows a clear separation of concerns:
- `client/` - React frontend application with dashboard interface
- `server/` - Express.js backend and Discord bot implementation
- `shared/` - Shared TypeScript schemas, types, and validation logic

## Key Components

### Frontend Architecture
- **Component Library**: Uses shadcn/ui component system built on Radix UI primitives
- **State Management**: TanStack Query for server state management and caching
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation for type-safe forms
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **RESTful API**: Express.js server providing bot management and statistics endpoints
- **Discord Bot**: Comprehensive command system with 18+ commands across multiple categories
- **Storage Layer**: Abstracted storage interface with in-memory implementation (ready for PostgreSQL)
- **Command System**: Modular command architecture organized by categories (moderation, utility, basic)

### Discord Bot Features
- **Command Categories**: 
  - Basic: help, ping, invite, serverinfo
  - Moderation: kick, ban, mute, unmute, deafen, undeafen, clear, lockdown, unlock, textmute, textunmute
  - Utility: userinfo, prefix, debug
- **Advanced Features**: Timed mutes, channel locking, message filtering, voice channel control
- **Configuration**: Dynamic prefix changing, error logging, DM command permissions

## Data Flow

### Bot Management Flow
1. Discord bot receives messages and processes commands
2. Commands update storage layer with usage statistics and activity logs
3. Web dashboard queries API endpoints for real-time bot status and statistics
4. Dashboard allows configuration changes that update bot settings in storage
5. Bot reads updated settings for dynamic behavior changes

### Database Schema
- **users**: User authentication and management
- **botSettings**: Bot configuration (prefix, logging, DM permissions)
- **commandStats**: Command usage tracking and enable/disable states
- **botStats**: Overall bot statistics (servers, users, uptime)
- **activityLogs**: Detailed logging of bot actions and moderation events

## External Dependencies

### Core Dependencies
- **Discord.js**: Discord API interaction and bot functionality
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **TanStack Query**: Server state management and caching
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Fast frontend development and building
- **esbuild**: Fast backend compilation
- **TypeScript**: Type safety across the entire stack
- **Replit Plugins**: Development environment integration

## Deployment Strategy

### Production Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend compiles to `dist/index.js` using esbuild
3. Single Node.js process serves both static files and API
4. Environment variables configure database and Discord bot token

### Database Management
- Drizzle Kit handles schema migrations
- PostgreSQL dialect with automatic UUID generation
- Connection pooling through serverless driver
- Schema definitions shared between client and server

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **DISCORD_BOT_TOKEN**: Discord bot authentication
- **NODE_ENV**: Environment-specific behavior (development/production)

The application is designed for easy deployment on platforms like Railway, Render, or similar Node.js hosting services with PostgreSQL support.