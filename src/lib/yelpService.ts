import { FoodTruck } from '@/types/foodtruck';

const YELP_API_URL = 'https://api.yelp.com/v3/businesses/search';
const CLIENT_ID = '9LUA2w6BE9U8aEMJ5DDUpA';
const API_KEY = 'S969NDLDvc6SkRwIR9z86V81-XQXjGDwAP6-WT7kYbIwBXQ_CVbtjffkNo5as7mguq2DP_gvWvqiNSiFa2AE6Mh6xjk9b1pPCS7uLfviBZ-4hZRjWk3AkHgqEs7JaHYx';

interface YelpBusiness {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  url: string;
  review_count: number;
  categories: Array<{
    alias: string;
    title: string;
  }>;
  rating: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  transactions: string[];
  price?: string;
  location: {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    zip_code: string;
    country: string;
    state: string;
    display_address: string[];
  };
  phone: string;
  display_phone: string;
  distance: number;
}

interface YelpSearchResponse {
  businesses: YelpBusiness[];
  total: number;
  region: {
    center: {
      longitude: number;
      latitude: number;
    };
  };
}

export class YelpService {
  private static apiKey = API_KEY;
  
  static async searchFoodTrucks(city: string, state: string, limit: number = 50): Promise<YelpBusiness[]> {
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
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
      }

      const data: YelpSearchResponse = await response.json();
      return data.businesses;
    } catch (error) {
      console.error('Error fetching from Yelp API:', error);
      return [];
    }
  }

  static async searchMultipleCities(cities: Array<{name: string, state: string, country: string}>): Promise<YelpBusiness[]> {
    const allBusinesses: YelpBusiness[] = [];
    
    for (const city of cities) {
      if (city.country === 'United States') {
        try {
          console.log(`Fetching food trucks for ${city.name}, ${city.state}...`);
          const businesses = await this.searchFoodTrucks(city.name, city.state, 50);
          allBusinesses.push(...businesses);
          
          // Add delay to avoid rate limiting
          await new Promise(resolve => setTimeout(resolve, 200));
        } catch (error) {
          console.error(`Error fetching data for ${city.name}, ${city.state}:`, error);
        }
      }
    }
    
    return allBusinesses;
  }

  static convertYelpToFoodTruck(yelpBusiness: YelpBusiness, id: string): FoodTruck {
    const cuisines = yelpBusiness.categories.map(cat => cat.title);
    const primaryCuisine = cuisines[0] || 'American';
    
    // Generate specialties based on categories
    const specialties = this.generateSpecialties(yelpBusiness.categories);
    
    // Determine price range
    let priceRange: 'budget' | 'moderate' | 'premium' = 'moderate';
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

    // Generate tags based on Yelp data
    const tags = this.generateTags(yelpBusiness);

    // Create description
    const description = this.generateDescription(yelpBusiness);

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
      socialMedia: {
        // These would need to be extracted from business details API call
      },
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
      established: 2020, // Default since Yelp doesn't provide this
      ownerStory: `A beloved ${primaryCuisine.toLowerCase()} food establishment serving the ${yelpBusiness.location.city} community with authentic flavors and quality ingredients.`,
      menuHighlights: specialties.slice(0, 5),
      tags: tags,
      lastUpdated: new Date().toISOString()
    };
  }

  private static generateSpecialties(categories: Array<{alias: string, title: string}>): string[] {
    const specialtyMap: {[key: string]: string[]} = {
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

    const specialties: string[] = [];
    categories.forEach(cat => {
      if (specialtyMap[cat.alias]) {
        specialties.push(...specialtyMap[cat.alias]);
      }
    });

    return specialties.length > 0 ? specialties.slice(0, 6) : ['Signature Dishes', 'Fresh Ingredients', 'Quality Food'];
  }

  private static generateTags(business: YelpBusiness): string[] {
    const tags: string[] = [];
    
    if (business.transactions.includes('delivery')) tags.push('delivery');
    if (business.transactions.includes('pickup')) tags.push('takeout-only');
    if (business.rating >= 4.5) tags.push('highly-rated');
    if (business.review_count > 100) tags.push('popular');
    if (business.price === '$') tags.push('budget-friendly');
    if (business.price === '$$$' || business.price === '$$$$') tags.push('gourmet');
    
    // Add location-based tags
    tags.push('locally-owned');
    
    return tags;
  }

  private static generateDescription(business: YelpBusiness): string {
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
}