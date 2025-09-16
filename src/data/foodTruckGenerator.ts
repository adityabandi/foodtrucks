import { FoodTruck } from '@/types/foodtruck';

const US_CITIES = [
  { name: 'New York', state: 'NY', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', state: 'CA', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago', state: 'IL', lat: 41.8781, lng: -87.6298 },
  { name: 'Houston', state: 'TX', lat: 29.7604, lng: -95.3698 },
  { name: 'Phoenix', state: 'AZ', lat: 33.4484, lng: -112.0740 },
  { name: 'Philadelphia', state: 'PA', lat: 39.9526, lng: -75.1652 },
  { name: 'San Antonio', state: 'TX', lat: 29.4241, lng: -98.4936 },
  { name: 'San Diego', state: 'CA', lat: 32.7157, lng: -117.1611 },
  { name: 'Dallas', state: 'TX', lat: 32.7767, lng: -96.7970 },
  { name: 'Austin', state: 'TX', lat: 30.2672, lng: -97.7431 },
  { name: 'Jacksonville', state: 'FL', lat: 30.3322, lng: -81.6557 },
  { name: 'Fort Worth', state: 'TX', lat: 32.7555, lng: -97.3308 },
  { name: 'Columbus', state: 'OH', lat: 39.9612, lng: -82.9988 },
  { name: 'Charlotte', state: 'NC', lat: 35.2271, lng: -80.8431 },
  { name: 'San Francisco', state: 'CA', lat: 37.7749, lng: -122.4194 },
  { name: 'Indianapolis', state: 'IN', lat: 39.7684, lng: -86.1581 },
  { name: 'Seattle', state: 'WA', lat: 47.6062, lng: -122.3321 },
  { name: 'Denver', state: 'CO', lat: 39.7392, lng: -104.9903 },
  { name: 'Washington', state: 'DC', lat: 38.9072, lng: -77.0369 },
  { name: 'Boston', state: 'MA', lat: 42.3601, lng: -71.0589 },
  { name: 'El Paso', state: 'TX', lat: 31.7619, lng: -106.4850 },
  { name: 'Nashville', state: 'TN', lat: 36.1627, lng: -86.7816 },
  { name: 'Detroit', state: 'MI', lat: 42.3314, lng: -83.0458 },
  { name: 'Oklahoma City', state: 'OK', lat: 35.4676, lng: -97.5164 },
  { name: 'Portland', state: 'OR', lat: 45.5152, lng: -122.6784 },
  { name: 'Las Vegas', state: 'NV', lat: 36.1699, lng: -115.1398 },
  { name: 'Memphis', state: 'TN', lat: 35.1495, lng: -90.0490 },
  { name: 'Louisville', state: 'KY', lat: 38.2527, lng: -85.7585 },
  { name: 'Baltimore', state: 'MD', lat: 39.2904, lng: -76.6122 },
  { name: 'Milwaukee', state: 'WI', lat: 43.0389, lng: -87.9065 },
  { name: 'Albuquerque', state: 'NM', lat: 35.0844, lng: -106.6504 },
  { name: 'Tucson', state: 'AZ', lat: 32.2226, lng: -110.9747 },
  { name: 'Fresno', state: 'CA', lat: 36.7378, lng: -119.7871 },
  { name: 'Mesa', state: 'AZ', lat: 33.4152, lng: -111.8315 },
  { name: 'Sacramento', state: 'CA', lat: 38.5816, lng: -121.4944 },
  { name: 'Atlanta', state: 'GA', lat: 33.7490, lng: -84.3880 },
  { name: 'Kansas City', state: 'MO', lat: 39.0997, lng: -94.5786 },
  { name: 'Colorado Springs', state: 'CO', lat: 38.8339, lng: -104.8214 },
  { name: 'Omaha', state: 'NE', lat: 41.2565, lng: -95.9345 },
  { name: 'Raleigh', state: 'NC', lat: 35.7796, lng: -78.6382 },
  { name: 'Miami', state: 'FL', lat: 25.7617, lng: -80.1918 },
  { name: 'Long Beach', state: 'CA', lat: 33.7701, lng: -118.1937 },
  { name: 'Virginia Beach', state: 'VA', lat: 36.8529, lng: -75.9780 },
  { name: 'Oakland', state: 'CA', lat: 37.8044, lng: -122.2711 },
  { name: 'Minneapolis', state: 'MN', lat: 44.9778, lng: -93.2650 },
  { name: 'Tulsa', state: 'OK', lat: 36.1540, lng: -95.9928 },
  { name: 'Tampa', state: 'FL', lat: 27.9506, lng: -82.4572 },
  { name: 'Arlington', state: 'TX', lat: 32.7357, lng: -97.1081 },
  { name: 'New Orleans', state: 'LA', lat: 29.9511, lng: -90.0715 },
  { name: 'Wichita', state: 'KS', lat: 37.6872, lng: -97.3301 }
];

const CUISINES = [
  'American', 'Mexican', 'Italian', 'Asian', 'BBQ', 'Burgers', 'Tacos', 'Pizza',
  'Sandwiches', 'Seafood', 'Vegetarian', 'Vegan', 'Indian', 'Thai', 'Chinese',
  'Japanese', 'Korean', 'Mediterranean', 'Greek', 'Southern', 'Cajun', 'Tex-Mex',
  'Caribbean', 'Ethiopian', 'Vietnamese', 'Halal', 'Kosher', 'Fusion', 'Comfort Food',
  'Street Food', 'Gourmet', 'Organic', 'Farm-to-Table', 'Desserts', 'Ice Cream'
];

const FOOD_TRUCK_NAMES = [
  'Rolling Flavors', 'Street Eats Express', 'Mobile Munchies', 'Gourmet Wheels',
  'The Hungry Nomad', 'Flavor Junction', 'Roaming Bites', 'Urban Feast',
  'The Food Wagon', 'Taste Travelers', 'Mobile Kitchen Co', 'Street Food Central',
  'The Wandering Spoon', 'Flavor Highway', 'Rolling Kitchen', 'Food Cart Express',
  'The Mobile Chef', 'Street Side Eats', 'Roving Restaurant', 'The Food Truck',
  'Wheels & Meals', 'Street Gourmet', 'Mobile Bistro', 'The Rolling Table',
  'Food on the Move', 'Street Kitchen', 'The Traveling Plate', 'Mobile Eatery',
  'Rolling Restaurant', 'Street Food Station', 'The Food Express', 'Mobile Menu',
  'Roaming Recipes', 'Street Cuisine', 'The Moving Kitchen', 'Food Truck Central',
  'Rolling Eats', 'Street Food Co', 'The Mobile Feast', 'Traveling Taste'
];

const SPECIALTIES = [
  'Signature Burgers', 'Authentic Tacos', 'Wood-Fired Pizza', 'Smoked BBQ',
  'Fresh Seafood', 'Artisan Sandwiches', 'Gourmet Grilled Cheese', 'Korean BBQ',
  'Fish Tacos', 'Pulled Pork', 'Lobster Rolls', 'Craft Hot Dogs', 'Bahn Mi',
  'Falafel Wraps', 'Mac and Cheese', 'Ramen Bowls', 'Poke Bowls', 'Acai Bowls',
  'Loaded Fries', 'Breakfast Burritos', 'Crepes', 'Gelato', 'Churros', 'Empanadas',
  'Quesadillas', 'Pad Thai', 'Curry Dishes', 'Gyros', 'Wings', 'Sliders'
];

const TAGS = [
  'family-friendly', 'late-night', 'catering', 'events', 'downtown', 'festivals',
  'organic', 'locally-sourced', 'gluten-free', 'dairy-free', 'spicy', 'mild',
  'budget-friendly', 'gourmet', 'quick-service', 'made-to-order', 'cash-only',
  'card-accepted', 'outdoor-seating', 'indoor-dining', 'takeout-only', 'delivery'
];

const OPERATING_HOURS = [
  'Mon-Fri: 11AM-8PM',
  'Daily: 10AM-9PM',
  'Tue-Sun: 12PM-10PM',
  'Mon-Sat: 11AM-9PM',
  'Wed-Sun: 12PM-8PM',
  'Daily: 11AM-11PM',
  'Mon-Thu: 11AM-8PM, Fri-Sat: 11AM-10PM'
];

function generateRandomFoodTruck(id: number, city: typeof US_CITIES[0]): FoodTruck {
  const name = FOOD_TRUCK_NAMES[Math.floor(Math.random() * FOOD_TRUCK_NAMES.length)];
  const primaryCuisine = CUISINES[Math.floor(Math.random() * CUISINES.length)];
  const secondaryCuisines = CUISINES.filter(c => c !== primaryCuisine)
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3));
  
  const cuisines = [primaryCuisine, ...secondaryCuisines];
  const priceRanges: ('budget' | 'moderate' | 'premium')[] = ['budget', 'moderate', 'premium'];
  const priceRange = priceRanges[Math.floor(Math.random() * priceRanges.length)];
  
  const specialties = SPECIALTIES.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
  const tags = TAGS.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 4));
  
  const established = 2010 + Math.floor(Math.random() * 14); // 2010-2023
  const rating = 3.5 + Math.random() * 1.5; // 3.5-5.0
  const reviewCount = 10 + Math.floor(Math.random() * 490); // 10-500
  
  // Generate slight variation in location within city
  const latVariation = (Math.random() - 0.5) * 0.1; // ±0.05 degrees
  const lngVariation = (Math.random() - 0.5) * 0.1;
  
  const descriptions = [
    `Serving the finest ${primaryCuisine.toLowerCase()} cuisine with a modern twist. Our ${specialties[0].toLowerCase()} are legendary in ${city.name}!`,
    `Family-owned food truck bringing authentic ${primaryCuisine.toLowerCase()} flavors to the streets of ${city.name} since ${established}.`,
    `Award-winning mobile kitchen specializing in ${specialties.slice(0, 2).map(s => s.toLowerCase()).join(' and ')}. Fresh ingredients, bold flavors!`,
    `${city.name}'s favorite food truck for ${primaryCuisine.toLowerCase()} cuisine. Try our famous ${specialties[0].toLowerCase()} - you won't be disappointed!`,
    `Gourmet ${primaryCuisine.toLowerCase()} food truck with a passion for quality. Every dish is made with love and the freshest ingredients.`
  ];
  
  const ownerStories = [
    `Started by chef Maria Rodriguez, who brought her grandmother's recipes from Mexico to the streets of ${city.name}.`,
    `Founded by two college friends who shared a passion for great food and decided to take their culinary dreams on the road.`,
    `A former restaurant chef who wanted to bring high-quality ${primaryCuisine.toLowerCase()} cuisine directly to the people.`,
    `Family business passed down through three generations, now serving the fourth generation of satisfied customers.`,
    `Born from a food blogger's dream to create the perfect fusion of traditional and modern ${primaryCuisine.toLowerCase()} flavors.`
  ];
  
  return {
    id: `truck-${id.toString().padStart(4, '0')}`,
    name: `${name} - ${city.name}`,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    cuisine: cuisines,
    city: city.name,
    state: city.state,
    address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Pine St', 'Elm Ave', 'Cedar St'][Math.floor(Math.random() * 5)]}, ${city.name}, ${city.state}`,
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`,
    socialMedia: {
      instagram: `@${name.toLowerCase().replace(/\s+/g, '')}${city.name.toLowerCase()}`,
      facebook: `${name} ${city.name}`,
      twitter: `@${name.toLowerCase().replace(/\s+/g, '')}`
    },
    operatingHours: {
      schedule: OPERATING_HOURS[Math.floor(Math.random() * OPERATING_HOURS.length)]
    },
    specialties,
    priceRange,
    rating: Math.round(rating * 10) / 10,
    reviewCount,
    images: [
      `/images/trucks/truck-${id}-1.jpg`,
      `/images/trucks/truck-${id}-2.jpg`,
      `/images/trucks/truck-${id}-3.jpg`
    ],
    location: {
      lat: city.lat + latVariation,
      lng: city.lng + lngVariation
    },
    established,
    ownerStory: ownerStories[Math.floor(Math.random() * ownerStories.length)],
    menuHighlights: specialties.slice(0, 5),
    tags,
    lastUpdated: new Date().toISOString()
  };
}

export function generateFoodTruckData(): FoodTruck[] {
  const trucks: FoodTruck[] = [];
  let truckId = 1;
  
  // Generate varying numbers of trucks per city (2-15 trucks per city)
  US_CITIES.forEach(city => {
    const trucksPerCity = 2 + Math.floor(Math.random() * 14);
    for (let i = 0; i < trucksPerCity; i++) {
      trucks.push(generateRandomFoodTruck(truckId++, city));
    }
  });
  
  return trucks;
}

export const MOCK_FOOD_TRUCKS = generateFoodTruckData();