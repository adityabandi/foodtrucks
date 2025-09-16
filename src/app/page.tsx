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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-red-50 to-blue-50">
      {/* Navigation with classic diner styling */}
      <nav className="bg-black text-white shadow-lg sticky top-0 z-50 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 border-2 border-white rounded-lg flex items-center justify-center mr-3">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">
                DINER WHEELS
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#directory" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                Directory
              </a>
              <a href="#cities" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                Cities
              </a>
              <a href="#about" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                About
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <StatsSection stats={stats} />

      {/* Featured Food Trucks */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">🍽️</div>
          <div className="absolute top-20 right-20 text-5xl">🥤</div>
          <div className="absolute bottom-20 left-20 text-5xl">🍟</div>
          <div className="absolute bottom-10 right-10 text-4xl">🚚</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="diner-sign inline-block px-12 py-6 mb-6">
              <h2 className="text-3xl font-bold text-white">
                FEATURED DINERS
              </h2>
            </div>
            <p className="text-xl text-gray-800 font-medium">
              🌟 The finest mobile diners serving America 🌟
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrucks.map((truck) => (
              <FoodTruckCard key={truck.id} truck={truck} />
            ))}
          </div>
        </div>
      </section>

      {/* Search and Directory */}
      <section id="directory" className="py-20 bg-gradient-to-br from-red-100 via-yellow-100 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-black text-white px-10 py-4 rounded-lg inline-block border-3 border-yellow-400 mb-6">
              <h2 className="text-2xl font-bold tracking-wide">
                FIND YOUR DINER
              </h2>
            </div>
            <p className="text-lg text-gray-800 font-medium">
              🔍 Search our complete directory of mobile diners 🔍
            </p>
          </div>

          {/* Search Filters */}
          <SearchFilters onFiltersChange={handleFiltersChange} />

          {/* Results */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-8">
              <div className="jukebox-card bg-gradient-to-r from-red-500 to-blue-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white">
                  {filteredTrucks.length.toLocaleString()} Diners Found
                </h3>
              </div>
              <div className="bg-black text-yellow-400 px-4 py-2 rounded-lg border-2 border-yellow-400">
                <span className="font-semibold">
                  Showing {filteredTrucks.length > 0 ? '1' : '0'}-{Math.min(filteredTrucks.length, 24)} of {filteredTrucks.length.toLocaleString()}
                </span>
              </div>
            </div>

            {filteredTrucks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-6 border-3 border-black">
                  <span className="text-5xl">😔</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  No diners found
                </h3>
                <p className="text-gray-600 font-medium">
                  Try adjusting your search filters to find more results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredTrucks.slice(0, 24).map((truck) => (
                  <FoodTruckCard key={truck.id} truck={truck} />
                ))}
              </div>
            )}

            {filteredTrucks.length > 24 && (
              <div className="text-center mt-12">
                <button className="diner-button px-10 py-4 text-lg font-bold hover:shadow-lg transition-all">
                  LOAD MORE DINERS
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer with classic diner styling */}
      <footer className="bg-black text-white py-16 border-t-8 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mr-4 border-2 border-white">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-wide">
                  DINER WHEELS
                </span>
              </div>
              <p className="text-yellow-400 font-medium leading-relaxed">
                Discover the finest mobile diners across America. Fresh food, classic service, and timeless taste.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-yellow-400 text-lg">
                Quick Links
              </h3>
              <ul className="space-y-3 text-white">
                <li><a href="#directory" className="hover:text-yellow-400 font-medium transition-colors">Browse Directory</a></li>
                <li><a href="#cities" className="hover:text-yellow-400 font-medium transition-colors">Popular Cities</a></li>
                <li><a href="#cuisines" className="hover:text-yellow-400 font-medium transition-colors">Cuisine Types</a></li>
                <li><a href="#featured" className="hover:text-yellow-400 font-medium transition-colors">Featured Diners</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-yellow-400 text-lg">
                Top Cities
              </h3>
              <ul className="space-y-3 text-white">
                <li><Link href="/city/new-york" className="hover:text-yellow-400 font-medium transition-colors">New York 🗽</Link></li>
                <li><Link href="/city/tokyo" className="hover:text-yellow-400 font-medium transition-colors">Tokyo 🗾</Link></li>
                <li><Link href="/city/london" className="hover:text-yellow-400 font-medium transition-colors">London 🇬🇧</Link></li>
                <li><Link href="/city/paris" className="hover:text-yellow-400 font-medium transition-colors">Paris 🇫🇷</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-yellow-400 text-lg">
                Contact Info
              </h3>
              <div className="space-y-3 text-white">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-yellow-400" />
                  <span className="font-medium">Worldwide Service</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-yellow-400" />
                  <span className="font-medium">Community Driven</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-4 border-yellow-400 mt-12 pt-8 text-center">
            <p className="text-yellow-400 font-medium text-lg">
              © 2024 Diner Wheels Finder. Serving America since today! 🍽️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
