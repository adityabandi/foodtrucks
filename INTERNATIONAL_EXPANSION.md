# International Food Trucks - Coming Soon! 🌍

## Current Status

**Current Database**: 9,812 real food trucks from 50 US cities (from Yelp API)

## Why US-Only Currently?

The Yelp Fusion API has the strongest coverage in the United States. While Yelp operates in other countries, food truck data outside the US is limited.

## How to Add International Trucks

### Option 1: Google Places API (Recommended for Global)

Google Places has the best international coverage:

```javascript
// Add to fetch-yelp-data.js or create fetch-google-places.js
const axios = require('axios');

const internationalCities = [
  { city: 'London', country: 'UK' },
  { city: 'Paris', country: 'France' },
  { city: 'Tokyo', country: 'Japan' },
  { city: 'Sydney', country: 'Australia' },
  { city: 'Toronto', country: 'Canada' },
  { city: 'Berlin', country: 'Germany' },
  { city: 'Amsterdam', country: 'Netherlands' },
  { city: 'Barcelona', country: 'Spain' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'Singapore', country: 'Singapore' }
];

async function fetchGooglePlacesFoodTrucks(city, country) {
  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/place/textsearch/json',
    {
      params: {
        query: `food trucks in ${city}`,
        key: process.env.GOOGLE_PLACES_API_KEY
      }
    }
  );
  return response.data.results;
}
```

**Setup**:
1. Get API key: https://developers.google.com/maps/documentation/places/web-service/get-api-key
2. Add to `.env`: `GOOGLE_PLACES_API_KEY=your_key`
3. Free tier: $200 credit/month

### Option 2: OpenStreetMap (Overpass API) - FREE

Completely free, worldwide coverage:

```javascript
async function fetchOSMFoodTrucks(city, country) {
  const query = `
    [out:json];
    area["name"="${city}"]["admin_level"="8"]->.searchArea;
    (
      node["amenity"="fast_food"]["cuisine"]["name"~"truck|cart"](area.searchArea);
      way["amenity"="fast_food"]["cuisine"]["name"~"truck|cart"](area.searchArea);
    );
    out body;
  `;
  
  const response = await axios.post(
    'https://overpass-api.de/api/interpreter',
    query
  );
  return response.data.elements;
}
```

**Pros**: 
- Completely free
- No API key needed
- Worldwide coverage

**Cons**:
- Less detailed business info
- Community-maintained data
- May need manual verification

### Option 3: Manual Curation

For specific international markets:

1. **Research local sources**:
   - City food truck associations
   - Local food blogs
   - Social media accounts
   - Municipal permits

2. **Verify information**:
   - Cross-reference multiple sources
   - Check social media for activity
   - Verify addresses on maps

3. **Add to database**:
   ```json
   {
     "id": "ft9813",
     "name": "London Street Kitchen",
     "city": "London",
     "country": "UK",
     ...
   }
   ```

## Recommended Approach

### Phase 1: Current (Done) ✅
- 9,812 US food trucks from Yelp

### Phase 2: Google Places (Next)
- Add 10-20 major international cities
- Target: ~2,000 international trucks
- Cost: Free (within $200/month credit)

### Phase 3: Manual Curation
- Famous international trucks
- Street food markets
- Food festivals

### Phase 4: Community Contributions
- Allow users to submit trucks
- Verification workflow
- Crowdsourced updates

## International Cities to Target

### Europe (High Priority)
1. London, UK - ~100 trucks
2. Paris, France - ~50 trucks
3. Berlin, Germany - ~80 trucks
4. Amsterdam, Netherlands - ~40 trucks
5. Barcelona, Spain - ~60 trucks

### Asia (High Priority)
1. Tokyo, Japan - ~200 trucks
2. Bangkok, Thailand - ~300+ street vendors
3. Singapore - ~50 trucks
4. Hong Kong - ~100 carts
5. Seoul, South Korea - ~150 trucks

### Oceania
1. Sydney, Australia - ~80 trucks
2. Melbourne, Australia - ~70 trucks
3. Auckland, New Zealand - ~30 trucks

### Canada
1. Toronto - ~60 trucks
2. Vancouver - ~50 trucks
3. Montreal - ~40 trucks

### Middle East
1. Dubai, UAE - ~40 trucks
2. Tel Aviv, Israel - ~30 trucks

### Latin America
1. Mexico City, Mexico - ~500+ trucks
2. São Paulo, Brazil - ~200 trucks
3. Buenos Aires, Argentina - ~100 trucks

## Implementation Timeline

**Week 1**: Set up Google Places API
**Week 2-3**: Fetch international data
**Week 4**: Verify and clean data
**Week 5**: Add to database and test

## Data Quality Standards

For international trucks:
- Minimum 3.5 star rating
- Active within last 6 months
- Verified location
- Contact information available
- At least 5 reviews (where applicable)

## Estimated Total Coverage

With full international expansion:
- **US**: 9,812 trucks ✅
- **International**: ~3,000-5,000 trucks
- **Total**: 12,000-15,000 food trucks globally

---

**Bottom Line**: The US data is real and comprehensive. International expansion is totally feasible with Google Places API or manual curation!
