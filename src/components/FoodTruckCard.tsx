import { FoodTruck } from '@/types/foodtruck';
import { formatPriceRange } from '@/lib/foodTruckService';
import { Star, MapPin, Clock, Phone, Globe, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface FoodTruckCardProps {
  truck: FoodTruck;
}

export default function FoodTruckCard({ truck }: FoodTruckCardProps) {
  const cardColors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600', 
    'from-yellow-400 to-yellow-600',
    'from-green-400 to-green-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600'
  ];
  
  const randomColor = cardColors[Math.floor(Math.random() * cardColors.length)];

  return (
    <div className="jukebox-card hover:scale-105 hover:rotate-1 transition-all duration-500 group cursor-pointer bg-white">
      {/* Retro header with gradient */}
      <div className={`bg-gradient-to-r ${randomColor} p-6 relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 text-white text-2xl animate-spin">⭐</div>
        <div className="absolute bottom-2 left-2 text-white text-xl opacity-70">🚚</div>
        
        {/* Truck name with retro styling */}
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
            <span className="text-3xl font-black text-black" style={{ fontFamily: "'Fredoka One', cursive" }}>
              {truck.name.charAt(0)}
            </span>
          </div>
          
          <h3 className="text-xl font-black text-white text-center retro-shadow leading-tight"
              style={{ fontFamily: "'Righteous', cursive" }}>
            <Link href={`/truck/${truck.id}`} className="hover:text-yellow-200 transition-colors">
              {truck.name.replace(` - ${truck.city}`, '')}
            </Link>
          </h3>
        </div>
      </div>
      
      <div className="p-6 bg-white">
        {/* Location with fun styling */}
        <div className="flex items-center justify-center mb-3 bg-black text-white px-4 py-2 rounded-full">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm font-bold" style={{ fontFamily: "'Righteous', cursive" }}>
            {truck.city}, {truck.state}, {truck.country}
          </span>
        </div>

        {/* Price and rating */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-yellow-400 text-black px-3 py-1 rounded-full border-2 border-black">
            <span className="text-lg font-black">{formatPriceRange(truck.priceRange)}</span>
          </div>
          
          {truck.rating && (
            <div className="flex items-center bg-green-400 text-black px-3 py-1 rounded-full border-2 border-black">
              <Star className="h-4 w-4 fill-current mr-1" />
              <span className="font-black">{truck.rating}</span>
              <span className="text-xs ml-1">({truck.reviewCount})</span>
            </div>
          )}
        </div>

        {/* Description with fun font */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 font-medium leading-relaxed">
          {truck.description}
        </p>

        {/* Cuisine tags with rainbow colors */}
        <div className="flex flex-wrap gap-2 mb-4">
          {truck.cuisine.slice(0, 3).map((cuisine, index) => {
            const tagColors = ['bg-red-200 text-red-800', 'bg-blue-200 text-blue-800', 'bg-green-200 text-green-800'];
            return (
              <span
                key={cuisine}
                className={`px-3 py-1 ${tagColors[index % tagColors.length]} text-xs rounded-full font-bold border-2 border-black`}
                style={{ fontFamily: "'Righteous', cursive" }}
              >
                {cuisine}
              </span>
            );
          })}
          {truck.cuisine.length > 3 && (
            <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full font-bold border-2 border-black">
              +{truck.cuisine.length - 3} more!
            </span>
          )}
        </div>

        {/* Specialties with fun icons */}
        <div className="space-y-2 mb-4">
          {truck.specialties.slice(0, 2).map((specialty, index) => (
            <div key={specialty} className="flex items-center text-sm text-gray-700">
              <span className="mr-2">{index === 0 ? '🍔' : '🍟'}</span>
              <span className="font-medium">{specialty}</span>
            </div>
          ))}
        </div>

        {/* Action area with retro styling */}
        <div className="flex justify-between items-center pt-4 border-t-4 border-black border-dashed">
          <div className="flex space-x-2">
            {truck.phone && (
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
            )}
            {truck.website && (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
            )}
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-white" />
            </div>
          </div>
          
          <Link
            href={`/truck/${truck.id}`}
            className="diner-button px-6 py-3 text-sm text-white hover:scale-105 transition-transform"
          >
            <Sparkles className="h-4 w-4 inline mr-1" />
            CHECK IT OUT!
          </Link>
        </div>
      </div>
    </div>
  );
}