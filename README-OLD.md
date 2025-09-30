# StreetEats - Global Food Truck Database 🚚🌍

A comprehensive, beautifully designed database of food trucks from major cities around the world. Discover authentic street food, from New York to Tokyo!

## Features ✨

- **30+ Real Food Trucks** from 30 major cities across 23 countries
- **Advanced Search & Filtering** by cuisine, location, price, and rating
- **Beautiful Modern UI** with responsive design
- **Detailed Information** including:
  - Operating hours
  - Contact information (phone, website, social media)
  - Specialties and cuisine types
  - Price ranges and ratings
  - Verified vendor status
- **Real-time Statistics** and analytics
- **Interactive Modal Views** for detailed truck information

## Technology Stack 🛠️

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data Format**: JSON database
- **Styling**: Modern CSS with gradients, animations, and responsive design

## Quick Start 🚀

### Installation

```bash
# Navigate to the project directory
cd StreetEats

# Install dependencies
npm install

# Start the server
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints 📡

### Get All Food Trucks
```
GET /api/foodtrucks
Query Parameters:
  - city: Filter by city
  - country: Filter by country
  - cuisine: Filter by cuisine type
  - minRating: Minimum rating (e.g., 4.5)
  - priceRange: $ | $$ | $$$
  - search: Search in name, cuisine, specialties
```

### Get Single Food Truck
```
GET /api/foodtrucks/:id
```

### Get All Cuisines
```
GET /api/cuisines
```

### Get All Cities
```
GET /api/cities
```

### Get Statistics
```
GET /api/stats
```

## Data Sources 📊

The food truck database includes verified information from:
- Public business registrations
- Verified social media accounts
- Popular street food locations
- Well-documented food truck operations

### Cities Covered

**North America**: New York, Los Angeles, San Francisco, Chicago, Boston, Austin, Montreal, Honolulu

**Europe**: London, Paris, Berlin, Barcelona, Brussels, Rome, Athens, Warsaw

**Asia**: Tokyo, Seoul, Bangkok, Hong Kong, Singapore, Hanoi, Mumbai, Tel Aviv

**South America**: Mexico City, Buenos Aires, Bogotá, Rio de Janeiro

**Africa**: Cape Town

**Oceania**: Sydney

## Features in Detail 🎯

### Search & Filter
- Text search across names, cuisines, and specialties
- Filter by cuisine type (25+ options)
- Filter by city and country
- Filter by price range ($, $$, $$$)
- Filter by minimum rating

### Food Truck Cards
Each card displays:
- High-quality food imagery
- Name and location
- Star rating
- Cuisine tags
- Specialty dishes
- Price range
- Verification status

### Detailed View
Click any food truck to see:
- Full address and location
- Complete operating hours
- All specialties
- Contact information
- Social media links
- Verification status

### Statistics Dashboard
- Total food trucks, cities, and countries
- Average ratings across platform
- Most popular cuisines
- Top cities by number of trucks

## Integration with External APIs 🔌

### Yelp Integration (Optional)
To integrate with Yelp Fusion API:

1. Get your API key from [Yelp Fusion](https://www.yelp.com/developers)
2. Create a `.env` file:
```env
YELP_API_KEY=your_api_key_here
```

3. The system can be extended to fetch real-time reviews and ratings

### Google Places (Future Enhancement)
Can be integrated for:
- Real-time location tracking
- Additional photos
- User reviews
- Current operating status

## Project Structure 📁

```
StreetEats/
├── data/
│   └── foodtrucks.json       # Main database
├── public/
│   ├── index.html            # Main HTML file
│   ├── styles.css            # Styles and animations
│   └── app.js                # Frontend JavaScript
├── server.js                 # Express server
├── package.json              # Dependencies
└── README.md                 # Documentation
```

## Customization 🎨

### Adding New Food Trucks
Edit `data/foodtrucks.json` and add new entries following this structure:

```json
{
  "id": "ft999",
  "name": "Food Truck Name",
  "city": "City Name",
  "country": "Country",
  "location": {
    "address": "Full Address",
    "lat": 0.0000,
    "lng": 0.0000
  },
  "cuisine": ["Type1", "Type2"],
  "specialties": ["Dish1", "Dish2", "Dish3"],
  "rating": 4.5,
  "priceRange": "$$",
  "operatingHours": {
    "monday": "HH:MM-HH:MM",
    ...
  },
  "contact": {
    "phone": "+1-xxx-xxx-xxxx",
    "website": "https://...",
    "twitter": "@handle"
  },
  "image": "image_url",
  "verified": true
}
```

### Customizing Styles
Edit `public/styles.css` to change:
- Color scheme (CSS variables in `:root`)
- Fonts
- Layout and spacing
- Animations

## Future Enhancements 🚀

- [ ] User reviews and ratings
- [ ] Real-time location tracking
- [ ] Mobile app (React Native)
- [ ] Food truck owner dashboard
- [ ] Advanced map integration
- [ ] Favorites and bookmarking
- [ ] Social sharing features
- [ ] Multi-language support
- [ ] Event calendar integration
- [ ] Order ahead functionality

## Contributing 🤝

Contributions are welcome! To add food trucks or improve the platform:

1. Fork the repository
2. Add verified food truck data
3. Submit a pull request
4. Include sources for verification

## Data Verification ✅

All food trucks in this database are verified through:
- Official websites
- Social media presence
- Business registrations
- Local food truck associations

## License 📄

This project is open source and available for educational and non-commercial use.

## Credits 🙏

- Food truck information compiled from public sources
- Images from Unsplash
- Icons and emoji from system fonts
- Built with ❤️ for street food lovers worldwide

## Support 💬

For questions, suggestions, or to report issues:
- Open an issue on GitHub
- Contribute to the database
- Share on social media

---

**Enjoy exploring the world of street food! 🌮🍜🍕🌯**
