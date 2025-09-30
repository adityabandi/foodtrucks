require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

// Major international cities for food trucks
const internationalCities = [
  // Europe
  { city: 'London', country: 'UK', query: 'London, United Kingdom' },
  { city: 'Paris', country: 'France', query: 'Paris, France' },
  { city: 'Berlin', country: 'Germany', query: 'Berlin, Germany' },
  { city: 'Amsterdam', country: 'Netherlands', query: 'Amsterdam, Netherlands' },
  { city: 'Barcelona', country: 'Spain', query: 'Barcelona, Spain' },
  { city: 'Rome', country: 'Italy', query: 'Rome, Italy' },
  { city: 'Madrid', country: 'Spain', query: 'Madrid, Spain' },
  { city: 'Brussels', country: 'Belgium', query: 'Brussels, Belgium' },
  { city: 'Copenhagen', country: 'Denmark', query: 'Copenhagen, Denmark' },
  { city: 'Dublin', country: 'Ireland', query: 'Dublin, Ireland' },
  
  // Asia
  { city: 'Tokyo', country: 'Japan', query: 'Tokyo, Japan' },
  { city: 'Seoul', country: 'South Korea', query: 'Seoul, South Korea' },
  { city: 'Bangkok', country: 'Thailand', query: 'Bangkok, Thailand' },
  { city: 'Singapore', country: 'Singapore', query: 'Singapore' },
  { city: 'Hong Kong', country: 'China', query: 'Hong Kong' },
  { city: 'Taipei', country: 'Taiwan', query: 'Taipei, Taiwan' },
  { city: 'Mumbai', country: 'India', query: 'Mumbai, India' },
  { city: 'Dubai', country: 'UAE', query: 'Dubai, UAE' },
  { city: 'Tel Aviv', country: 'Israel', query: 'Tel Aviv, Israel' },
  { city: 'Shanghai', country: 'China', query: 'Shanghai, China' },
  
  // Oceania
  { city: 'Sydney', country: 'Australia', query: 'Sydney, Australia' },
  { city: 'Melbourne', country: 'Australia', query: 'Melbourne, Australia' },
  { city: 'Brisbane', country: 'Australia', query: 'Brisbane, Australia' },
  { city: 'Auckland', country: 'New Zealand', query: 'Auckland, New Zealand' },
  { city: 'Wellington', country: 'New Zealand', query: 'Wellington, New Zealand' },
  
  // Canada
  { city: 'Toronto', country: 'Canada', query: 'Toronto, Canada' },
  { city: 'Vancouver', country: 'Canada', query: 'Vancouver, Canada' },
  { city: 'Montreal', country: 'Canada', query: 'Montreal, Canada' },
  
  // Latin America
  { city: 'Mexico City', country: 'Mexico', query: 'Mexico City, Mexico' },
  { city: 'São Paulo', country: 'Brazil', query: 'São Paulo, Brazil' },
  { city: 'Buenos Aires', country: 'Argentina', query: 'Buenos Aires, Argentina' },
  { city: 'Santiago', country: 'Chile', query: 'Santiago, Chile' },
  { city: 'Lima', country: 'Peru', query: 'Lima, Peru' },
  { city: 'Bogotá', country: 'Colombia', query: 'Bogotá, Colombia' },
  
  // Africa
  { city: 'Cape Town', country: 'South Africa', query: 'Cape Town, South Africa' },
  { city: 'Johannesburg', country: 'South Africa', query: 'Johannesburg, South Africa' }
];

async function searchGooglePlacesFoodTrucks(location) {
  const searches = [
    'food trucks',
    'food carts',
    'street food vendors',
    'mobile food vendors'
  ];
  
  const allResults = [];
  
  for (const searchTerm of searches) {
    try {
      const response = await axios.get(
        'https://maps.googleapis.com/maps/api/place/textsearch/json',
        {
          params: {
            query: `${searchTerm} in ${location}`,
            key: GOOGLE_API_KEY,
            type: 'restaurant'
          }
        }
      );
      
      if (response.data.results) {
        allResults.push(...response.data.results);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.error(`Error searching ${searchTerm} in ${location}:`, error.message);
    }
  }
  
  // Remove duplicates by place_id
  const uniqueResults = Array.from(
    new Map(allResults.map(item => [item.place_id, item])).values()
  );
  
  return uniqueResults;
}

async function getPlaceDetails(placeId) {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          fields: 'name,formatted_address,geometry,rating,formatted_phone_number,website,opening_hours,price_level,photos,types,user_ratings_total',
          key: GOOGLE_API_KEY
        }
      }
    );
    
    return response.data.result;
  } catch (error) {
    console.error(`Error getting details for ${placeId}:`, error.message);
    return null;
  }
}

function mapGoogleToOurFormat(place, city, country, index) {
  // Extract cuisine from types
  const cuisineMap = {
    'mexican_restaurant': 'Mexican',
    'chinese_restaurant': 'Chinese',
    'japanese_restaurant': 'Japanese',
    'italian_restaurant': 'Italian',
    'indian_restaurant': 'Indian',
    'thai_restaurant': 'Thai',
    'french_restaurant': 'French',
    'spanish_restaurant': 'Spanish',
    'korean_restaurant': 'Korean',
    'vietnamese_restaurant': 'Vietnamese',
    'greek_restaurant': 'Greek',
    'mediterranean_restaurant': 'Mediterranean',
    'middle_eastern_restaurant': 'Middle Eastern',
    'american_restaurant': 'American',
    'seafood_restaurant': 'Seafood',
    'barbecue_restaurant': 'BBQ',
    'fast_food_restaurant': 'Fast Food',
    'cafe': 'Cafe'
  };
  
  const cuisines = place.types
    ?.map(type => cuisineMap[type])
    .filter(Boolean)
    .slice(0, 3) || ['Street Food'];
  
  if (cuisines.length === 0) cuisines.push('Street Food');
  
  // Price range conversion
  const priceMap = {
    1: '$',
    2: '$$',
    3: '$$$',
    4: '$$$'
  };
  
  // Get photo URL
  let imageUrl = 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400';
  if (place.photos && place.photos.length > 0) {
    const photoRef = place.photos[0].photo_reference;
    imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`;
  }
  
  const id = `ft${String(index + 1).padStart(5, '0')}`;
  
  return {
    id: id,
    name: place.name,
    city: city,
    country: country,
    location: {
      address: place.formatted_address || '',
      lat: place.geometry?.location?.lat || 0,
      lng: place.geometry?.location?.lng || 0
    },
    cuisine: cuisines,
    specialties: [
      `${cuisines[0]} Specialties`,
      'Local Favorites',
      'Daily Specials'
    ],
    rating: place.rating || 4.0,
    priceRange: priceMap[place.price_level] || '$$',
    operatingHours: place.opening_hours?.weekday_text ? {
      monday: place.opening_hours.weekday_text[0] || 'Hours vary',
      tuesday: place.opening_hours.weekday_text[1] || 'Hours vary',
      wednesday: place.opening_hours.weekday_text[2] || 'Hours vary',
      thursday: place.opening_hours.weekday_text[3] || 'Hours vary',
      friday: place.opening_hours.weekday_text[4] || 'Hours vary',
      saturday: place.opening_hours.weekday_text[5] || 'Hours vary',
      sunday: place.opening_hours.weekday_text[6] || 'Hours vary'
    } : {
      monday: 'Hours vary - check website',
      tuesday: 'Hours vary - check website',
      wednesday: 'Hours vary - check website',
      thursday: 'Hours vary - check website',
      friday: 'Hours vary - check website',
      saturday: 'Hours vary - check website',
      sunday: 'Hours vary - check website'
    },
    contact: {
      phone: place.formatted_phone_number || '',
      website: place.website || '',
      google: `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
    },
    image: imageUrl,
    verified: true,
    googlePlaceId: place.place_id,
    reviewCount: place.user_ratings_total || 0,
    source: 'google_places'
  };
}

async function fetchAllInternationalTrucks() {
  if (!GOOGLE_API_KEY || GOOGLE_API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
    console.error('❌ Error: GOOGLE_PLACES_API_KEY not set in .env file');
    console.log('\n📝 To get a Google Places API key:');
    console.log('1. Visit: https://console.cloud.google.com/');
    console.log('2. Create a project');
    console.log('3. Enable "Places API"');
    console.log('4. Create credentials (API key)');
    console.log('5. Add to .env: GOOGLE_PLACES_API_KEY=your_key\n');
    process.exit(1);
  }
  
  console.log('🌍 Fetching international food trucks from Google Places API...\n');
  console.log('⏳ This will take 10-15 minutes to fetch data from 37 cities...\n');
  
  const allTrucks = [];
  let truckIndex = 10000; // Start after existing Yelp trucks
  let citiesProcessed = 0;
  
  for (const cityInfo of internationalCities) {
    citiesProcessed++;
    console.log(`\n[${citiesProcessed}/${internationalCities.length}] 📍 Searching ${cityInfo.city}, ${cityInfo.country}...`);
    
    const places = await searchGooglePlacesFoodTrucks(cityInfo.query);
    
    if (places.length > 0) {
      console.log(`   ✅ Found ${places.length} potential food vendors`);
      
      // Get details for top-rated places
      const topPlaces = places
        .filter(p => p.rating >= 3.5)
        .slice(0, 20); // Limit to top 20 per city
      
      console.log(`   🔍 Getting details for ${topPlaces.length} top-rated vendors...`);
      
      for (const place of topPlaces) {
        const details = await getPlaceDetails(place.place_id);
        if (details) {
          const mappedTruck = mapGoogleToOurFormat(details, cityInfo.city, cityInfo.country, truckIndex);
          allTrucks.push(mappedTruck);
          truckIndex++;
        }
        
        // Rate limiting for details API
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log(`   ✅ Added ${topPlaces.length} trucks from ${cityInfo.city}`);
    } else {
      console.log(`   ⚠️  No food vendors found`);
    }
    
    console.log(`   📊 Total collected so far: ${allTrucks.length} trucks`);
    
    // Rate limiting between cities
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return allTrucks;
}

async function mergeWithExistingData() {
  try {
    console.log('\n🔄 Merging with existing Yelp data...');
    
    // Load existing data
    const existingPath = path.join(__dirname, 'data', 'foodtrucks.json');
    const existingData = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    
    console.log(`📊 Existing trucks: ${existingData.foodTrucks.length}`);
    
    // Fetch international trucks
    const internationalTrucks = await fetchAllInternationalTrucks();
    
    console.log(`\n\n📊 International trucks fetched: ${internationalTrucks.length}`);
    
    // Merge data
    const mergedTrucks = [...existingData.foodTrucks, ...internationalTrucks];
    
    const database = {
      foodTrucks: mergedTrucks,
      metadata: {
        totalTrucks: mergedTrucks.length,
        cities: [...new Set(mergedTrucks.map(t => t.city))].length,
        countries: [...new Set(mergedTrucks.map(t => t.country))].length,
        lastUpdated: new Date().toISOString().split('T')[0],
        dataSources: ['Yelp Fusion API', 'Google Places API']
      }
    };
    
    // Backup current file
    const backupPath = path.join(__dirname, 'data', 'foodtrucks.backup.json');
    fs.copyFileSync(existingPath, backupPath);
    console.log('💾 Backed up existing data');
    
    // Save merged database
    fs.writeFileSync(existingPath, JSON.stringify(database, null, 2));
    console.log('✅ Merged database saved!\n');
    
    console.log('📊 Final Statistics:');
    console.log(`   Total trucks: ${database.metadata.totalTrucks}`);
    console.log(`   Cities: ${database.metadata.cities}`);
    console.log(`   Countries: ${database.metadata.countries}`);
    console.log(`   US trucks (Yelp): ${existingData.foodTrucks.length}`);
    console.log(`   International trucks (Google): ${internationalTrucks.length}`);
    
    console.log('\n🎉 Success! You now have a global food truck database!');
    console.log('\nRun: npm start');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the merge
mergeWithExistingData();
