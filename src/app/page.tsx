'use client';

import { useState, useEffect, useCallback } from 'react';
import { FoodTruckService } from '@/lib/foodTruckService';
import { FoodTruck, FilterOptions } from '@/types/foodtruck';
import FoodTruckCard from '@/components/FoodTruckCard';
import SearchFilters from '@/components/SearchFilters';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import { Truck, MapPin, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [filteredTrucks, setFilteredTrucks] = useState<FoodTruck[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trucks = FoodTruckService.getAllTrucks();
    setFilteredTrucks(trucks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const filtered = FoodTruckService.searchTrucks(filters);
    setFilteredTrucks(filtered);
  }, [filters]);

  const handleFiltersChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = FoodTruckService.getStats();
  const featuredTrucks = FoodTruckService.getFeaturedTrucks(6);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-gray-900">FoodTruck Finder</span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#directory" className="text-gray-700 hover:text-blue-600 font-medium">Directory</a>
              <a href="#cities" className="text-gray-700 hover:text-blue-600 font-medium">Cities</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Featured Food Trucks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Food Trucks</h2>
            <p className="text-gray-600 text-lg">Top-rated food trucks across the United States</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrucks.map((truck) => (
              <FoodTruckCard key={truck.id} truck={truck} />
            ))}
          </div>
        </div>
      </section>

      {/* Search and Directory */}
      <section id="directory" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Food Truck</h2>
            <p className="text-gray-600 text-lg">Search through our comprehensive directory of food trucks</p>
          </div>

          {/* Search Filters */}
          <SearchFilters onFiltersChange={handleFiltersChange} />

          {/* Results */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {filteredTrucks.length} Food Trucks Found
              </h3>
              <div className="text-gray-600">
                Showing results {filteredTrucks.length > 0 ? '1' : '0'}-{Math.min(filteredTrucks.length, 20)} of {filteredTrucks.length}
              </div>
            </div>

            {filteredTrucks.length === 0 ? (
              <div className="text-center py-12">
                <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No food trucks found</h3>
                <p className="text-gray-600">Try adjusting your search filters to find more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTrucks.slice(0, 20).map((truck) => (
                  <FoodTruckCard key={truck.id} truck={truck} />
                ))}
              </div>
            )}

            {filteredTrucks.length > 20 && (
              <div className="text-center mt-12">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-blue-400 mr-3" />
                <span className="text-xl font-bold">FoodTruck Finder</span>
              </div>
              <p className="text-gray-400">
                Discover the best food trucks across the United States. Fresh, local, and delicious.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#directory" className="hover:text-white">Browse Directory</a></li>
                <li><a href="#cities" className="hover:text-white">Cities</a></li>
                <li><a href="#cuisines" className="hover:text-white">Cuisines</a></li>
                <li><a href="#featured" className="hover:text-white">Featured</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Popular Cities</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/city/new-york" className="hover:text-white">New York</Link></li>
                <li><Link href="/city/los-angeles" className="hover:text-white">Los Angeles</Link></li>
                <li><Link href="/city/chicago" className="hover:text-white">Chicago</Link></li>
                <li><Link href="/city/austin" className="hover:text-white">Austin</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>United States</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Community Driven</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodTruck Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
