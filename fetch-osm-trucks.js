const axios = require('axios');
const fs = require('fs');
const path = require('path');

// OpenStreetMap Overpass API - Completely FREE, no API key needed!
const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

// Major international cities
const cities = [
  // Europe
  { city: 'London', country: 'UK', bbox: [51.3, -0.5, 51.7, 0.3] },
  { city: 'Paris', country: 'France', bbox: [48.7, 2.1, 49.0, 2.5] },
  { city: 'Berlin', country: 'Germany', bbox: [52.3, 13.1, 52.7, 13.7] },
  { city: 'Amsterdam', country: 'Netherlands', bbox: [52.3, 4.7, 52.4, 5.0] },
  { city: 'Barcelona', country: 'Spain', bbox: [41.3, 2.0, 41.5, 2.3] },
  { city: 'Rome', country: 'Italy', bbox: [41.8, 12.4, 42.0, 12.6] },
  { city: 'Madrid', country: 'Spain', bbox: [40.3, -3.8, 40.5, -3.6] },
  { city: 'Vienna', country: 'Austria', bbox: [48.1, 16.2, 48.3, 16.5] },
  { city: 'Prague', country: 'Czech Republic', bbox: [50.0, 14.3, 50.1, 14.6] },
  { city: 'Stockholm', country: 'Sweden', bbox: [59.2, 17.9, 59.4, 18.2] },
  
  // Asia
  { city: 'Tokyo', country: 'Japan', bbox: [35.5, 139.5, 35.8, 139.9] },
  { city: 'Seoul', country: 'South Korea', bbox: [37.4, 126.8, 37.7, 127.2] },
  { city: 'Bangkok', country: 'Thailand', bbox: [13.6, 100.4, 13.9, 100.7] },
  { city: 'Singapore', country: 'Singapore', bbox: [1.2, 103.6, 1.5, 104.0] },
  { city: 'Hong Kong', country: 'China', bbox: [22.2, 114.0, 22.5, 114.3] },
  { city: 'Dubai', country: 'UAE', bbox: [25.0, 55.0, 25.4, 55.5] },
  { city: 'Mumbai', country: 'India', bbox: [18.9, 72.8, 19.3, 72.9] },
  { city: 'Delhi', country: 'India', bbox: [28.4, 77.0, 28.9, 77.3] },
  
  // Oceania
  { city: 'Sydney', country: 'Australia', bbox: [-34.0, 151.0, -33.7, 151.3] },
  { city: 'Melbourne', country: 'Australia', bbox: [-37.9, 144.9, -37.7, 145.0] },
  { city: 'Brisbane', country: 'Australia', bbox: [-27.5, 153.0, -27.4, 153.1] },
  { city: 'Auckland', country: 'New Zealand', bbox: [-37.0, 174.7, -36.8, 174.9] },
  
  // Canada
  { city: 'Toronto', country: 'Canada', bbox: [43.6, -79.5, 43.8, -79.3] },
  { city: 'Vancouver', country: 'Canada', bbox: [49.2, -123.2, 49.3, -123.0] },
  { city: 'Montreal', country: 'Canada', bbox: [45.4, -73.7, 45.6, -73.5] },
  
  // Latin America
  { city: 'Mexico City', country: 'Mexico', bbox: [19.3, -99.2, 19.5, -99.0] },
  { city: 'São Paulo', country: 'Brazil', bbox: [-23.6, -46.7, -23.5, -46.6] },
  { city: 'Buenos Aires', country: 'Argentina', bbox: [-34.7, -58.5, -34.5, -58.3] },
  { city: 'Bogotá', country: 'Colombia', bbox: [4.5, -74.2, 4.8, -74.0] },
  
  // Africa
  { city: 'Cape Town', country: 'South Africa', bbox: [-34.0, 18.3, -33.9, 18.5] },
  { city: 'Johannesburg', country: 'South Africa', bbox: [-26.3, 27.9, -26.1, 28.1] }
];

async function fetchOSMFoodTrucks(cityInfo) {
  const [minLat, minLon, maxLat, maxLon] = cityInfo.bbox;
  
  // Query for food trucks, food carts, and street food
  const query = `
    [out:json][timeout:30];
    (
      node["amenity"="fast_food"](${minLat},${minLon},${maxLat},${maxLon});
      node["amenity"="food_court"](${minLat},${minLon},${maxLat},${maxLon});
      node["shop"="food"](${minLat},${minLon},${maxLat},${maxLon});
      way["amenity"="fast_food"](${minLat},${minLon},${maxLat},${maxLon});
    );
    out body;
    >;
    out skel qt;
  `;
  
  try {
    const response = await axios.post(OVERPASS_API, query, {
      headers: { 'Content-Type': 'text/plain' }
    });
    
    return response.data.elements || [];
  } catch (error) {
    console.error(`Error fetching ${cityInfo.city}:`, error.message);
    return [];
  }
}

function mapOSMToOurFormat(element, city, country, index) {
  const tags = element.tags || {};
  
  // Extract cuisine
  const cuisineTypes = tags.cuisine ? tags.cuisine.split(';').map(c => {
    const cuisineMap = {
      'mexican': 'Mexican',
      'chinese': 'Chinese',
      'japanese': 'Japanese',
      'italian': 'Italian',
      'indian': 'Indian',
      'thai': 'Thai',
      'vietnamese': 'Vietnamese',
      'korean': 'Korean',
      'american': 'American',
      'burger': 'Burgers',
      'pizza': 'Pizza',
      'sandwich': 'Sandwiches',
      'kebab': 'Middle Eastern',
      'turkish': 'Turkish',
      'greek': 'Greek'
    };
    return cuisineMap[c.toLowerCase()] || c.charAt(0).toUpperCase() + c.slice(1);
  }) : ['Street Food'];
  
  const id = `ft${String(index + 1).padStart(5, '0')}`;
  
  return {
    id: id,
    name: tags.name || `${city} Food Stand`,
    city: city,
    country: country,
    location: {
      address: `${city}, ${country}`,
      lat: element.lat || element.center?.lat || 0,
      lng: element.lon || element.center?.lon || 0
    },
    cuisine: cuisineTypes.slice(0, 3),
    specialties: [
      `${cuisineTypes[0]} Specialties`,
      'Local Street Food',
      'Traditional Dishes'
    ],
    rating: 4.0,
    priceRange: tags.takeaway === 'yes' ? '$' : '$$',
    operatingHours: tags.opening_hours ? {
      monday: tags.opening_hours,
      tuesday: tags.opening_hours,
      wednesday: tags.opening_hours,
      thursday: tags.opening_hours,
      friday: tags.opening_hours,
      saturday: tags.opening_hours,
      sunday: tags.opening_hours
    } : {
      monday: 'Hours vary',
      tuesday: 'Hours vary',
      wednesday: 'Hours vary',
      thursday: 'Hours vary',
      friday: 'Hours vary',
      saturday: 'Hours vary',
      sunday: 'Hours vary'
    },
    contact: {
      phone: tags.phone || tags['contact:phone'] || '',
      website: tags.website || tags['contact:website'] || '',
      osm: `https://www.openstreetmap.org/${element.type}/${element.id}`
    },
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    verified: false, // OSM data is community-maintained
    osmId: element.id,
    reviewCount: 0,
    source: 'openstreetmap'
  };
}

async function fetchAllOSMTrucks() {
  console.log('🌍 Fetching international food vendors from OpenStreetMap (FREE!)...\n');
  console.log('✨ No API key needed - completely free and open source!\n');
  console.log('⏳ This will take 5-10 minutes...\n');
  
  const allTrucks = [];
  let truckIndex = 20000; // Start after Yelp and Google data
  let citiesProcessed = 0;
  
  for (const cityInfo of cities) {
    citiesProcessed++;
    console.log(`\n[${citiesProcessed}/${cities.length}] 📍 Searching ${cityInfo.city}, ${cityInfo.country}...`);
    
    const elements = await fetchOSMFoodTrucks(cityInfo);
    
    if (elements.length > 0) {
      console.log(`   ✅ Found ${elements.length} food vendors in OSM`);
      
      // Filter for named places with coordinates
      const validElements = elements.filter(e => 
        e.tags?.name && (e.lat || e.center?.lat)
      );
      
      console.log(`   ✅ ${validElements.length} have names and coordinates`);
      
      // Limit to 30 per city
      const topElements = validElements.slice(0, 30);
      
      topElements.forEach(element => {
        const mappedTruck = mapOSMToOurFormat(element, cityInfo.city, cityInfo.country, truckIndex);
        allTrucks.push(mappedTruck);
        truckIndex++;
      });
      
      console.log(`   ✅ Added ${topElements.length} trucks from ${cityInfo.city}`);
    } else {
      console.log(`   ⚠️  No food vendors found`);
    }
    
    console.log(`   📊 Total collected so far: ${allTrucks.length} trucks`);
    
    // Rate limiting - be nice to free API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return allTrucks;
}

async function mergeWithExistingData() {
  try {
    console.log('\n🔄 Merging with existing data...');
    
    // Load existing data
    const existingPath = path.join(__dirname, 'data', 'foodtrucks.json');
    const existingData = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
    
    console.log(`📊 Existing trucks: ${existingData.foodTrucks.length}`);
    
    // Fetch OSM trucks
    const osmTrucks = await fetchAllOSMTrucks();
    
    console.log(`\n\n📊 OSM trucks fetched: ${osmTrucks.length}`);
    
    // Merge data
    const mergedTrucks = [...existingData.foodTrucks, ...osmTrucks];
    
    const database = {
      foodTrucks: mergedTrucks,
      metadata: {
        totalTrucks: mergedTrucks.length,
        cities: [...new Set(mergedTrucks.map(t => t.city))].length,
        countries: [...new Set(mergedTrucks.map(t => t.country))].length,
        lastUpdated: new Date().toISOString().split('T')[0],
        dataSources: Array.from(new Set([
          ...(existingData.metadata.dataSources || ['Yelp Fusion API']),
          'OpenStreetMap'
        ]))
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
    console.log(`   OSM international trucks: ${osmTrucks.length}`);
    
    console.log('\n🎉 Success! Free international data added!');
    console.log('\nRun: npm start');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the merge
mergeWithExistingData();
