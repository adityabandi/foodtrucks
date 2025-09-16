'use client';

import { FoodTruck } from '@/types/foodtruck';
import { formatPriceRange } from '@/lib/foodTruckService';
import { 
  Star, MapPin, Clock, Phone, Globe, Instagram, Facebook, Twitter,
  Calendar, ChefHat, Tag, ArrowLeft, Share2, Heart
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface FoodTruckDetailProps {
  truck: FoodTruck;
}

export default function FoodTruckDetail({ truck }: FoodTruckDetailProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Food Trucks', href: '/#directory' },
    { label: `${truck.city}, ${truck.state}`, href: `/city/${truck.city.toLowerCase().replace(/\s+/g, '-')}` },
    { label: truck.name, href: `/truck/${truck.id}` }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: truck.name,
          text: truck.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Directory
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <Share2 className="h-5 w-5 mr-1" />
                Share
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center ${isFavorite ? 'text-red-600' : 'text-gray-600'} hover:text-red-600`}
              >
                <Heart className={`h-5 w-5 mr-1 ${isFavorite ? 'fill-current' : ''}`} />
                Save
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="text-gray-400 mx-2">/</span>}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-gray-900 font-medium">{crumb.label}</span>
                  ) : (
                    <Link href={crumb.href} className="text-blue-600 hover:text-blue-700">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="aspect-w-16 aspect-h-9 mb-8">
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-6xl font-bold">{truck.name.charAt(0)}</span>
              </div>
            </div>

            {/* Main Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{truck.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{truck.address || `${truck.city}, ${truck.state}`}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPriceRange(truck.priceRange)}
                  </div>
                  <div className="text-sm text-gray-600">Price Range</div>
                </div>
              </div>

              {truck.rating && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(truck.rating!)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-lg font-medium">{truck.rating}</span>
                  <span className="ml-1 text-gray-600">({truck.reviewCount} reviews)</span>
                </div>
              )}

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {truck.description}
              </p>

              {/* Cuisines */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cuisine Types</h3>
                <div className="flex flex-wrap gap-2">
                  {truck.cuisine.map((cuisine) => (
                    <span
                      key={cuisine}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {cuisine}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  <ChefHat className="inline h-5 w-5 mr-2" />
                  Specialties & Menu Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {truck.specialties.map((specialty, index) => (
                    <div key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      <span className="text-gray-700">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {truck.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    <Tag className="inline h-5 w-5 mr-2" />
                    Features & Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {truck.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner Story */}
            {truck.ownerStory && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-700 leading-relaxed">{truck.ownerStory}</p>
                {truck.established && (
                  <div className="mt-4 flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Established in {truck.established}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                {truck.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <a href={`tel:${truck.phone}`} className="text-blue-600 hover:text-blue-700">
                      {truck.phone}
                    </a>
                  </div>
                )}

                {truck.website && (
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-gray-400 mr-3" />
                    <a 
                      href={truck.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                {truck.operatingHours && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Hours</div>
                      <div className="text-gray-600 text-sm">
                        {truck.operatingHours.schedule || 'Check website for current hours'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Media */}
              {truck.socialMedia && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Follow Us</h4>
                  <div className="flex space-x-3">
                    {truck.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${truck.socialMedia.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700"
                      >
                        <Instagram className="h-6 w-6" />
                      </a>
                    )}
                    {truck.socialMedia.facebook && (
                      <a
                        href={`https://facebook.com/${truck.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Facebook className="h-6 w-6" />
                      </a>
                    )}
                    {truck.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${truck.socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-500"
                      >
                        <Twitter className="h-6 w-6" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-6 space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Get Directions
                </button>
                <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Call Now
                </button>
              </div>
            </div>

            {/* Location Map Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p>Interactive map coming soon</p>
                  <p className="text-sm">{truck.city}, {truck.state}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}