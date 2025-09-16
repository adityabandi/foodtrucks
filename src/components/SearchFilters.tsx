'use client';

import { useState, useEffect } from 'react';
import { FilterOptions, FoodTruck } from '@/types/foodtruck';
import { FoodTruckService } from '@/lib/foodTruckService';
import FoodTruckCard from '@/components/FoodTruckCard';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  initialTrucks: FoodTruck[];
}

const SearchFilters = ({ initialTrucks }: SearchFiltersProps) => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filteredTrucks, setFilteredTrucks] = useState<FoodTruck[]>(initialTrucks);

  const cities = FoodTruckService.getCities();
  const cuisines = FoodTruckService.getCuisines();
  const tags = FoodTruckService.getTags();
  const states = [...new Set(cities.map(c => c.state))].sort();

  useEffect(() => {
    const filters: FilterOptions = {
      search: search || undefined,
      city: selectedCity || undefined,
      state: selectedState || undefined,
      cuisine: selectedCuisines.length > 0 ? selectedCuisines : undefined,
      priceRange: selectedPriceRanges.length > 0 ? selectedPriceRanges : undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
    };
    const filtered = FoodTruckService.searchTrucks(filters);
    setFilteredTrucks(filtered);
  }, [search, selectedCity, selectedState, selectedCuisines, selectedPriceRanges, selectedTags]);

  const clearAllFilters = () => {
    setSearch('');
    setSelectedCity('');
    setSelectedState('');
    setSelectedCuisines([]);
    setSelectedPriceRanges([]);
    setSelectedTags([]);
  };

  const hasActiveFilters = search || selectedCity || selectedState || 
    selectedCuisines.length > 0 || selectedPriceRanges.length > 0 || selectedTags.length > 0;

  const toggleArrayFilter = (value: string, currentArray: string[], setter: (arr: string[]) => void) => {
    if (currentArray.includes(value)) {
      setter(currentArray.filter(item => item !== value));
    } else {
      setter([...currentArray, value]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search food trucks, cuisines, specialties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={`${city.name}-${city.state}`} value={city.name}>
                {city.name}, {city.state} ({city.count})
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-gray-200 pt-6 space-y-6">
          {/* Cuisines */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Cuisines</label>
            <div className="flex flex-wrap gap-2">
              {cuisines.slice(0, 12).map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => toggleArrayFilter(cuisine, selectedCuisines, setSelectedCuisines)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCuisines.includes(cuisine)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
            <div className="flex gap-2">
              {[
                { value: 'budget', label: '$ - Budget Friendly' },
                { value: 'moderate', label: '$$ - Moderate' },
                { value: 'premium', label: '$$$ - Premium' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter(option.value, selectedPriceRanges, setSelectedPriceRanges)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPriceRanges.includes(option.value)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 10).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleArrayFilter(tag, selectedTags, setSelectedTags)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={clearAllFilters}
            className="flex items-center text-red-600 hover:text-red-700 font-medium"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All Filters
          </button>
        </div>
      )}

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
  );
};

export default SearchFilters;