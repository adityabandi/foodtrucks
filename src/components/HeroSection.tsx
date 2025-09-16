import { Search, MapPin, ChefHat, DollarSign, Tag, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500">
      {/* Classic diner checkered floor pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="checkered-bg absolute inset-0"></div>
      </div>
      
      {/* Subtle vintage elements */}
      <div className="absolute top-20 left-10">
        <div className="w-12 h-12 bg-yellow-400 border-2 border-black rounded-lg flex items-center justify-center">
          <Star className="w-6 h-6 text-black" />
        </div>
      </div>
      <div className="absolute top-32 right-20">
        <div className="w-8 h-8 bg-red-500 border-2 border-black rounded-full"></div>
      </div>
      <div className="absolute bottom-32 left-20">
        <div className="w-6 h-6 bg-blue-500 border-2 border-black rounded-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main heading with classic diner styling */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 retro-shadow">
              DINER WHEELS
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-2">
              MOBILE DINERS
            </h2>
            <div className="diner-sign inline-block px-10 py-4 mx-auto">
              <span className="text-xl md:text-2xl">ACROSS AMERICA</span>
            </div>
          </div>

          <p className="text-lg md:text-xl mb-12 text-black font-semibold">
            🍽️ Discover authentic mobile dining experiences nationwide 🚚
          </p>

          {/* Classic search box */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="jukebox-card p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search diners, cuisines, or cities..."
                    className="retro-input w-full pl-12 pr-4 py-3 text-base font-medium placeholder-gray-500"
                  />
                </div>
                <button className="diner-button px-8 py-3 text-lg font-bold">
                  FIND DINERS
                </button>
              </div>
            </div>
          </div>

          {/* Stats with classic styling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MapPin, value: "135+", label: "Cities", color: "bg-red-500" },
              { icon: ChefHat, value: "50+", label: "Cuisines", color: "bg-blue-500" },
              { icon: DollarSign, value: "All", label: "Budgets", color: "bg-yellow-500" },
              { icon: Tag, value: "5000+", label: "Diners", color: "bg-green-500" }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`jukebox-card p-4 ${item.color} border-black hover:shadow-lg transition-shadow`}>
                    <IconComponent className="h-8 w-8 text-white mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">
                      {item.value}
                    </div>
                    <div className="text-sm text-white font-medium">
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to action */}
          <div className="mt-12">
            <p className="text-lg text-black font-semibold mb-6">
              ✨ Ready to explore America&apos;s finest mobile diners? ✨
            </p>
            <button className="diner-button px-10 py-4 text-lg font-bold hover:shadow-lg transition-shadow">
              START EXPLORING
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;