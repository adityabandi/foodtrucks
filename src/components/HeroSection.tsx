import { Search, MapPin, ChefHat, DollarSign, Tag, Star } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-gradient-to-br from-red-400 via-yellow-300 to-blue-400">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="checkered-bg absolute inset-0"></div>
      </div>
      
      {/* Floating retro elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <div className="w-16 h-16 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center">
          <Star className="w-8 h-8 text-black" />
        </div>
      </div>
      <div className="absolute top-32 right-20 animate-pulse">
        <div className="w-12 h-12 bg-red-500 border-3 border-black rounded-lg rotate-45"></div>
      </div>
      <div className="absolute bottom-32 left-20 animate-spin">
        <div className="w-10 h-10 bg-blue-500 border-3 border-black rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main heading with retro styling */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 retro-shadow" 
                style={{ fontFamily: "'Bungee', cursive" }}>
              GROOVY
            </h1>
            <h2 className="text-4xl md:text-6xl font-bold text-black chrome-text mb-2"
                style={{ fontFamily: "'Fredoka One', cursive" }}>
              FOOD TRUCKS
            </h2>
            <div className="diner-sign inline-block px-8 py-4 mx-auto">
              <span className="text-2xl md:text-3xl neon-text">WORLDWIDE!</span>
            </div>
          </div>

          <p className="text-xl md:text-2xl mb-12 text-black font-bold"
             style={{ fontFamily: "'Righteous', cursive" }}>
            🚚 Far out mobile dining from around the globe! 🌍
          </p>

          {/* Retro search box */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="jukebox-card p-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search groovy eats, cuisines, or cities..."
                    className="retro-input w-full pl-12 pr-4 py-4 text-lg font-bold placeholder-gray-500"
                    style={{ fontFamily: "'Righteous', cursive" }}
                  />
                </div>
                <button className="diner-button px-10 py-4 text-xl text-white">
                  FIND GRUB!
                </button>
              </div>
            </div>
          </div>

          {/* Fun stats with retro styling */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MapPin, value: "150+", label: "Hip Cities", color: "bg-red-500" },
              { icon: ChefHat, value: "50+", label: "Cool Cuisines", color: "bg-blue-500" },
              { icon: DollarSign, value: "All", label: "Budgets", color: "bg-yellow-500" },
              { icon: Tag, value: "Verified", label: "Far Out Info", color: "bg-green-500" }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`jukebox-card p-6 ${item.color} border-black hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-10 w-10 text-white mx-auto mb-3" />
                    <div className="text-3xl font-black text-white mb-1 retro-shadow"
                         style={{ fontFamily: "'Fredoka One', cursive" }}>
                      {item.value}
                    </div>
                    <div className="text-lg text-white font-bold"
                         style={{ fontFamily: "'Righteous', cursive" }}>
                      {item.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Retro call to action */}
          <div className="mt-12">
            <p className="text-2xl text-black font-bold mb-6"
               style={{ fontFamily: "'Righteous', cursive" }}>
              ✨ Ready to dig in, daddy-o? ✨
            </p>
            <button className="diner-button px-12 py-6 text-2xl text-white hover:animate-pulse">
              LET&apos;S GO!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;