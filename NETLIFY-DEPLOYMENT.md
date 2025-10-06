# Netlify Deployment Guide for Zedox

## 🚨 Important: Full Application Cannot Be Deployed to Netlify

**Your Discord bot application cannot run entirely on Netlify** because:
- Netlify is designed for static sites and serverless functions
- Discord bots need persistent connections that run 24/7
- Netlify functions have execution time limits (10 seconds for free tier, 15 minutes for paid)
- Your bot requires continuous WebSocket connections to Discord

## ✅ What You CAN Deploy to Netlify

### Option 1: Frontend-Only Dashboard (Recommended for Netlify)

If you want to deploy just the **React dashboard** to Netlify as a static site:

**Files to deploy:**
```
dist/public/          # Built frontend assets (after running npm run build)
├── index.html        # Main HTML file
├── assets/           # JS, CSS, and other assets
└── [other static assets]
```

**Netlify Configuration:**
Create `netlify.toml` in your project root:
```toml
[build]
  command = "npm run build"
  publish = "dist/public"

[build.environment]
  NODE_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Required Steps:**
1. Build the frontend: `npm run build`
2. Deploy the `dist/public` folder to Netlify
3. Configure your frontend to connect to your backend API hosted elsewhere
4. Set up environment variables for API endpoints

### Option 2: Serverless Functions for API Only

You could potentially deploy some API endpoints as Netlify Functions:

**Create `netlify/functions/` directory with:**
```
netlify/functions/
├── api-endpoint.js   # Individual serverless functions
└── stats.js          # Bot statistics endpoint
```

**Limitations:**
- Cannot run the Discord bot itself
- Functions have execution time limits
- No persistent state between function calls
- Database connections need to be handled carefully

## 🎯 Recommended Hybrid Approach

### Deploy Frontend to Netlify + Backend Elsewhere

1. **Frontend (Netlify):**
   - Deploy React dashboard as static site
   - Fast global CDN delivery
   - Automatic HTTPS and deployments

2. **Backend + Discord Bot (Railway/Render/Heroku):**
   - Discord bot running continuously
   - API endpoints for the dashboard
   - PostgreSQL database connection

**Environment Variables for Frontend:**
```
VITE_API_URL=https://your-backend-api.railway.app
VITE_APP_ENV=production
```

## 📋 Deployment Checklist for Netlify (Frontend Only)

- [ ] Source code is in `client/` directory
- [ ] Build command configured: `npm run build`
- [ ] Publish directory set to: `dist/public`
- [ ] Environment variables configured for API endpoints
- [ ] Redirects configured for SPA routing
- [ ] Backend deployed separately for Discord bot and API

## 🔗 Integration Setup

After deploying frontend to Netlify and backend elsewhere:

1. **Update API endpoints** in your React app to point to your backend URL
2. **Configure CORS** on your backend to allow requests from your Netlify domain
3. **Set up authentication** between frontend and backend if needed

## ⚠️ What NOT to Deploy to Netlify

- Discord bot code (`server/` directory)
- Long-running processes
- WebSocket servers
- Persistent database connections
- Any code that needs to run continuously

## 📚 Alternative: Full-Stack Platforms

For complete deployment of your Discord bot + dashboard, use:
- **Railway** (recommended)
- **Render**  
- **Heroku**
- **DigitalOcean App Platform**

These platforms can run your entire application including the Discord bot.