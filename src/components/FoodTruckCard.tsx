import { FoodTruck } from '@/types/foodtruck';
import { formatPriceRange } from '@/lib/foodTruckService';
import { Star, MapPin, Clock, Phone, Globe } from 'lucide-react';
import Link from 'next/link';

interface FoodTruckCardProps {
  truck: FoodTruck;
}

export default function FoodTruckCard({ truck }: FoodTruckCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
        <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
          <span className="text-white text-4xl font-bold">{truck.name.charAt(0)}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            <Link href={`/truck/${truck.id}`} className="hover:text-blue-600">
              {truck.name}
            </Link>
          </h3>
          <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-gray-600">
              {formatPriceRange(truck.priceRange)}
            </span>
          </div>
        </div>

        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
          <span className="text-sm text-gray-600">{truck.city}, {truck.state}</span>
        </div>

        {truck.rating && (
          <div className="flex items-center mb-3">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-900 ml-1">
              {truck.rating}
            </span>
            <span className="text-sm text-gray-600 ml-1">
              ({truck.reviewCount} reviews)
            </span>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {truck.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {truck.cuisine.slice(0, 3).map((cuisine) => (
            <span
              key={cuisine}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {cuisine}
            </span>
          ))}
          {truck.cuisine.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{truck.cuisine.length - 3} more
            </span>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {truck.specialties.slice(0, 2).map((specialty) => (
            <div key={specialty} className="text-sm text-gray-700">
              • {specialty}
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex space-x-3">
            {truck.phone && (
              <Phone className="h-4 w-4 text-gray-400" />
            )}
            {truck.website && (
              <Globe className="h-4 w-4 text-gray-400" />
            )}
            <Clock className="h-4 w-4 text-gray-400" />
          </div>
          <Link
            href={`/truck/${truck.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}