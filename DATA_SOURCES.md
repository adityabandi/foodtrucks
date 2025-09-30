# Data Sources and API Integration Guide

## Current Data Sources

The StreetEats database is compiled from various public sources:

### 1. Manual Research & Verification
- Official food truck websites
- Social media pages (Twitter, Facebook, Instagram)
- Business registrations and permits
- Local food truck associations
- Food blogger reviews and articles

### 2. Public Databases
- Google Places API (can be integrated)
- Yelp Fusion API (ready for integration)
- OpenStreetMap food truck data
- Municipal street vendor registries

## Integrating with Yelp Fusion API

### Setup Instructions

1. **Get API Key**
   - Visit [Yelp Fusion](https://www.yelp.com/developers/documentation/v3/get_started)
   - Create an app to get your API key
   - Free tier: 5000 API calls per day

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env and add your Yelp API key
   ```

3. **Example Integration Code**
   
   Add to `server.js`:
   ```javascript
   const axios = require('axios');
   
   async function searchYelpFoodTrucks(location, term = 'food truck') {
     const config = {
       headers: {
         Authorization: `Bearer ${process.env.YELP_API_KEY}`
       },
       params: {
         term: term,
         location: location,
         categories: 'foodtrucks',
         limit: 50
       }
     };
     
     try {
       const response = await axios.get(
         'https://api.yelp.com/v3/businesses/search',
         config
       );
       return response.data.businesses;
     } catch (error) {
       console.error('Yelp API Error:', error);
       return [];
     }
   }
   
   // New endpoint
   app.get('/api/yelp/search', async (req, res) => {
     const { location } = req.query;
     if (!location) {
       return res.status(400).json({ error: 'Location required' });
     }
     
     const results = await searchYelpFoodTrucks(location);
     res.json(results);
   });
   ```

4. **Install Required Package**
   ```bash
   npm install axios
   ```

## Alternative Free Data Sources

### 1. OpenStreetMap (Overpass API)
- **Pros**: Completely free, worldwide coverage
- **Data Available**: Location, name, cuisine type
- **Usage**: Query for nodes tagged as `amenity=fast_food` with `cuisine=*`

Example query:
```javascript
const overpassQuery = `
  [out:json];
  (
    node["amenity"="fast_food"]["cuisine"]["name"~"truck|cart|stand"](${bbox});
  );
  out body;
`;
```

### 2. Google Places API
- **Pros**: Comprehensive data, photos, reviews
- **Cons**: Paid after free tier (but generous free quota)
- **Free Tier**: $200 credit per month
- **Best For**: Detailed information, photos, real-time status

Example integration:
```javascript
const placesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json`;
const params = {
  query: 'food trucks',
  location: '40.7614,-73.9776',
  radius: 5000,
  key: process.env.GOOGLE_PLACES_API_KEY
};
```

### 3. Foursquare Places API
- **Pros**: Good coverage, free tier available
- **Free Tier**: 99,000 API calls per day
- **Data**: Ratings, tips, photos, hours

### 4. TripAdvisor Content API
- **Pros**: Reviews and ratings
- **Cons**: Requires partnership agreement
- **Best For**: User-generated reviews

## Data Collection Best Practices

### 1. Verification Process
- Cross-reference multiple sources
- Verify phone numbers and websites
- Check social media for activity
- Confirm operating hours from official sources

### 2. Update Frequency
- Location data: Weekly
- Hours: Monthly
- Menu/Specialties: Quarterly
- Photos: As available
- Ratings: Real-time (if integrated with APIs)

### 3. Data Quality Checks
```javascript
function validateFoodTruck(truck) {
  return (
    truck.name &&
    truck.city &&
    truck.country &&
    truck.location &&
    truck.location.lat &&
    truck.location.lng &&
    truck.cuisine &&
    truck.cuisine.length > 0 &&
    truck.rating >= 0 && truck.rating <= 5
  );
}
```

## Crowdsourcing Data

### Community Contributions
To accept user submissions:

1. Create a submission form
2. Implement verification workflow
3. Require proof (website, social media, photos)
4. Review before adding to database

Example submission endpoint:
```javascript
app.post('/api/submit-truck', async (req, res) => {
  const submission = req.body;
  
  // Validate data
  if (!validateFoodTruck(submission)) {
    return res.status(400).json({ error: 'Invalid data' });
  }
  
  // Store in pending submissions
  await savePendingSubmission(submission);
  
  res.json({ 
    message: 'Submission received for review',
    id: submission.id 
  });
});
```

## Scraping Considerations

### Legal and Ethical Guidelines
- Always check Terms of Service
- Respect robots.txt
- Use APIs when available
- Rate limit your requests
- Cache data appropriately
- Give attribution

### Recommended Scraping Tools (if allowed)
- **Puppeteer**: For JavaScript-heavy sites
- **Cheerio**: For static HTML
- **Axios**: For API calls

## Real-Time Data Sources

### Social Media Integration
Food trucks often announce locations on social media:

1. **Twitter API**
   - Track location announcements
   - Monitor food truck accounts
   - Real-time updates

2. **Instagram Basic Display API**
   - Latest photos
   - Location tags
   - Menu updates

3. **Facebook Graph API**
   - Events
   - Posts
   - Check-ins

## Data Maintenance

### Automated Updates
Set up cron jobs for:
```javascript
// Check for closed/moved trucks
schedule.scheduleJob('0 0 * * 0', async () => {
  await verifyAllTrucks();
});

// Update ratings from Yelp
schedule.scheduleJob('0 */6 * * *', async () => {
  await syncYelpRatings();
});
```

### Manual Review Schedule
- Weekly: New submissions
- Monthly: Data accuracy checks
- Quarterly: Full database audit

## Privacy and Data Protection

### Compliance
- GDPR for European users
- CCPA for California users
- Only collect necessary data
- Provide opt-out options
- Secure data storage

### Data Retention
- Keep data as long as business is active
- Remove data upon business closure
- Archive old data after 1 year of inactivity

## Resources

### APIs
- [Yelp Fusion API Docs](https://www.yelp.com/developers/documentation/v3)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service)
- [Foursquare Places API](https://developer.foursquare.com/)
- [OpenStreetMap Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [Insomnia](https://insomnia.rest/) - API client
- [DB Browser for SQLite](https://sqlitebrowser.org/) - If migrating to SQL

### Communities
- Food Truck Association websites
- Local street vendor groups
- Reddit: r/FoodTrucks
- Food blogger networks

---

**Remember**: Always prioritize data quality over quantity. Verified, accurate information is more valuable than a large database of questionable data.
