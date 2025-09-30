# 🚚 StreetEats - Global Food Truck Database

A comprehensive, SEO-optimized database featuring **10,742+ real food trucks** from major cities around the world. Each food truck has its own dedicated page with rich information for maximum search visibility.

**Live Site:** https://adityabandi.github.io/foodtrucks

![Food Trucks](https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=400&fit=crop)

## ✨ Features

### 🌍 Massive Global Coverage
- **10,742+ verified food trucks** from around the world
- **30+ major cities** across 23+ countries
- Real business data from Yelp, Google Places, and OpenStreetMap
- North America, Europe, Asia, South America, Africa, and Oceania

### 🎯 SEO Optimized
- **Individual pages for each food truck** (10,742+ pages!)
- Rich meta tags (Open Graph, Twitter Cards)
- Structured data (Schema.org JSON-LD)
- Dynamic sitemap generation
- Mobile-responsive design
- Fast page loads with client-side rendering

### 🔍 Advanced Search & Filtering
- Search by name, cuisine, city, or specialty
- Filter by cuisine type (50+ cuisines)
- Filter by city and country
- Filter by price range ($, $$, $$$)
- Filter by rating (4.5+, 4.7+, 4.9+)

### 🎨 Beautiful Retro Design
- 1950s/60s American diner aesthetic
- Chrome accents and vintage colors
- Smooth animations and transitions
- Fully responsive across all devices

## 🏗️ Architecture

### For Development (Node.js Server)
```
npm install
npm start
```
Runs a full Express.js server with dynamic API endpoints at `http://localhost:3000`

### For Production (Static GitHub Pages)
```
npm run build
```
Generates a complete static site with:
- 10,742+ individual HTML pages (one per food truck)
- Pre-computed JSON API files
- Sitemap with all URLs
- robots.txt
- Optimized assets

The build process creates a `/dist` directory that can be deployed to any static host.

## 📁 Project Structure

```
StreetEats/
├── public/                      # Source files
│   ├── index.html              # Main homepage
│   ├── truck.html              # Food truck detail template
│   ├── app.js                  # Homepage JavaScript
│   ├── truck.js                # Detail page JavaScript
│   └── styles.css              # All styles
│
├── data/
│   └── foodtrucks.json         # Complete database (15MB+)
│
├── server.js                   # Express server for development
├── build-github-pages.js       # Static site generator
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deployment workflow
│
└── dist/                       # Generated static site (gitignored)
    ├── index.html
    ├── truck/
    │   ├── ft001/index.html
    │   ├── ft002/index.html
    │   └── ... (10,742 pages)
    ├── api/
    │   ├── foodtrucks.json
    │   ├── stats.json
    │   └── foodtrucks/
    │       ├── ft001.json
    │       └── ... (10,742 files)
    └── sitemap.xml
```

## 🚀 Quick Start

### Development
```bash
# Clone the repository
git clone https://github.com/adityabandi/foodtrucks.git
cd foodtrucks

# Install dependencies
npm install

# Start development server
npm start

# Open http://localhost:3000
```

### Build for Production
```bash
# Generate static site
npm run build

# The ./dist directory is ready to deploy
```

## 🌐 Deployment

### Automatic Deployment (GitHub Pages)
The site automatically deploys when you push to the `main` branch:
1. Push changes to GitHub
2. GitHub Actions builds the site
3. Deploys to GitHub Pages
4. Live at https://adityabandi.github.io/foodtrucks

### Manual Deployment
```bash
npm run build
# Deploy the ./dist directory to any static host:
# - GitHub Pages
# - Netlify
# - Vercel
# - AWS S3
# - Any web server
```

## 📊 Data Sources

Our comprehensive database includes verified data from:
- **Yelp Fusion API** - Business listings, ratings, reviews
- **Google Places API** - Additional location data
- **OpenStreetMap** - International food truck data
- Public business registrations
- Social media verification

### Data Structure
Each food truck includes:
```json
{
  "id": "ft001",
  "name": "Food Truck Name",
  "city": "New York",
  "country": "USA",
  "location": {
    "address": "Full address",
    "lat": 40.7468,
    "lng": -73.8599
  },
  "cuisine": ["Mexican", "Tacos"],
  "specialties": ["Specialty 1", "Specialty 2"],
  "rating": 4.8,
  "priceRange": "$$",
  "operatingHours": { ... },
  "contact": {
    "phone": "+1-xxx-xxx-xxxx",
    "website": "https://...",
    "twitter": "@handle"
  },
  "image": "image_url",
  "verified": true,
  "reviewCount": 150
}
```

## 🎨 Design Philosophy

The design pays homage to classic American diners of the 1950s and 1960s:
- **Chrome accents** and metallic finishes
- **Cherry red and mint green** color palette
- **Bold typography** with Bebas Neue headers
- **Retro checkerboard** and vinyl textures
- Modern usability with vintage aesthetics

## 🔧 API Endpoints

### Development Server
```
GET /api/foodtrucks              # All food trucks (with filters)
GET /api/foodtrucks/:id          # Single food truck
GET /api/cities                  # All cities
GET /api/cuisines                # All cuisine types
GET /api/stats                   # Platform statistics
GET /sitemap.xml                 # Dynamic sitemap
GET /robots.txt                  # Robots file
```

### Static Site (GitHub Pages)
```
/api/foodtrucks.json             # All food trucks
/api/foodtrucks/:id.json         # Single food truck
/api/cities.json                 # All cities
/api/cuisines.json               # All cuisines
/api/stats.json                  # Statistics
/truck/:id/                      # Individual pages
```

## 📈 SEO Features

Each food truck page includes:
- ✅ Unique, descriptive title tags
- ✅ Custom meta descriptions
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Card tags
- ✅ Schema.org structured data (FoodEstablishment)
- ✅ Canonical URLs
- ✅ Semantic HTML5
- ✅ Mobile-responsive design
- ✅ Fast load times
- ✅ Clean URLs (no parameters)

Example structured data:
```json
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "name": "Taco Truck",
  "address": { ... },
  "geo": { ... },
  "servesCuisine": ["Mexican"],
  "priceRange": "$$",
  "aggregateRating": { ... }
}
```

## 🌟 Cities Covered

### North America
New York, Los Angeles, San Francisco, Chicago, Boston, Austin, Toronto, Montreal, Vancouver, Seattle, Portland, Denver, Miami, Philadelphia, and more

### Europe  
London, Paris, Berlin, Barcelona, Rome, Amsterdam, Brussels, Vienna, Prague, Athens, and more

### Asia
Tokyo, Seoul, Bangkok, Singapore, Hong Kong, Mumbai, Delhi, Beijing, Shanghai, Taipei, and more

### Other Regions
Sydney, Melbourne, Buenos Aires, São Paulo, Mexico City, Cape Town, and more

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

We welcome contributions! To add food trucks:

1. Fork the repository
2. Add verified food truck data to `data/foodtrucks.json`
3. Run `npm run validate` to check data format
4. Submit a pull request with sources

### Data Requirements
- Verified business information
- Real operating hours
- Actual contact information
- Accurate location data
- No fake or duplicate entries

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 🙏 Acknowledgments

- Food truck data from Yelp, Google Places, OpenStreetMap
- Images from Unsplash
- Icons from Unicode emoji
- Inspired by classic American diner culture

## 📞 Contact

- **GitHub:** [@adityabandi](https://github.com/adityabandi)
- **Project:** [StreetEats](https://github.com/adityabandi/foodtrucks)
- **Live Site:** [https://adityabandi.github.io/foodtrucks](https://adityabandi.github.io/foodtrucks)

---

**Built with ❤️ for street food lovers worldwide** 🚚🌍

*Last updated: 2024*
