import { FoodTruck, FilterOptions, City } from '@/types/foodtruck';
import { MOCK_FOOD_TRUCKS } from '@/data/foodTruckGenerator';

export class FoodTruckService {
  private static trucks: FoodTruck[] = MOCK_FOOD_TRUCKS;

  static getAllTrucks(): FoodTruck[] {
    return this.trucks;
  }

  static getTruckById(id: string): FoodTruck | undefined {
    return this.trucks.find(truck => truck.id === id);
  }

  static getTrucksByCity(city: string): FoodTruck[] {
    return this.trucks.filter(truck => 
      truck.city.toLowerCase() === city.toLowerCase()
    );
  }

  static getTrucksByState(state: string): FoodTruck[] {
    return this.trucks.filter(truck => 
      truck.state.toLowerCase() === state.toLowerCase()
    );
  }

  static searchTrucks(filters: FilterOptions): FoodTruck[] {
    let filteredTrucks = [...this.trucks];

    if (filters.city) {
      filteredTrucks = filteredTrucks.filter(truck =>
        truck.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }

    if (filters.state) {
      filteredTrucks = filteredTrucks.filter(truck =>
        truck.state.toLowerCase() === filters.state!.toLowerCase()
      );
    }

    if (filters.cuisine && filters.cuisine.length > 0) {
      filteredTrucks = filteredTrucks.filter(truck =>
        truck.cuisine.some(c => 
          filters.cuisine!.some(fc => 
            c.toLowerCase().includes(fc.toLowerCase())
          )
        )
      );
    }

    if (filters.priceRange && filters.priceRange.length > 0) {
      filteredTrucks = filteredTrucks.filter(truck =>
        filters.priceRange!.includes(truck.priceRange)
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filteredTrucks = filteredTrucks.filter(truck =>
        truck.tags.some(tag => 
          filters.tags!.some(filterTag => 
            tag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredTrucks = filteredTrucks.filter(truck =>
        truck.name.toLowerCase().includes(searchTerm) ||
        truck.description.toLowerCase().includes(searchTerm) ||
        truck.cuisine.some(c => c.toLowerCase().includes(searchTerm)) ||
        truck.specialties.some(s => s.toLowerCase().includes(searchTerm)) ||
        truck.tags.some(t => t.toLowerCase().includes(searchTerm))
      );
    }

    return filteredTrucks;
  }

  static getCities(): City[] {
    const cityMap = new Map<string, City>();
    
    this.trucks.forEach(truck => {
      const key = `${truck.city}-${truck.state}`;
      if (cityMap.has(key)) {
        cityMap.get(key)!.count++;
      } else {
        cityMap.set(key, {
          name: truck.city,
          state: truck.state,
          count: 1
        });
      }
    });

    return Array.from(cityMap.values())
      .sort((a, b) => b.count - a.count);
  }

  static getCuisines(): string[] {
    const cuisineSet = new Set<string>();
    this.trucks.forEach(truck => {
      truck.cuisine.forEach(c => cuisineSet.add(c));
    });
    return Array.from(cuisineSet).sort();
  }

  static getTags(): string[] {
    const tagSet = new Set<string>();
    this.trucks.forEach(truck => {
      truck.tags.forEach(t => tagSet.add(t));
    });
    return Array.from(tagSet).sort();
  }

  static getFeaturedTrucks(limit: number = 6): FoodTruck[] {
    return this.trucks
      .filter(truck => truck.rating && truck.rating >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }

  static getRecentlyAdded(limit: number = 6): FoodTruck[] {
    return this.trucks
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, limit);
  }

  static getStats() {
    const cities = this.getCities().length;
    const states = new Set(this.trucks.map(t => t.state)).size;
    const cuisines = this.getCuisines().length;
    const totalReviews = this.trucks.reduce((sum, truck) => sum + (truck.reviewCount || 0), 0);
    const avgRating = this.trucks.reduce((sum, truck) => sum + (truck.rating || 0), 0) / this.trucks.length;

    return {
      totalTrucks: this.trucks.length,
      cities,
      states,
      cuisines,
      totalReviews,
      avgRating: Math.round(avgRating * 10) / 10
    };
  }
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function formatPriceRange(priceRange: string): string {
  switch (priceRange) {
    case 'budget': return '$';
    case 'moderate': return '$$';
    case 'premium': return '$$$';
    default: return '$$';
  }
}

export function generateSEOTitle(truck: FoodTruck): string {
  return `${truck.name} - ${truck.cuisine.join(', ')} Food Truck in ${truck.city}, ${truck.state}`;
}

export function generateSEODescription(truck: FoodTruck): string {
  const specialties = truck.specialties.slice(0, 3).join(', ');
  return `${truck.description} Located in ${truck.city}, ${truck.state}. Famous for ${specialties}. Rating: ${truck.rating}/5 (${truck.reviewCount} reviews).`;
}