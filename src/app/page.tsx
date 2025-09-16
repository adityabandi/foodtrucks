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
      {/* Navigation with diner styling */}
      <nav className="bg-black text-white shadow-lg sticky top-0 z-50 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500 border-2 border-white rounded-full flex items-center justify-center mr-3">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black text-white" style={{ fontFamily: "'Bungee', cursive" }}>
                GROOVY GRUB
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a href="#directory" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors"
                 style={{ fontFamily: "'Righteous', cursive" }}>Directory</a>
              <a href="#cities" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors"
                 style={{ fontFamily: "'Righteous', cursive" }}>Cities</a>
              <a href="#about" className="text-yellow-400 hover:text-yellow-300 font-bold transition-colors"
                 style={{ fontFamily: "'Righteous', cursive" }}>About</a>
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
        {/* Fun background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-8xl">🍔</div>
          <div className="absolute top-20 right-20 text-6xl">🌮</div>
          <div className="absolute bottom-20 left-20 text-7xl">🍕</div>
          <div className="absolute bottom-10 right-10 text-5xl">🚚</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="diner-sign inline-block px-8 py-4 mb-6">
              <h2 className="text-4xl font-black neon-text"
                  style={{ fontFamily: "'Bungee', cursive" }}>
                GROOVY GRUB
              </h2>
            </div>
            <p className="text-2xl text-black font-bold"
               style={{ fontFamily: "'Righteous', cursive" }}>
              🌟 The most far-out food trucks around the globe! 🌟
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
            <div className="bg-black text-white px-8 py-4 rounded-full inline-block border-4 border-yellow-400 mb-6">
              <h2 className="text-3xl font-black" style={{ fontFamily: "'Bungee', cursive" }}>
                FIND YOUR GRUB
              </h2>
            </div>
            <p className="text-xl text-black font-bold"
               style={{ fontFamily: "'Righteous', cursive" }}>
              🔍 Search through our massive worldwide directory 🔍
            </p>
          </div>

          {/* Search Filters */}
          <SearchFilters onFiltersChange={handleFiltersChange} />

          {/* Results */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-8">
              <div className="jukebox-card bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                <h3 className="text-2xl font-black text-white"
                    style={{ fontFamily: "'Fredoka One', cursive" }}>
                  {filteredTrucks.length.toLocaleString()} Groovy Trucks Found!
                </h3>
              </div>
              <div className="bg-black text-yellow-400 px-4 py-2 rounded-full border-2 border-yellow-400">
                <span className="font-bold" style={{ fontFamily: "'Righteous', cursive" }}>
                  Showing {filteredTrucks.length > 0 ? '1' : '0'}-{Math.min(filteredTrucks.length, 24)} of {filteredTrucks.length.toLocaleString()}
                </span>
              </div>
            </div>

            {filteredTrucks.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black">
                  <span className="text-6xl">😢</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-4"
                    style={{ fontFamily: "'Fredoka One', cursive" }}>
                  No groovy trucks found, man!
                </h3>
                <p className="text-gray-600 font-bold" style={{ fontFamily: "'Righteous', cursive" }}>
                  Try adjusting your search filters to find more far-out results.
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
                <button className="diner-button px-12 py-6 text-2xl text-white hover:scale-110 transition-transform">
                  🚀 LOAD MORE GROOVY GRUB! 🚀
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer with diner styling */}
      <footer className="bg-black text-white py-16 border-t-8 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 border-2 border-white">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-black" style={{ fontFamily: "'Bungee', cursive" }}>
                  GROOVY GRUB
                </span>
              </div>
              <p className="text-yellow-400 font-bold leading-relaxed"
                 style={{ fontFamily: "'Righteous', cursive" }}>
                Discover the most far-out food trucks around the globe. Fresh, groovy, and totally delicious!
              </p>
            </div>
            <div>
              <h3 className="font-black mb-4 text-yellow-400 text-xl"
                  style={{ fontFamily: "'Fredoka One', cursive" }}>
                Cool Links
              </h3>
              <ul className="space-y-3 text-white">
                <li><a href="#directory" className="hover:text-yellow-400 font-bold transition-colors">Browse Directory</a></li>
                <li><a href="#cities" className="hover:text-yellow-400 font-bold transition-colors">Hip Cities</a></li>
                <li><a href="#cuisines" className="hover:text-yellow-400 font-bold transition-colors">Groovy Cuisines</a></li>
                <li><a href="#featured" className="hover:text-yellow-400 font-bold transition-colors">Featured Trucks</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-4 text-yellow-400 text-xl"
                  style={{ fontFamily: "'Fredoka One', cursive" }}>
                Happening Cities
              </h3>
              <ul className="space-y-3 text-white">
                <li><Link href="/city/new-york" className="hover:text-yellow-400 font-bold transition-colors">New York 🗽</Link></li>
                <li><Link href="/city/tokyo" className="hover:text-yellow-400 font-bold transition-colors">Tokyo 🗾</Link></li>
                <li><Link href="/city/london" className="hover:text-yellow-400 font-bold transition-colors">London 🇬🇧</Link></li>
                <li><Link href="/city/paris" className="hover:text-yellow-400 font-bold transition-colors">Paris 🇫🇷</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-black mb-4 text-yellow-400 text-xl"
                  style={{ fontFamily: "'Fredoka One', cursive" }}>
                Get in Touch
              </h3>
              <div className="space-y-3 text-white">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-yellow-400" />
                  <span className="font-bold">Worldwide, baby!</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-yellow-400" />
                  <span className="font-bold">Community Powered</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-4 border-yellow-400 mt-12 pt-8 text-center">
            <p className="text-yellow-400 font-bold text-lg"
               style={{ fontFamily: "'Righteous', cursive" }}>
              © 2024 Groovy Grub Finder. Keep on truckin&apos;! ✌️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
