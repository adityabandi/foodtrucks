import { Search, MapPin, ChefHat, DollarSign, Tag } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Food Trucks
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Find the best mobile dining experiences across the United States
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search food trucks, cuisines, or cities..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>
                <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-2 text-blue-200" />
              <span className="text-sm">50+ Cities</span>
            </div>
            <div className="flex flex-col items-center">
              <ChefHat className="h-8 w-8 mb-2 text-blue-200" />
              <span className="text-sm">35+ Cuisines</span>
            </div>
            <div className="flex flex-col items-center">
              <DollarSign className="h-8 w-8 mb-2 text-blue-200" />
              <span className="text-sm">All Budgets</span>
            </div>
            <div className="flex flex-col items-center">
              <Tag className="h-8 w-8 mb-2 text-blue-200" />
              <span className="text-sm">Verified Info</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;