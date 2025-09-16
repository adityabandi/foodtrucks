# FoodTruck Finder - Comprehensive US Food Truck Directory

A modern, SEO-optimized web application for discovering the best food trucks across the United States. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

### 🍔 Comprehensive Directory
- **440+ Food Trucks** across 50+ major US cities
- **35+ Cuisine Types** from American to Vietnamese
- **Detailed Profiles** with unique content for each truck
- **City-based Pages** for location-specific discovery

### 🔍 Advanced Search & Filtering
- **Smart Search** - Find trucks by name, cuisine, or specialty
- **City & State Filters** - Browse by location
- **Cuisine Filtering** - Discover specific food types
- **Price Range Options** - Budget, Moderate, Premium
- **Feature Tags** - Family-friendly, late-night, catering, etc.

### 📱 Modern, Responsive Design
- **Sleek UI** with gradient hero sections
- **Card-based Layout** for easy browsing
- **Mobile-first Design** - Perfect on all devices
- **Intuitive Navigation** with breadcrumbs and clear CTAs

### 🎯 SEO Optimized
- **Individual Pages** for each food truck (440+ pages)
- **City Landing Pages** (50+ pages) for local SEO
- **Structured Metadata** with Open Graph and Twitter cards
- **Dynamic Sitemaps** and robots.txt
- **Schema Markup** ready for rich snippets
- **Static Site Generation** for lightning-fast loading

### 📊 Rich Content & Data
- **Detailed Truck Profiles** with owner stories, specialties, hours
- **Rating & Review System** with aggregated scores
- **Contact Information** including phone, website, social media
- **Location Details** with address and interactive map placeholders
- **Cuisine Categories** and specialty dish highlights

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **SEO**: Built-in Next.js metadata and sitemap generation
- **Data**: Static generation with mock data (easily replaceable with API)

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityabandi/foodtrucks.git
   cd foodtrucks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── city/[city]/       # Dynamic city pages
│   ├── truck/[id]/        # Dynamic truck pages
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Homepage
│   ├── robots.ts          # Robots.txt generation
│   └── sitemap.ts         # Sitemap generation
├── components/            # Reusable UI components
│   ├── FoodTruckCard.tsx  # Truck listing card
│   ├── FoodTruckDetail.tsx# Individual truck page
│   ├── SearchFilters.tsx  # Advanced filtering
│   ├── CityPage.tsx       # City directory page
│   ├── HeroSection.tsx    # Homepage hero
│   └── StatsSection.tsx   # Statistics display
├── data/                  # Data layer
│   └── foodTruckGenerator.ts # Mock data generation
├── lib/                   # Utilities and services
│   └── foodTruckService.ts # Business logic and data access
└── types/                 # TypeScript definitions
    └── foodtruck.ts       # Data interfaces
```

## 📈 Performance & SEO

### SEO Features
- ✅ **Unique Page Titles** for all 500+ pages
- ✅ **Meta Descriptions** with relevant keywords
- ✅ **Open Graph & Twitter Cards** for social sharing
- ✅ **Structured URLs** (/truck/[id], /city/[city])
- ✅ **Internal Linking** strategy for better crawling
- ✅ **Mobile-friendly** responsive design
- ✅ **Fast Loading** with static generation

### Content Strategy
- **Unique Content** for each food truck and city
- **Local SEO** optimization for city pages
- **Long-tail Keywords** targeting specific cuisines and locations
- **Rich Snippets** ready markup for enhanced search results

## 🎨 Design Features

### Visual Elements
- **Gradient Backgrounds** - Modern blue-to-purple gradients
- **Card-based Layout** - Clean, organized information display
- **Consistent Typography** - Clear hierarchy and readability
- **Interactive Elements** - Hover effects and smooth transitions
- **Color-coded Categories** - Easy visual identification

### User Experience
- **Progressive Disclosure** - Advanced filters hidden by default
- **Breadcrumb Navigation** - Clear location awareness
- **Quick Actions** - Call, directions, website links
- **Social Sharing** - Built-in share functionality
- **Favorites System** - Save trucks for later

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Self-hosted
```bash
npm run build
npm start
```

## 📊 SEO Performance

### Generated Pages
- **440+ Food Truck Pages** - Individual truck profiles
- **50+ City Pages** - Local discovery pages
- **1 Homepage** - Main directory and search
- **Auto-generated Sitemap** - XML sitemap for search engines
- **Robots.txt** - Proper crawler directives

### SEO Checklist
- ✅ Unique page titles and meta descriptions
- ✅ Semantic HTML structure
- ✅ Internal linking strategy
- ✅ Mobile-responsive design
- ✅ Fast loading times with SSG
- ✅ Social media meta tags
- ✅ Structured data ready
- ✅ Clean, descriptive URLs

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

**Built with ❤️ for the food truck community**

Ready to discover amazing food trucks? [Start exploring now!](http://localhost:3000)
