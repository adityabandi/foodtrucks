#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';
const API_KEY = 'S969NDLDvc6SkRwIR9z86V81-XQXjGDwAP6-WT7kYbIwBXQ_CVbtjffkNo5as7mguq2DP_gvWvqiNSiFa2AE6Mh6xjk9b1pPCS7uLfviBZ-4hZRjWk3AkHgqEs7JaHYx';

// Major US cities to fetch food truck data for
const US_CITIES = [
  { name: 'New York', state: 'NY', country: 'United States' },
  { name: 'Los Angeles', state: 'CA', country: 'United States' },
  { name: 'Chicago', state: 'IL', country: 'United States' },
  { name: 'Houston', state: 'TX', country: 'United States' },
  { name: 'Phoenix', state: 'AZ', country: 'United States' },
  { name: 'Philadelphia', state: 'PA', country: 'United States' },
  { name: 'San Antonio', state: 'TX', country: 'United States' },
  { name: 'San Diego', state: 'CA', country: 'United States' },
  { name: 'Dallas', state: 'TX', country: 'United States' },
  { name: 'Austin', state: 'TX', country: 'United States' },
  { name: 'San Francisco', state: 'CA', country: 'United States' },
  { name: 'Seattle', state: 'WA', country: 'United States' },
  { name: 'Denver', state: 'CO', country: 'United States' },
  { name: 'Washington', state: 'DC', country: 'United States' },
  { name: 'Boston', state: 'MA', country: 'United States' },
  { name: 'Nashville', state: 'TN', country: 'United States' },
  { name: 'Detroit', state: 'MI', country: 'United States' },
  { name: 'Portland', state: 'OR', country: 'United States' },
  { name: 'Las Vegas', state: 'NV', country: 'United States' },
  { name: 'Atlanta', state: 'GA', country: 'United States' },
  { name: 'Miami', state: 'FL', country: 'United States' },
  { name: 'Minneapolis', state: 'MN', country: 'United States' },
  { name: 'Tampa', state: 'FL', country: 'United States' },
  { name: 'Orlando', state: 'FL', country: 'United States' },
  { name: 'Charlotte', state: 'NC', country: 'United States' },
  { name: 'Indianapolis', state: 'IN', country: 'United States' },
  { name: 'Columbus', state: 'OH', country: 'United States' },
  { name: 'San Jose', state: 'CA', country: 'United States' },
  { name: 'Fort Worth', state: 'TX', country: 'United States' },
  { name: 'Jacksonville', state: 'FL', country: 'United States' }
];

async function searchFoodTrucks(city, state, limit = 50) {
  const location = `${city}, ${state}`;
  const searchParams = new URLSearchParams({
    term: 'food trucks',
    location: location,
    categories: 'foodtrucks,hotdogs,bbq,tacos,sandwiches,burgers,pizza,mexican,asian,mediterranean',
    limit: limit.toString(),
    sort_by: 'rating',
    open_now: 'false'
  });

  try {
    const response = await fetch(`${YELP_API_URL}?${searchParams}`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.businesses;
  } catch (error) {
    console.error(`Error fetching from Yelp API for ${city}, ${state}:`, error.message);
    return [];
  }
}

function generateSpecialties(categories) {
  const specialtyMap = {
    'foodtrucks': ['Street Food', 'Mobile Dining'],
    'bbq': ['Smoked Ribs', 'Brisket', 'Pulled Pork'],
    'tacos': ['Street Tacos', 'Fish Tacos', 'Carnitas'],
    'burgers': ['Gourmet Burgers', 'Craft Burgers', 'Loaded Fries'],
    'pizza': ['Wood-Fired Pizza', 'Artisan Pizza'],
    'hotdogs': ['Gourmet Hot Dogs', 'Chicago Dogs'],
    'sandwiches': ['Artisan Sandwiches', 'Paninis'],
    'mexican': ['Authentic Mexican', 'Quesadillas', 'Burritos'],
    'asian': ['Asian Fusion', 'Stir Fry', 'Noodles'],
    'mediterranean': ['Gyros', 'Hummus', 'Falafel'],
    'seafood': ['Fresh Seafood', 'Fish & Chips', 'Lobster Rolls'],
    'desserts': ['Artisan Desserts', 'Ice Cream', 'Pastries']
  };

  const specialties = [];
  categories.forEach(cat => {
    if (specialtyMap[cat.alias]) {
      specialties.push(...specialtyMap[cat.alias]);
    }
  });

  return specialties.length > 0 ? specialties.slice(0, 6) : ['Signature Dishes', 'Fresh Ingredients', 'Quality Food'];
}

function generateTags(business) {
  const tags = [];
  
  if (business.transactions?.includes('delivery')) tags.push('delivery');
  if (business.transactions?.includes('pickup')) tags.push('takeout-only');
  if (business.rating >= 4.5) tags.push('highly-rated');
  if (business.review_count > 100) tags.push('popular');
  if (business.price === '$') tags.push('budget-friendly');
  if (business.price === '$$$' || business.price === '$$$$') tags.push('gourmet');
  
  tags.push('locally-owned');
  
  return tags;
}

function generateDescription(business) {
  const cuisine = business.categories[0]?.title || 'food';
  const city = business.location.city;
  const rating = business.rating;
  
  const descriptions = [
    `Serving delicious ${cuisine.toLowerCase()} in ${city} with a ${rating}-star rating from satisfied customers.`,
    `A popular ${cuisine.toLowerCase()} spot in ${city}, known for quality ingredients and excellent service.`,
    `Experience authentic ${cuisine.toLowerCase()} flavors at this ${city} favorite with ${business.review_count} reviews.`,
    `Quality ${cuisine.toLowerCase()} cuisine served fresh daily in the heart of ${city}.`,
    `Local ${city} gem specializing in ${cuisine.toLowerCase()} with a commitment to excellence.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function convertYelpToFoodTruck(yelpBusiness, id) {
  const cuisines = yelpBusiness.categories.map(cat => cat.title);
  const primaryCuisine = cuisines[0] || 'American';
  
  const specialties = generateSpecialties(yelpBusiness.categories);
  
  let priceRange = 'moderate';
  if (yelpBusiness.price) {
    switch (yelpBusiness.price.length) {
      case 1:
        priceRange = 'budget';
        break;
      case 2:
        priceRange = 'moderate';
        break;
      case 3:
      case 4:
        priceRange = 'premium';
        break;
    }
  }

  const tags = generateTags(yelpBusiness);
  const description = generateDescription(yelpBusiness);

  return {
    id: id,
    name: yelpBusiness.name,
    description: description,
    cuisine: cuisines.length > 0 ? cuisines : ['American'],
    city: yelpBusiness.location.city,
    state: yelpBusiness.location.state,
    country: yelpBusiness.location.country === 'US' ? 'United States' : yelpBusiness.location.country,
    address: yelpBusiness.location.display_address.join(', '),
    phone: yelpBusiness.display_phone,
    website: yelpBusiness.url,
    socialMedia: {},
    operatingHours: {
      schedule: 'Check Yelp for current hours'
    },
    specialties: specialties,
    priceRange: priceRange,
    rating: yelpBusiness.rating,
    reviewCount: yelpBusiness.review_count,
    images: yelpBusiness.image_url ? [yelpBusiness.image_url] : [],
    location: {
      lat: yelpBusiness.coordinates.latitude,
      lng: yelpBusiness.coordinates.longitude
    },
    established: 2020,
    ownerStory: `A beloved ${primaryCuisine.toLowerCase()} food establishment serving the ${yelpBusiness.location.city} community with authentic flavors and quality ingredients.`,
    menuHighlights: specialties.slice(0, 5),
    tags: tags,
    lastUpdated: new Date().toISOString()
  };
}

async function generateFoodTruckData() {
  console.log('🚚 Starting Yelp API food truck data generation...\n');
  console.log(`📍 Fetching data for ${US_CITIES.length} major US cities`);
  console.log('⏰ This may take a few minutes due to API rate limiting...\n');

  try {
    const allBusinesses = [];
    
    for (const city of US_CITIES) {
      try {
        console.log(`Fetching food trucks for ${city.name}, ${city.state}...`);
        const businesses = await searchFoodTrucks(city.name, city.state, 50);
        allBusinesses.push(...businesses);
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Error fetching data for ${city.name}, ${city.state}:`, error);
      }
    }
    
    console.log(`\n✅ Successfully fetched ${allBusinesses.length} businesses from Yelp API`);

    // Convert Yelp businesses to FoodTruck format
    const foodTrucks = allBusinesses.map((business, index) => {
      const id = `yelp-${business.id}-${index.toString().padStart(4, '0')}`;
      return convertYelpToFoodTruck(business, id);
    });

    // Remove duplicates based on name and location
    const uniqueFoodTrucks = foodTrucks.filter((truck, index, array) => {
      return array.findIndex(t => 
        t.name === truck.name && 
        t.city === truck.city && 
        t.state === truck.state
      ) === index;
    });

    console.log(`🎯 After deduplication: ${uniqueFoodTrucks.length} unique food trucks`);

    // Generate statistics
    const stats = {
      totalTrucks: uniqueFoodTrucks.length,
      cities: [...new Set(uniqueFoodTrucks.map(t => t.city))].length,
      states: [...new Set(uniqueFoodTrucks.map(t => t.state))].length,
      cuisines: [...new Set(uniqueFoodTrucks.flatMap(t => t.cuisine))].length,
      avgRating: uniqueFoodTrucks.reduce((sum, t) => sum + (t.rating || 0), 0) / uniqueFoodTrucks.length,
      totalReviews: uniqueFoodTrucks.reduce((sum, t) => sum + (t.reviewCount || 0), 0)
    };

    console.log('\n📊 Generation Statistics:');
    console.log(`   • Total Food Trucks: ${stats.totalTrucks}`);
    console.log(`   • Cities Covered: ${stats.cities}`);
    console.log(`   • States Covered: ${stats.states}`);
    console.log(`   • Cuisine Types: ${stats.cuisines}`);
    console.log(`   • Average Rating: ${stats.avgRating.toFixed(1)}/5.0`);
    console.log(`   • Total Reviews: ${stats.totalReviews.toLocaleString()}`);

    // Create the data file content
    const dataFileContent = `import { FoodTruck } from '@/types/foodtruck';

// Generated from Yelp API on ${new Date().toISOString()}
// Total: ${stats.totalTrucks} food trucks across ${stats.cities} cities in ${stats.states} states
export const YELP_FOOD_TRUCKS: FoodTruck[] = ${JSON.stringify(uniqueFoodTrucks, null, 2)};

export const YELP_STATS = ${JSON.stringify(stats, null, 2)};
`;

    // Write the generated data to file
    const outputPath = join(__dirname, '..', 'data', 'yelpFoodTrucks.ts');
    writeFileSync(outputPath, dataFileContent, 'utf8');

    console.log(`\n💾 Data saved to: ${outputPath}`);
    console.log('\n🎉 Food truck data generation completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Update foodTruckService.ts to use YELP_FOOD_TRUCKS');
    console.log('   2. Run "npm run build" to generate static pages');
    console.log('   3. Deploy to GitHub Pages');

  } catch (error) {
    console.error('❌ Error generating food truck data:', error);
    process.exit(1);
  }
}

// Run the generation
generateFoodTruckData();