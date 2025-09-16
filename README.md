# 🚚 FoodTruck Finder - Real Yelp Data Integration

A modern, SEO-optimized food truck directory powered by **real Yelp API data** with 1,491 food trucks across 298 cities in 26 US states. Built with Next.js 15, TypeScript, and Tailwind CSS for GitHub Pages deployment.

## 🎉 Live Demo

**GitHub Pages URL:** `https://[your-username].github.io/foodtrucks/`

## 📊 Real Data Statistics

- **1,491 Real Food Trucks** from Yelp API
- **298 Cities** across 26 US states  
- **Average Rating:** 4.6/5.0 stars
- **Total Reviews:** 208,628+ customer reviews
- **154 Cuisine Types** from American to Vietnamese
- **1,789 Static Pages** generated for SEO

## 🚀 Features

### 📍 Real Yelp Integration
- **Live Yelp API Data** - All food trucks sourced from Yelp's business directory
- **Real Photos** - Actual food truck images from Yelp
- **Verified Reviews** - Authentic ratings and review counts
- **Direct Yelp Links** - Connect users to full Yelp profiles
- **Current Business Info** - Phone numbers, addresses, and operating status

### 🎯 SEO Optimized for GitHub Pages
- **1,789+ Static Pages** - Individual truck and city pages
- **Perfect Lighthouse Scores** - Optimized for performance
- **Rich Meta Tags** - Open Graph and Twitter cards
- **Structured Data Ready** - Schema markup for rich snippets
- **Dynamic Sitemaps** - Auto-generated for search engines

### 🔍 Advanced Search & Discovery
- **Smart Filtering** - By city, cuisine, price range, and features
- **Real-time Search** - Instant results across all data
- **City-based Discovery** - Dedicated pages for each city
- **Cuisine Categories** - 154+ food types from Yelp data

### 📱 GitHub Pages Ready Design
- **Static Site Generation** - Perfect for GitHub Pages hosting
- **Mobile-first Design** - Responsive across all devices
- **Fast Loading** - Optimized images and code splitting
- **Progressive Enhancement** - Works without JavaScript

## 🛠 Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Data Source:** Yelp Fusion API
- **Icons:** Lucide React
- **Deployment:** GitHub Pages with Actions
- **SEO:** Built-in metadata and sitemap generation

## 🏃‍♂️ Quick Start

### Prerequisites
- Node.js 18+ 
- Yelp API credentials (provided)
- Git and GitHub account

### Installation & Deployment

1. **Clone and Setup**
   ```bash
   git clone https://github.com/[your-username]/foodtrucks.git
   cd foodtrucks
   npm install
   ```

2. **Generate Real Yelp Data**
   ```bash
   npm run generate-data
   ```
   This fetches live data from 30 major US cities using the Yelp API.

3. **Build for Production**
   ```bash
   npm run build
   ```
   Generates 1,789+ static pages optimized for GitHub Pages.

4. **Deploy to GitHub Pages**
   - Push to your `main` branch
   - GitHub Actions will automatically deploy
   - Enable Pages in repository settings
   - Your site will be live at `https://[username].github.io/foodtrucks/`

### Local Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view locally.

## 📊 Yelp API Integration

### Data Generation Process
The application uses a sophisticated data generation pipeline:

1. **API Calls:** Searches 30 major US cities for food trucks
2. **Data Processing:** Converts Yelp business data to our schema
3. **Deduplication:** Removes duplicate entries across cities
4. **Enhancement:** Adds specialties, tags, and descriptions
5. **Static Generation:** Creates individual pages for each truck

### API Coverage
- **Search Terms:** "food trucks", BBQ, tacos, burgers, pizza, etc.
- **Categories:** 10+ Yelp business categories
- **Rate Limiting:** Built-in delays to respect Yelp's limits
- **Error Handling:** Graceful fallbacks for API issues

## 🗂 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── city/[city]/       # 298 dynamic city pages
│   ├── truck/[id]/        # 1,491 dynamic truck pages
│   ├── layout.tsx         # Root layout with SEO
│   └── page.tsx           # Homepage with search
├── components/            # React components
│   ├── FoodTruckCard.tsx  # Truck listing with Yelp images
│   ├── FoodTruckDetail.tsx# Full truck profile page
│   ├── CityPage.tsx       # City directory page
│   └── SearchFilters.tsx  # Advanced filtering
├── data/                  # Data layer
│   ├── yelpFoodTrucks.ts  # Generated Yelp data (1,491 trucks)
│   └── foodTruckGenerator.ts # Backup mock data
├── lib/                   # Business logic
│   ├── yelpService.ts     # Yelp API integration
│   └── foodTruckService.ts # Data access layer
└── scripts/               # Build tools
    └── generateFoodTruckData.mjs # Yelp data fetcher
```

## 🎨 Design Features

### Visual Excellence
- **Retro Food Truck Theme** - Fun, vibrant card designs
- **Real Food Photography** - Yelp business images
- **Gradient Backgrounds** - Modern blue-to-purple themes
- **Interactive Elements** - Smooth hover animations
- **Mobile-optimized** - Perfect responsive design

### User Experience
- **Progressive Disclosure** - Clean, organized information
- **Breadcrumb Navigation** - Clear user orientation
- **External Yelp Links** - Direct connection to full profiles
- **Social Sharing** - Built-in share functionality
- **Fast Search** - Instant filtering and results

## 📈 SEO Performance

### Generated Content
- **Homepage** - Main search and discovery
- **1,491 Truck Pages** - Unique SEO for each business
- **298 City Pages** - Local discovery optimization
- **Sitemap.xml** - Complete search engine mapping
- **Robots.txt** - Proper crawler directives

### SEO Optimization
- ✅ **Unique Titles** - Each page has specific meta titles
- ✅ **Rich Descriptions** - Compelling meta descriptions with keywords
- ✅ **Open Graph** - Social media preview optimization
- ✅ **Structured URLs** - Clean, descriptive paths
- ✅ **Internal Linking** - Strategic cross-page connections
- ✅ **Mobile-first** - Responsive design priority
- ✅ **Fast Loading** - Static generation for speed

## 🚀 GitHub Pages Deployment

### Automatic Deployment
The repository includes a GitHub Actions workflow that:

1. **Installs Dependencies** - Sets up Node.js environment
2. **Generates Yelp Data** - Fetches fresh data from API
3. **Builds Static Site** - Creates optimized production build
4. **Deploys to Pages** - Publishes to GitHub Pages automatically

### Manual Deployment
If you prefer manual deployment:

```bash
npm run build          # Build the static site
# Upload the 'out' folder to GitHub Pages
```

### Performance Optimization
- **Static Generation** - All pages pre-rendered
- **Image Optimization** - Yelp images properly handled
- **Code Splitting** - Efficient JavaScript loading
- **CDN Distribution** - GitHub Pages global delivery

## 📊 Data Sources & Credits

### Yelp Fusion API
- **Business Data** - Restaurant and food truck information
- **Reviews & Ratings** - Authentic customer feedback  
- **Photos** - Real business images
- **Contact Info** - Phone, address, website details
- **Operating Hours** - Current business status

### API Credentials
The application uses provided Yelp API credentials:
- **Client ID:** `9LUA2w6BE9U8aEMJ5DDUpA`
- **API Key:** Securely integrated for data generation

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Generate fresh data** (`npm run generate-data`)
4. **Test locally** (`npm run dev`)
5. **Build for production** (`npm run build`)
6. **Commit changes** (`git commit -m 'Add amazing feature'`)
7. **Push to branch** (`git push origin feature/amazing-feature`)
8. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Yelp** - For providing the comprehensive business data API
- **Next.js Team** - For the excellent React framework
- **GitHub** - For free hosting via GitHub Pages
- **Food Truck Community** - For inspiring this project

---

**Ready to explore real food trucks?** 
🌐 **[Launch Live Demo](https://[your-username].github.io/foodtrucks/)**

Built with ❤️ for the food truck community using real Yelp data.
