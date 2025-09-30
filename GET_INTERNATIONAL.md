# 🌍 Getting International Food Trucks - Easy Guide

You have **TWO OPTIONS** to add international food trucks:

## Option 1: Google Places API (BEST - Most Data) 🥇

### Get Your Free API Key

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** (or select existing)
3. **Enable APIs**:
   - Click "Enable APIs and Services"
   - Search for "Places API"
   - Click "Enable"
4. **Create API Key**:
   - Go to "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key

### Add Key to StreetEats

```bash
# Edit .env file
nano .env

# Add this line (replace with your actual key):
GOOGLE_PLACES_API_KEY=AIzaSyD...your_actual_key_here
```

### Fetch International Trucks

```bash
npm run fetch-international
```

**What you'll get**:
- ~740 food trucks from 37 international cities
- Real businesses with ratings and reviews
- Photos, phone numbers, addresses
- From: London, Paris, Tokyo, Sydney, etc.

**Cost**: FREE (Google gives $200/month credit)

**Time**: 10-15 minutes to fetch

---

## Option 2: OpenStreetMap (100% FREE - No API Key!) 🆓

### No Setup Needed!

OpenStreetMap is completely free and requires NO API key.

### Fetch International Trucks

```bash
npm run fetch-osm
```

**What you'll get**:
- ~900 food vendors from 30+ international cities
- Community-maintained data
- Coordinates and basic info
- 100% free forever!

**Cost**: $0 - Completely FREE

**Time**: 5-10 minutes to fetch

**Note**: OSM data is community-maintained, so quality varies. Good for bulk data!

---

## 📊 Comparison

| Feature | Google Places | OpenStreetMap |
|---------|--------------|---------------|
| **Cost** | FREE ($200/month) | FREE (unlimited) |
| **API Key** | Required | Not required |
| **Data Quality** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐ Good |
| **Photos** | Yes, high quality | No |
| **Reviews** | Yes, real reviews | No |
| **Phone Numbers** | Yes | Sometimes |
| **Websites** | Yes | Sometimes |
| **Setup Time** | 5 minutes | 0 minutes |
| **Trucks Added** | ~740 | ~900 |

---

## 🚀 Quick Start

### I want the BEST data (Google):
```bash
# 1. Get API key from Google Cloud Console
# 2. Add to .env file
echo "GOOGLE_PLACES_API_KEY=your_key" >> .env

# 3. Fetch international trucks
npm run fetch-international

# 4. Wait 10-15 minutes
# 5. You'll have 10,000+ total trucks!
```

### I want FREE with no setup (OpenStreetMap):
```bash
# Just run this - no setup needed!
npm run fetch-osm

# Wait 5-10 minutes
# You'll have 10,000+ total trucks!
```

---

## 📍 Cities You'll Get

### Europe (14 cities)
🇬🇧 London • 🇫🇷 Paris • 🇩🇪 Berlin • 🇳🇱 Amsterdam • 🇪🇸 Barcelona • 🇮🇹 Rome • 🇪🇸 Madrid • 🇧🇪 Brussels • 🇩🇰 Copenhagen • 🇮🇪 Dublin • 🇦🇹 Vienna • 🇨🇿 Prague • 🇸🇪 Stockholm

### Asia (10 cities)
🇯🇵 Tokyo • 🇰🇷 Seoul • 🇹🇭 Bangkok • 🇸🇬 Singapore • 🇭🇰 Hong Kong • 🇹🇼 Taipei • 🇮🇳 Mumbai • 🇮🇳 Delhi • 🇦🇪 Dubai • 🇮🇱 Tel Aviv • 🇨🇳 Shanghai

### Oceania (5 cities)
🇦🇺 Sydney • 🇦🇺 Melbourne • 🇦🇺 Brisbane • 🇳🇿 Auckland • 🇳🇿 Wellington

### Americas (8 cities)
🇨🇦 Toronto • 🇨🇦 Vancouver • 🇨🇦 Montreal • 🇲🇽 Mexico City • 🇧🇷 São Paulo • 🇦🇷 Buenos Aires • 🇨🇱 Santiago • 🇨🇴 Bogotá

### Africa (2 cities)
🇿🇦 Cape Town • 🇿🇦 Johannesburg

---

## 🎯 Expected Results

### Current Database
- **US Trucks (Yelp)**: 9,812 trucks ✅

### After Google Places
- **US Trucks**: 9,812
- **International Trucks**: ~740
- **Total**: ~10,550 trucks
- **Countries**: 25+

### After OpenStreetMap
- **US Trucks**: 9,812
- **International Trucks**: ~900
- **Total**: ~10,710 trucks
- **Countries**: 25+

### Use Both! (Maximum Coverage)
- **US Trucks**: 9,812
- **International Trucks**: ~1,640
- **Total**: ~11,450 trucks
- **Countries**: 30+

---

## ⚠️ Important Notes

### Google Places API
- Free tier: $200 credit/month
- This script stays well within free limits
- One-time fetch, then you have the data
- Can re-run monthly to update

### OpenStreetMap
- Completely free, unlimited usage
- Be respectful: 1 second delay between requests
- Data quality varies by region
- Best for supplementary data

---

## 🆘 Troubleshooting

### Google API Key Error
```
❌ Error: GOOGLE_PLACES_API_KEY not set
```
**Fix**: Make sure you added the key to `.env` file (not `.env.example`)

### "API not enabled"
**Fix**: Go to Google Cloud Console → Enable "Places API"

### "Quota exceeded"
**Fix**: Check your Google Cloud billing (should be on free tier)

### OSM Returns No Data
**Fix**: The Overpass API might be busy, try again in a few minutes

---

## 🎉 After Fetching

Once done, your database will have trucks from around the world!

```bash
# Validate your new data
npm test

# Start the server
npm start

# Visit http://localhost:3000
# Filter by international cities!
```

---

## 💡 Pro Tips

1. **Run OSM first** (no setup) to get immediate results
2. **Then set up Google** for higher quality data
3. **Refresh monthly** to keep data current
4. **Both sources are additive** - you can use both!

---

## 📞 Need Help?

Check the documentation:
- `INTERNATIONAL_EXPANSION.md` - Detailed guide
- `DATA_SOURCES.md` - API setup guides
- `README.md` - General information

**Ready to go global? Pick an option above and run it! 🚀🌍**
