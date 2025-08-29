# Files to Deploy to Netlify - Quick Reference

## 🎯 Direct Answer: Which Files to Deploy

For **frontend-only deployment** to Netlify, deploy these files:

### After running `npm run build`:
```
dist/public/          ← Deploy this entire folder to Netlify
├── index.html        ← Main HTML file
├── assets/           ← Built JS, CSS, images
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other assets]
└── [any other static files]
```

### Configuration files to include in your repo:
```
netlify.toml          ← Netlify configuration (already created)
package.json          ← Build dependencies and scripts
vite.config.ts        ← Build configuration
tailwind.config.ts    ← Styling configuration
tsconfig.json         ← TypeScript configuration
```

## 🚫 Files NOT to Deploy to Netlify

```
server/               ← Discord bot code (host elsewhere)
shared/               ← Backend shared code  
migrations/           ← Database migrations
dist/index.js         ← Backend build output
node_modules/         ← Dependencies (auto-installed)
.env                  ← Environment variables (use Netlify UI)
```

## 📋 Step-by-Step Deployment

1. **Build the frontend:**
   ```bash
   npm run build
   ```

2. **Connect to Netlify:**
   - Link your GitHub repository to Netlify
   - Or manually upload the `dist/public` folder

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist/public`

4. **Set environment variables** (if your frontend needs API URLs):
   ```
   VITE_API_URL=https://your-backend-hosted-elsewhere.com
   ```

## ⚠️ Remember

- This only deploys the **dashboard/frontend**
- Your **Discord bot must be hosted elsewhere** (Railway, Render, etc.)
- The frontend will need to connect to your bot's API hosted on another platform

## 📖 Full Documentation

See [NETLIFY-DEPLOYMENT.md](./NETLIFY-DEPLOYMENT.md) for complete deployment guide and alternatives.