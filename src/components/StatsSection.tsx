import { Truck, ChefHat, Star, Users, TrendingUp, Globe } from 'lucide-react';

interface StatsProps {
  stats: {
    totalTrucks: number;
    cities: number;
    states: number;
    cuisines: number;
    totalReviews: number;
    avgRating: number;
  };
}

const StatsSection = ({ stats }: StatsProps) => {
  const statItems = [
    {
      icon: Truck,
      value: stats.totalTrucks.toLocaleString(),
      label: 'Groovy Trucks',
      color: 'bg-red-500',
      description: 'Rolling kitchens'
    },
    {
      icon: Globe,
      value: stats.cities.toString(),
      label: 'Hip Cities',
      color: 'bg-blue-500',
      description: 'Worldwide spots'
    },
    {
      icon: ChefHat,
      value: stats.cuisines.toString(),
      label: 'Cool Cuisines',
      color: 'bg-yellow-500',
      description: 'Tasty varieties'
    },
    {
      icon: Star,
      value: stats.avgRating.toString(),
      label: 'Stellar Rating',
      color: 'bg-purple-500',
      description: 'Out of 5 stars'
    },
    {
      icon: Users,
      value: stats.totalReviews.toLocaleString(),
      label: 'Happy Cats',
      color: 'bg-green-500',
      description: 'Customer reviews'
    },
    {
      icon: TrendingUp,
      value: '24/7',
      label: 'Always Open',
      color: 'bg-pink-500',
      description: 'Non-stop grub'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-yellow-100 via-red-100 to-blue-100 relative overflow-hidden">
      {/* Retro background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 rounded-full transform -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-20 right-0 w-24 h-24 bg-blue-500 rounded-full transform translate-x-12"></div>
        <div className="absolute bottom-20 left-20 w-20 h-20 bg-yellow-500 rounded-full"></div>
        <div className="absolute bottom-0 right-20 w-28 h-28 bg-green-500 rounded-full transform translate-y-14"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="diner-sign inline-block px-12 py-6 mb-6">
            <h2 className="text-4xl md:text-5xl font-black neon-text"
                style={{ fontFamily: "'Bungee', cursive" }}>
              THE NUMBERS
            </h2>
          </div>
          <p className="text-2xl text-black font-bold"
             style={{ fontFamily: "'Righteous', cursive" }}>
            🌟 Check out these far-out stats, baby! 🌟
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {statItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`jukebox-card p-8 ${item.color} hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer`}>
                  {/* Neon border effect */}
                  <div className="absolute inset-0 rounded-3xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  
                  <IconComponent className="h-12 w-12 text-white mx-auto mb-4 drop-shadow-lg" />
                  
                  <div className="text-4xl font-black text-white mb-2 retro-shadow"
                       style={{ fontFamily: "'Fredoka One', cursive" }}>
                    {item.value}
                  </div>
                  
                  <div className="text-lg text-white font-bold mb-1"
                       style={{ fontFamily: "'Righteous', cursive" }}>
                    {item.label}
                  </div>
                  
                  <div className="text-sm text-white opacity-90 font-medium">
                    {item.description}
                  </div>
                  
                  {/* Decorative stars */}
                  <div className="absolute top-2 right-2 text-white opacity-50">
                    ✨
                  </div>
                  <div className="absolute bottom-2 left-2 text-white opacity-50">
                    ⭐
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fun call-to-action */}
        <div className="text-center mt-16">
          <div className="bg-black text-white px-8 py-4 rounded-full inline-block border-4 border-yellow-400 hover:animate-bounce">
            <span className="text-xl font-bold" style={{ fontFamily: "'Righteous', cursive" }}>
              🎸 Rock on, food lovers! 🎸
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;