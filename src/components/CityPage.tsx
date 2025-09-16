'use client';

import { FoodTruck } from '@/types/foodtruck';
import FoodTruckCard from './FoodTruckCard';
import { MapPin, Star, TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface CityPageProps {
  city: string;
  trucks: FoodTruck[];
}

export default function CityPage({ city, trucks }: CityPageProps) {
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'cuisine'>('rating');
  
  const firstTruck = trucks[0];
  const state = firstTruck.state;
  
  // Calculate city statistics
  const avgRating = trucks.reduce((sum, truck) => sum + (truck.rating || 0), 0) / trucks.length;
  const totalReviews = trucks.reduce((sum, truck) => sum + (truck.reviewCount || 0), 0);
  const cuisineTypes = [...new Set(trucks.flatMap(t => t.cuisine))];
  const topRatedTrucks = trucks.filter(t => t.rating && t.rating >= 4.5);
  
  // Sort trucks based on selected criteria
  const sortedTrucks = [...trucks].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
        return a.name.localeCompare(b.name);
      case 'cuisine':
        return a.cuisine[0].localeCompare(b.cuisine[0]);
      default:
        return 0;
    }
  });

  const priceDistribution = {
    budget: trucks.filter(t => t.priceRange === 'budget').length,
    moderate: trucks.filter(t => t.priceRange === 'moderate').length,
    premium: trucks.filter(t => t.priceRange === 'premium').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Directory
            </Link>
            <div className="flex items-center space-x-4">
              <MapPin className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700 font-medium">{city}, {state}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Food Trucks in {city}, {state}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover {trucks.length} amazing food trucks serving the best street food in {city}
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{trucks.length}</div>
                <div className="text-blue-200 text-sm">Food Trucks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                <div className="text-blue-200 text-sm">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{cuisineTypes.length}</div>
                <div className="text-blue-200 text-sm">Cuisines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalReviews.toLocaleString()}</div>
                <div className="text-blue-200 text-sm">Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with City Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {city} Food Scene
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Cuisines</h3>
                  <div className="space-y-1">
                    {cuisineTypes.slice(0, 5).map((cuisine) => {
                      const count = trucks.filter(t => t.cuisine.includes(cuisine)).length;
                      return (
                        <div key={cuisine} className="flex justify-between text-sm">
                          <span className="text-gray-600">{cuisine}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Budget ($)</span>
                      <span className="font-medium">{priceDistribution.budget}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Moderate ($$)</span>
                      <span className="font-medium">{priceDistribution.moderate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Premium ($$$)</span>
                      <span className="font-medium">{priceDistribution.premium}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Quality</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm">
                      {topRatedTrucks.length} trucks rated 4.5+ stars
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured/Top Rated */}
            {topRatedTrucks.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Top Rated
                </h2>
                <div className="space-y-3">
                  {topRatedTrucks.slice(0, 3).map((truck) => (
                    <Link
                      key={truck.id}
                      href={`/truck/${truck.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900 text-sm mb-1">
                        {truck.name.replace(` - ${city}`, '')}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        {truck.rating} • {truck.cuisine[0]}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sorting Options */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All Food Trucks in {city}
              </h2>
              <div className="flex items-center space-x-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'name' | 'cuisine')}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="rating">Rating</option>
                  <option value="name">Name</option>
                  <option value="cuisine">Cuisine</option>
                </select>
              </div>
            </div>

            {/* Food Truck Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedTrucks.map((truck) => (
                <FoodTruckCard key={truck.id} truck={truck} />
              ))}
            </div>

            {/* SEO Content */}
            <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Food Trucks in {city}, {state}
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  {city} boasts a vibrant food truck scene with {trucks.length} mobile kitchens 
                  serving everything from {cuisineTypes.slice(0, 3).join(', ')} and much more. 
                  Our comprehensive directory features detailed information about each food truck, 
                  including menus, locations, hours, and customer reviews.
                </p>
                <p className="mb-4">
                  Whether you&apos;re looking for a quick lunch, planning a food truck event, or 
                  exploring the local culinary scene, {city}&apos;s food trucks offer diverse options 
                  for every taste and budget. From budget-friendly options starting at $ to 
                  premium gourmet experiences at $$$, there&apos;s something for everyone.
                </p>
                <p>
                  The average rating across all {city} food trucks is {avgRating.toFixed(1)} out of 5 stars, 
                  based on {totalReviews.toLocaleString()} customer reviews. Join the community of food 
                  lovers discovering the best mobile dining experiences in {city}, {state}.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}