# Quick Start Guide 🚀

Get StreetEats running in 3 minutes!

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A terminal/command prompt

## Installation

### 1. Navigate to Project
```bash
cd /Users/adi/Documents/GitHub/StreetEats
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

### 4. Open in Browser
Visit: **http://localhost:3000**

That's it! 🎉

## What You'll See

### Homepage
- Beautiful purple gradient hero section
- Search bar to find food trucks
- Filter options (cuisine, city, price, rating)
- Grid of 30 food truck cards

### Features to Try
1. **Search**: Type "tacos" or "ramen" in the search bar
2. **Filter by City**: Select "Tokyo" or "New York"
3. **Filter by Cuisine**: Try "Mexican" or "Japanese"
4. **Click any card**: See full details in a modal
5. **Check Statistics**: Scroll down to see platform stats

## API Endpoints to Test

### Get All Trucks
```bash
curl http://localhost:3000/api/foodtrucks
```

### Search by City
```bash
curl "http://localhost:3000/api/foodtrucks?city=Tokyo"
```

### Filter by Cuisine
```bash
curl "http://localhost:3000/api/foodtrucks?cuisine=Mexican"
```

### Get Statistics
```bash
curl http://localhost:3000/api/stats
```

### Get Single Truck
```bash
curl http://localhost:3000/api/foodtrucks/ft001
```

## Development Mode

Want auto-restart on file changes?

```bash
# First install nodemon
npm install --save-dev nodemon

# Then run in dev mode
npm run dev
```

## Testing

Validate the database:
```bash
npm test
```

## Common Issues

### Port 3000 already in use?
```bash
# Use a different port
PORT=8080 npm start
```

### Can't find module error?
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Project Structure

```
StreetEats/
├── data/foodtrucks.json    # The database
├── public/                 # Frontend files
│   ├── index.html          # Main page
│   ├── styles.css          # Styles
│   └── app.js              # JavaScript
└── server.js               # API server
```

## Next Steps

1. ✅ **Explore the data**: Check out `data/foodtrucks.json`
2. ✅ **Add a food truck**: Follow `CONTRIBUTING.md`
3. ✅ **Deploy it**: See `DEPLOYMENT.md`
4. ✅ **Integrate APIs**: Check `DATA_SOURCES.md`

## Need Help?

- 📖 Read the full [README.md](README.md)
- 🤝 Check [CONTRIBUTING.md](CONTRIBUTING.md)
- 🚀 See [DEPLOYMENT.md](DEPLOYMENT.md)
- 📊 Review [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## Features at a Glance

✅ 30 food trucks from 24 countries
✅ Advanced search and filtering
✅ Beautiful responsive design
✅ REST API with 5 endpoints
✅ Detailed truck information
✅ Operating hours
✅ Contact information
✅ Verified vendors
✅ Statistics dashboard
✅ Mobile-friendly

## Quick Customization

### Change Colors
Edit `public/styles.css`:
```css
:root {
  --primary-color: #ff6b6b;  /* Main color */
  --secondary-color: #4ecdc4; /* Secondary */
}
```

### Add Your Food Truck
Edit `data/foodtrucks.json`:
```json
{
  "id": "ft031",
  "name": "Your Food Truck",
  "city": "Your City",
  ...
}
```

### Change Port
```bash
PORT=8080 npm start
```

## Production Deployment (1 Minute)

### Render.com (Recommended)
1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Deploy! (automatic)

### Or use Heroku
```bash
heroku create
git push heroku main
```

## Environment Variables (Optional)

For API integrations, create `.env`:
```bash
cp .env.example .env
# Edit .env and add your API keys
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Server won't start | Check if port 3000 is free |
| Images not loading | Check internet connection |
| API returns empty | Verify `data/foodtrucks.json` exists |
| Styles broken | Clear browser cache |

## Performance Tips

- Images load from Unsplash CDN (fast!)
- API responses are instant (local JSON)
- Gzip compression supported
- Static file caching enabled

## Screenshots

Since you can't see screenshots in terminal, here's what to expect:

1. **Hero Section**: Purple gradient, large "Discover Amazing Food Trucks" title
2. **Search Section**: White card with filters floating over gradient
3. **Truck Cards**: Grid of white cards with food images, ratings, and info
4. **Modal**: Large overlay with detailed truck information
5. **Stats Section**: Purple gradient section with platform statistics

## Keyboard Shortcuts

- **Enter**: Submit search
- **Escape**: Close modal
- **Tab**: Navigate through filters

## Browser Support

✅ Chrome (recommended)
✅ Firefox
✅ Safari
✅ Edge
✅ Mobile browsers

## Final Checklist

Before deploying:
- [ ] Test search functionality
- [ ] Try all filters
- [ ] Open a detail modal
- [ ] Test on mobile (resize browser)
- [ ] Check all API endpoints
- [ ] Run `npm test`
- [ ] Read DEPLOYMENT.md

## Have Fun! 🎉

Explore food trucks from around the world:
- 🗽 The Halal Guys (New York)
- 🌮 Kogi BBQ (Los Angeles)
- 🍜 Tokyo Ramen Truck (Tokyo)
- 🥖 Le Camion Qui Fume (Paris)
- 🌯 Tacos El Güero (Mexico City)
- And 25 more!

---

**Made with ❤️ for street food lovers worldwide**

Questions? Check the full [README.md](README.md) or open an issue!
