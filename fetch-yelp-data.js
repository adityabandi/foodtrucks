require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const YELP_API_KEY = process.env.YELP_API_KEY;

// Major cities to search for food trucks - EXPANDED LIST
const cities = [
  // Top 50 US Cities
  { city: 'New York', country: 'USA', state: 'NY' },
  { city: 'Los Angeles', country: 'USA', state: 'CA' },
  { city: 'Chicago', country: 'USA', state: 'IL' },
  { city: 'Houston', country: 'USA', state: 'TX' },
  { city: 'Phoenix', country: 'USA', state: 'AZ' },
  { city: 'Philadelphia', country: 'USA', state: 'PA' },
  { city: 'San Antonio', country: 'USA', state: 'TX' },
  { city: 'San Diego', country: 'USA', state: 'CA' },
  { city: 'Dallas', country: 'USA', state: 'TX' },
  { city: 'San Jose', country: 'USA', state: 'CA' },
  { city: 'Austin', country: 'USA', state: 'TX' },
  { city: 'Jacksonville', country: 'USA', state: 'FL' },
  { city: 'Fort Worth', country: 'USA', state: 'TX' },
  { city: 'Columbus', country: 'USA', state: 'OH' },
  { city: 'Charlotte', country: 'USA', state: 'NC' },
  { city: 'San Francisco', country: 'USA', state: 'CA' },
  { city: 'Indianapolis', country: 'USA', state: 'IN' },
  { city: 'Seattle', country: 'USA', state: 'WA' },
  { city: 'Denver', country: 'USA', state: 'CO' },
  { city: 'Washington', country: 'USA', state: 'DC' },
  { city: 'Boston', country: 'USA', state: 'MA' },
  { city: 'El Paso', country: 'USA', state: 'TX' },
  { city: 'Nashville', country: 'USA', state: 'TN' },
  { city: 'Detroit', country: 'USA', state: 'MI' },
  { city: 'Oklahoma City', country: 'USA', state: 'OK' },
  { city: 'Portland', country: 'USA', state: 'OR' },
  { city: 'Las Vegas', country: 'USA', state: 'NV' },
  { city: 'Memphis', country: 'USA', state: 'TN' },
  { city: 'Louisville', country: 'USA', state: 'KY' },
  { city: 'Baltimore', country: 'USA', state: 'MD' },
  { city: 'Milwaukee', country: 'USA', state: 'WI' },
  { city: 'Albuquerque', country: 'USA', state: 'NM' },
  { city: 'Tucson', country: 'USA', state: 'AZ' },
  { city: 'Fresno', country: 'USA', state: 'CA' },
  { city: 'Mesa', country: 'USA', state: 'AZ' },
  { city: 'Sacramento', country: 'USA', state: 'CA' },
  { city: 'Atlanta', country: 'USA', state: 'GA' },
  { city: 'Kansas City', country: 'USA', state: 'MO' },
  { city: 'Colorado Springs', country: 'USA', state: 'CO' },
  { city: 'Raleigh', country: 'USA', state: 'NC' },
  { city: 'Miami', country: 'USA', state: 'FL' },
  { city: 'Long Beach', country: 'USA', state: 'CA' },
  { city: 'Virginia Beach', country: 'USA', state: 'VA' },
  { city: 'Oakland', country: 'USA', state: 'CA' },
  { city: 'Minneapolis', country: 'USA', state: 'MN' },
  { city: 'Tulsa', country: 'USA', state: 'OK' },
  { city: 'Tampa', country: 'USA', state: 'FL' },
  { city: 'Arlington', country: 'USA', state: 'TX' },
  { city: 'New Orleans', country: 'USA', state: 'LA' },
  { city: 'Wichita', country: 'USA', state: 'KS' }
];

async function searchYelpFoodTrucks(city, state) {
  const allTrucks = [];
  
  // Yelp API allows max 50 results per call, we'll get multiple pages
  for (let offset = 0; offset < 250; offset += 50) {
    const config = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      },
      params: {
        location: `${city}, ${state}`,
        categories: 'foodtrucks',
        limit: 50,
        offset: offset,
        sort_by: 'rating'
      }
    };

    try {
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', config);
      const businesses = response.data.businesses || [];
      
      if (businesses.length === 0) break; // No more results
      
      allTrucks.push(...businesses);
      
      // If we got less than 50, we've reached the end
      if (businesses.length < 50) break;
      
      // Rate limiting - wait 100ms between pagination requests
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      if (error.response?.status === 400 && offset > 0) {
        // Reached end of results
        break;
      }
      console.error(`Error fetching ${city} (offset ${offset}):`, error.response?.data?.error?.description || error.message);
      break;
    }
  }
  
  return allTrucks;
}

function mapYelpToOurFormat(business, city, country, index) {
  // Extract cuisine types from categories
  const cuisines = business.categories
    .map(cat => cat.title)
    .filter(title => title !== 'Food Trucks' && title !== 'Street Vendors')
    .slice(0, 3);
  
  if (cuisines.length === 0) cuisines.push('Street Food');

  // Generate ID
  const id = `ft${String(index + 1).padStart(3, '0')}`;

  return {
    id: id,
    name: business.name,
    city: city,
    country: country,
    location: {
      address: business.location.display_address.join(', '),
      lat: business.coordinates?.latitude || 0,
      lng: business.coordinates?.longitude || 0
    },
    cuisine: cuisines,
    specialties: [
      `${cuisines[0]} Specialties`,
      'Daily Specials',
      'Signature Dishes'
    ],
    rating: business.rating || 4.0, // Default rating if missing
    priceRange: business.price || '$$', // Default price range if missing
    operatingHours: {
      monday: 'Hours vary - check website',
      tuesday: 'Hours vary - check website',
      wednesday: 'Hours vary - check website',
      thursday: 'Hours vary - check website',
      friday: 'Hours vary - check website',
      saturday: 'Hours vary - check website',
      sunday: 'Hours vary - check website'
    },
    contact: {
      phone: business.phone || business.display_phone || '',
      website: business.url || '',
      yelp: business.url
    },
    image: business.image_url || 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    verified: true,
    yelpId: business.id,
    reviewCount: business.review_count || 0
  };
}

async function fetchAllFoodTrucks() {
  console.log('🚚 Fetching MASSIVE food truck database from Yelp API...\n');
  console.log('⏳ This will take a few minutes to fetch thousands of trucks...\n');
  
  const allTrucks = [];
  let truckIndex = 0;
  let citiesProcessed = 0;

  for (const cityInfo of cities) {
    citiesProcessed++;
    console.log(`\n[${citiesProcessed}/${cities.length}] 📍 Searching ${cityInfo.city}, ${cityInfo.state}...`);
    
    const trucks = await searchYelpFoodTrucks(cityInfo.city, cityInfo.state);
    
    if (trucks.length > 0) {
      console.log(`   ✅ Found ${trucks.length} food trucks`);
      
      // Show first 5 as samples
      const samples = trucks.slice(0, 5);
      samples.forEach(truck => {
        console.log(`      - ${truck.name} (${truck.rating}⭐, ${truck.review_count} reviews)`);
      });
      
      if (trucks.length > 5) {
        console.log(`      ... and ${trucks.length - 5} more`);
      }
      
      // Map all trucks
      trucks.forEach(truck => {
        const mappedTruck = mapYelpToOurFormat(truck, cityInfo.city, cityInfo.country, truckIndex);
        allTrucks.push(mappedTruck);
        truckIndex++;
      });
    } else {
      console.log(`   ⚠️  No food trucks found`);
    }

    // Progress update
    console.log(`   📊 Total collected so far: ${allTrucks.length} trucks`);

    // Rate limiting - wait 300ms between cities
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return allTrucks;
}

async function updateDatabase() {
  try {
    const trucks = await fetchAllFoodTrucks();
    
    console.log(`\n\n📊 Total food trucks fetched: ${trucks.length}`);
    console.log(`🌍 Cities with trucks: ${[...new Set(trucks.map(t => t.city))].length}`);
    console.log(`⭐ Average rating: ${(trucks.reduce((sum, t) => sum + t.rating, 0) / trucks.length).toFixed(2)}`);
    
    // Create the database object
    const database = {
      foodTrucks: trucks,
      metadata: {
        totalTrucks: trucks.length,
        cities: [...new Set(trucks.map(t => t.city))].length,
        countries: [...new Set(trucks.map(t => t.country))].length,
        lastUpdated: new Date().toISOString().split('T')[0],
        dataSource: 'Yelp Fusion API',
        apiVersion: 'v3'
      }
    };

    // Backup old database
    const dataPath = path.join(__dirname, 'data', 'foodtrucks.json');
    const backupPath = path.join(__dirname, 'data', 'foodtrucks.backup.json');
    
    if (fs.existsSync(dataPath)) {
      fs.copyFileSync(dataPath, backupPath);
      console.log('\n💾 Old database backed up to foodtrucks.backup.json');
    }

    // Save new database
    fs.writeFileSync(dataPath, JSON.stringify(database, null, 2));
    console.log('✅ New database saved to foodtrucks.json');
    
    console.log('\n🎉 Database updated successfully with real Yelp data!');
    console.log('\nYou can now run: npm start');
    
  } catch (error) {
    console.error('❌ Error updating database:', error.message);
    process.exit(1);
  }
}

// Run the update
updateDatabase();
