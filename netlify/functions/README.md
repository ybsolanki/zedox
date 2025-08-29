# Netlify Functions for Zedox

This directory contains example Netlify Functions that could be used for basic API endpoints.

## ⚠️ Important Limitations

These functions **CANNOT** replace your Discord bot. They are only suitable for:
- Simple API endpoints
- Database queries with short execution times
- Static data serving
- Basic form processing

## What CANNOT be done with Netlify Functions:

- ❌ Running Discord bot continuously
- ❌ Maintaining WebSocket connections
- ❌ Long-running processes (10 second limit on free tier)
- ❌ Persistent state between function calls
- ❌ Real-time Discord event handling

## Example Usage

The `stats.js` function provides a basic API endpoint:

```
GET /.netlify/functions/stats
```

Returns basic information about the bot (note: actual Discord data would need to come from your main bot hosted elsewhere).

## Deployment

These functions will automatically be deployed when you deploy to Netlify, accessible at:
```
https://your-site.netlify.app/.netlify/functions/function-name
```

## Integration with Frontend

In your React app, you can call these functions:

```javascript
// Example API call to Netlify function
const response = await fetch('/.netlify/functions/stats');
const data = await response.json();
```

## Recommended Architecture

Use Netlify Functions for:
- ✅ Contact forms
- ✅ Basic data fetching
- ✅ Authentication helpers
- ✅ Static content APIs

Keep your Discord bot and main API on platforms like Railway or Render that support continuous processes.