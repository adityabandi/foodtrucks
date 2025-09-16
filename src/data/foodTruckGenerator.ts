import { FoodTruck } from '@/types/foodtruck';

const GLOBAL_CITIES = [
  // United States (Major Cities)
  { name: 'New York', state: 'NY', country: 'United States', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', state: 'CA', country: 'United States', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago', state: 'IL', country: 'United States', lat: 41.8781, lng: -87.6298 },
  { name: 'Houston', state: 'TX', country: 'United States', lat: 29.7604, lng: -95.3698 },
  { name: 'Phoenix', state: 'AZ', country: 'United States', lat: 33.4484, lng: -112.0740 },
  { name: 'Philadelphia', state: 'PA', country: 'United States', lat: 39.9526, lng: -75.1652 },
  { name: 'San Antonio', state: 'TX', country: 'United States', lat: 29.4241, lng: -98.4936 },
  { name: 'San Diego', state: 'CA', country: 'United States', lat: 32.7157, lng: -117.1611 },
  { name: 'Dallas', state: 'TX', country: 'United States', lat: 32.7767, lng: -96.7970 },
  { name: 'Austin', state: 'TX', country: 'United States', lat: 30.2672, lng: -97.7431 },
  { name: 'San Francisco', state: 'CA', country: 'United States', lat: 37.7749, lng: -122.4194 },
  { name: 'Seattle', state: 'WA', country: 'United States', lat: 47.6062, lng: -122.3321 },
  { name: 'Denver', state: 'CO', country: 'United States', lat: 39.7392, lng: -104.9903 },
  { name: 'Washington', state: 'DC', country: 'United States', lat: 38.9072, lng: -77.0369 },
  { name: 'Boston', state: 'MA', country: 'United States', lat: 42.3601, lng: -71.0589 },
  { name: 'Nashville', state: 'TN', country: 'United States', lat: 36.1627, lng: -86.7816 },
  { name: 'Detroit', state: 'MI', country: 'United States', lat: 42.3314, lng: -83.0458 },
  { name: 'Portland', state: 'OR', country: 'United States', lat: 45.5152, lng: -122.6784 },
  { name: 'Las Vegas', state: 'NV', country: 'United States', lat: 36.1699, lng: -115.1398 },
  { name: 'Atlanta', state: 'GA', country: 'United States', lat: 33.7490, lng: -84.3880 },
  { name: 'Miami', state: 'FL', country: 'United States', lat: 25.7617, lng: -80.1918 },
  { name: 'Minneapolis', state: 'MN', country: 'United States', lat: 44.9778, lng: -93.2650 },
  { name: 'Tampa', state: 'FL', country: 'United States', lat: 27.9506, lng: -82.4572 },
  
  // Canada
  { name: 'Toronto', state: 'ON', country: 'Canada', lat: 43.6532, lng: -79.3832 },
  { name: 'Vancouver', state: 'BC', country: 'Canada', lat: 49.2827, lng: -123.1207 },
  { name: 'Montreal', state: 'QC', country: 'Canada', lat: 45.5017, lng: -73.5673 },
  { name: 'Calgary', state: 'AB', country: 'Canada', lat: 51.0447, lng: -114.0719 },
  { name: 'Ottawa', state: 'ON', country: 'Canada', lat: 45.4215, lng: -75.6972 },
  { name: 'Edmonton', state: 'AB', country: 'Canada', lat: 53.5461, lng: -113.4938 },
  
  // United Kingdom
  { name: 'London', state: 'England', country: 'United Kingdom', lat: 51.5074, lng: -0.1278 },
  { name: 'Birmingham', state: 'England', country: 'United Kingdom', lat: 52.4862, lng: -1.8904 },
  { name: 'Manchester', state: 'England', country: 'United Kingdom', lat: 53.4808, lng: -2.2426 },
  { name: 'Glasgow', state: 'Scotland', country: 'United Kingdom', lat: 55.8642, lng: -4.2518 },
  { name: 'Edinburgh', state: 'Scotland', country: 'United Kingdom', lat: 55.9533, lng: -3.1883 },
  { name: 'Liverpool', state: 'England', country: 'United Kingdom', lat: 53.4084, lng: -2.9916 },
  
  // Germany
  { name: 'Berlin', state: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050 },
  { name: 'Munich', state: 'Bavaria', country: 'Germany', lat: 48.1351, lng: 11.5820 },
  { name: 'Hamburg', state: 'Hamburg', country: 'Germany', lat: 53.5511, lng: 9.9937 },
  { name: 'Cologne', state: 'North Rhine-Westphalia', country: 'Germany', lat: 50.9375, lng: 6.9603 },
  { name: 'Frankfurt', state: 'Hesse', country: 'Germany', lat: 50.1109, lng: 8.6821 },
  { name: 'Stuttgart', state: 'Baden-Württemberg', country: 'Germany', lat: 48.7758, lng: 9.1829 },
  
  // France
  { name: 'Paris', state: 'Île-de-France', country: 'France', lat: 48.8566, lng: 2.3522 },
  { name: 'Marseille', state: 'Provence-Alpes-Côte d\'Azur', country: 'France', lat: 43.2965, lng: 5.3698 },
  { name: 'Lyon', state: 'Auvergne-Rhône-Alpes', country: 'France', lat: 45.7640, lng: 4.8357 },
  { name: 'Toulouse', state: 'Occitanie', country: 'France', lat: 43.6047, lng: 1.4442 },
  { name: 'Nice', state: 'Provence-Alpes-Côte d\'Azur', country: 'France', lat: 43.7102, lng: 7.2620 },
  { name: 'Bordeaux', state: 'Nouvelle-Aquitaine', country: 'France', lat: 44.8378, lng: -0.5792 },
  
  // Italy
  { name: 'Rome', state: 'Lazio', country: 'Italy', lat: 41.9028, lng: 12.4964 },
  { name: 'Milan', state: 'Lombardy', country: 'Italy', lat: 45.4642, lng: 9.1900 },
  { name: 'Naples', state: 'Campania', country: 'Italy', lat: 40.8518, lng: 14.2681 },
  { name: 'Turin', state: 'Piedmont', country: 'Italy', lat: 45.0703, lng: 7.6869 },
  { name: 'Florence', state: 'Tuscany', country: 'Italy', lat: 43.7696, lng: 11.2558 },
  { name: 'Venice', state: 'Veneto', country: 'Italy', lat: 45.4408, lng: 12.3155 },
  
  // Spain
  { name: 'Madrid', state: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038 },
  { name: 'Barcelona', state: 'Catalonia', country: 'Spain', lat: 41.3851, lng: 2.1734 },
  { name: 'Valencia', state: 'Valencia', country: 'Spain', lat: 39.4699, lng: -0.3763 },
  { name: 'Seville', state: 'Andalusia', country: 'Spain', lat: 37.3891, lng: -5.9845 },
  { name: 'Bilbao', state: 'Basque Country', country: 'Spain', lat: 43.2627, lng: -2.9253 },
  
  // Netherlands
  { name: 'Amsterdam', state: 'North Holland', country: 'Netherlands', lat: 52.3676, lng: 4.9041 },
  { name: 'Rotterdam', state: 'South Holland', country: 'Netherlands', lat: 51.9244, lng: 4.4777 },
  { name: 'The Hague', state: 'South Holland', country: 'Netherlands', lat: 52.0705, lng: 4.3007 },
  
  // Belgium
  { name: 'Brussels', state: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517 },
  { name: 'Antwerp', state: 'Flanders', country: 'Belgium', lat: 51.2194, lng: 4.4025 },
  
  // Australia
  { name: 'Sydney', state: 'NSW', country: 'Australia', lat: -33.8688, lng: 151.2093 },
  { name: 'Melbourne', state: 'VIC', country: 'Australia', lat: -37.8136, lng: 144.9631 },
  { name: 'Brisbane', state: 'QLD', country: 'Australia', lat: -27.4698, lng: 153.0251 },
  { name: 'Perth', state: 'WA', country: 'Australia', lat: -31.9505, lng: 115.8605 },
  { name: 'Adelaide', state: 'SA', country: 'Australia', lat: -34.9285, lng: 138.6007 },
  
  // New Zealand
  { name: 'Auckland', state: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633 },
  { name: 'Wellington', state: 'Wellington', country: 'New Zealand', lat: -41.2865, lng: 174.7762 },
  { name: 'Christchurch', state: 'Canterbury', country: 'New Zealand', lat: -43.5321, lng: 172.6362 },
  
  // Japan
  { name: 'Tokyo', state: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 },
  { name: 'Osaka', state: 'Osaka', country: 'Japan', lat: 34.6937, lng: 135.5023 },
  { name: 'Kyoto', state: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681 },
  { name: 'Yokohama', state: 'Kanagawa', country: 'Japan', lat: 35.4437, lng: 139.6380 },
  { name: 'Kobe', state: 'Hyogo', country: 'Japan', lat: 34.6901, lng: 135.1956 },
  
  // South Korea
  { name: 'Seoul', state: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780 },
  { name: 'Busan', state: 'Busan', country: 'South Korea', lat: 35.1796, lng: 129.0756 },
  { name: 'Incheon', state: 'Incheon', country: 'South Korea', lat: 37.4563, lng: 126.7052 },
  
  // Singapore
  { name: 'Singapore', state: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198 },
  
  // Thailand
  { name: 'Bangkok', state: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018 },
  { name: 'Chiang Mai', state: 'Chiang Mai', country: 'Thailand', lat: 18.7883, lng: 98.9853 },
  
  // Malaysia
  { name: 'Kuala Lumpur', state: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869 },
  
  // India
  { name: 'Mumbai', state: 'Maharashtra', country: 'India', lat: 19.0760, lng: 72.8777 },
  { name: 'Delhi', state: 'Delhi', country: 'India', lat: 28.7041, lng: 77.1025 },
  { name: 'Bangalore', state: 'Karnataka', country: 'India', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', state: 'Tamil Nadu', country: 'India', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', country: 'India', lat: 22.5726, lng: 88.3639 },
  { name: 'Pune', state: 'Maharashtra', country: 'India', lat: 18.5204, lng: 73.8567 },
  
  // China
  { name: 'Shanghai', state: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737 },
  { name: 'Beijing', state: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074 },
  { name: 'Guangzhou', state: 'Guangdong', country: 'China', lat: 23.1291, lng: 113.2644 },
  { name: 'Shenzhen', state: 'Guangdong', country: 'China', lat: 22.5431, lng: 114.0579 },
  { name: 'Chengdu', state: 'Sichuan', country: 'China', lat: 30.5728, lng: 104.0668 },
  
  // Hong Kong
  { name: 'Hong Kong', state: 'Hong Kong', country: 'Hong Kong', lat: 22.3193, lng: 114.1694 },
  
  // Taiwan
  { name: 'Taipei', state: 'Taipei', country: 'Taiwan', lat: 25.0330, lng: 121.5654 },
  
  // Philippines
  { name: 'Manila', state: 'Metro Manila', country: 'Philippines', lat: 14.5995, lng: 120.9842 },
  
  // Indonesia
  { name: 'Jakarta', state: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456 },
  
  // Brazil
  { name: 'São Paulo', state: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333 },
  { name: 'Rio de Janeiro', state: 'Rio de Janeiro', country: 'Brazil', lat: -22.9068, lng: -43.1729 },
  { name: 'Brasília', state: 'Federal District', country: 'Brazil', lat: -15.8267, lng: -47.9218 },
  { name: 'Salvador', state: 'Bahia', country: 'Brazil', lat: -12.9714, lng: -38.5014 },
  
  // Argentina
  { name: 'Buenos Aires', state: 'Buenos Aires', country: 'Argentina', lat: -34.6118, lng: -58.3960 },
  { name: 'Córdoba', state: 'Córdoba', country: 'Argentina', lat: -31.4201, lng: -64.1888 },
  
  // Chile
  { name: 'Santiago', state: 'Santiago', country: 'Chile', lat: -33.4489, lng: -70.6693 },
  
  // Colombia
  { name: 'Bogotá', state: 'Bogotá', country: 'Colombia', lat: 4.7110, lng: -74.0721 },
  { name: 'Medellín', state: 'Antioquia', country: 'Colombia', lat: 6.2442, lng: -75.5812 },
  
  // Mexico
  { name: 'Mexico City', state: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332 },
  { name: 'Guadalajara', state: 'Jalisco', country: 'Mexico', lat: 20.6597, lng: -103.3496 },
  { name: 'Monterrey', state: 'Nuevo León', country: 'Mexico', lat: 25.6866, lng: -100.3161 },
  
  // South Africa
  { name: 'Cape Town', state: 'Western Cape', country: 'South Africa', lat: -33.9249, lng: 18.4241 },
  { name: 'Johannesburg', state: 'Gauteng', country: 'South Africa', lat: -26.2041, lng: 28.0473 },
  { name: 'Durban', state: 'KwaZulu-Natal', country: 'South Africa', lat: -29.8587, lng: 31.0218 },
  
  // Egypt
  { name: 'Cairo', state: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  
  // Israel
  { name: 'Tel Aviv', state: 'Tel Aviv', country: 'Israel', lat: 32.0853, lng: 34.7818 },
  { name: 'Jerusalem', state: 'Jerusalem', country: 'Israel', lat: 31.7683, lng: 35.2137 },
  
  // Turkey
  { name: 'Istanbul', state: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784 },
  { name: 'Ankara', state: 'Ankara', country: 'Turkey', lat: 39.9334, lng: 32.8597 },
  
  // Russia
  { name: 'Moscow', state: 'Moscow', country: 'Russia', lat: 55.7558, lng: 37.6176 },
  { name: 'St. Petersburg', state: 'St. Petersburg', country: 'Russia', lat: 59.9311, lng: 30.3609 },
  
  // Poland
  { name: 'Warsaw', state: 'Mazovia', country: 'Poland', lat: 52.2297, lng: 21.0122 },
  { name: 'Krakow', state: 'Lesser Poland', country: 'Poland', lat: 50.0647, lng: 19.9450 },
  
  // Czech Republic
  { name: 'Prague', state: 'Prague', country: 'Czech Republic', lat: 50.0755, lng: 14.4378 },
  
  // Austria
  { name: 'Vienna', state: 'Vienna', country: 'Austria', lat: 48.2082, lng: 16.3738 },
  
  // Switzerland
  { name: 'Zurich', state: 'Zurich', country: 'Switzerland', lat: 47.3769, lng: 8.5417 },
  { name: 'Geneva', state: 'Geneva', country: 'Switzerland', lat: 46.2044, lng: 6.1432 },
  
  // Sweden
  { name: 'Stockholm', state: 'Stockholm', country: 'Sweden', lat: 59.3293, lng: 18.0686 },
  { name: 'Gothenburg', state: 'Västra Götaland', country: 'Sweden', lat: 57.7089, lng: 11.9746 },
  
  // Norway
  { name: 'Oslo', state: 'Oslo', country: 'Norway', lat: 59.9139, lng: 10.7522 },
  
  // Denmark
  { name: 'Copenhagen', state: 'Capital Region', country: 'Denmark', lat: 55.6761, lng: 12.5683 },
  
  // Finland
  { name: 'Helsinki', state: 'Uusimaa', country: 'Finland', lat: 60.1699, lng: 24.9384 },
  
  // UAE
  { name: 'Dubai', state: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { name: 'Abu Dhabi', state: 'Abu Dhabi', country: 'UAE', lat: 24.4539, lng: 54.3773 },
  
  // Saudi Arabia
  { name: 'Riyadh', state: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { name: 'Jeddah', state: 'Makkah', country: 'Saudi Arabia', lat: 21.5433, lng: 39.1728 }
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

function generateRandomFoodTruck(id: number, city: typeof GLOBAL_CITIES[0]): FoodTruck {
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
    `Started by chef Maria Rodriguez, who brought her grandmother's recipes from ${city.country} to the streets of ${city.name}.`,
    `Founded by two college friends who shared a passion for great food and decided to take their culinary dreams on the road.`,
    `A former restaurant chef who wanted to bring high-quality ${primaryCuisine.toLowerCase()} cuisine directly to the people.`,
    `Family business passed down through three generations, now serving the fourth generation of satisfied customers in ${city.name}.`,
    `Born from a food blogger's dream to create the perfect fusion of traditional and modern ${primaryCuisine.toLowerCase()} flavors.`
  ];
  
  return {
    id: `truck-${id.toString().padStart(5, '0')}`,
    name: `${name} - ${city.name}`,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    cuisine: cuisines,
    city: city.name,
    state: city.state,
    country: city.country,
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
  
  // Generate many more trucks per city (20-50 trucks per city) to reach 10x scale
  GLOBAL_CITIES.forEach(city => {
    const trucksPerCity = 20 + Math.floor(Math.random() * 31); // 20-50 trucks per city
    for (let i = 0; i < trucksPerCity; i++) {
      trucks.push(generateRandomFoodTruck(truckId++, city));
    }
  });
  
  return trucks;
}

export const MOCK_FOOD_TRUCKS = generateFoodTruckData();