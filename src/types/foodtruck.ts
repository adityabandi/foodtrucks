export interface FoodTruck {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  city: string;
  state: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  operatingHours?: {
    [key: string]: string; // day of week -> hours
  };
  specialties: string[];
  priceRange: 'budget' | 'moderate' | 'premium';
  rating?: number;
  reviewCount?: number;
  images: string[];
  location?: {
    lat: number;
    lng: number;
  };
  established?: number;
  ownerStory?: string;
  menuHighlights: string[];
  tags: string[];
  lastUpdated: string;
}

export interface City {
  name: string;
  state: string;
  count: number;
}

export interface FilterOptions {
  city?: string;
  state?: string;
  cuisine?: string[];
  priceRange?: string[];
  tags?: string[];
  search?: string;
}