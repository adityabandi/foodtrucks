import { Truck, MapPin, ChefHat, Star, Users, TrendingUp } from 'lucide-react';

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
      label: 'Food Trucks',
      color: 'text-blue-600'
    },
    {
      icon: MapPin,
      value: stats.cities.toString(),
      label: 'Cities',
      color: 'text-green-600'
    },
    {
      icon: ChefHat,
      value: stats.cuisines.toString(),
      label: 'Cuisines',
      color: 'text-purple-600'
    },
    {
      icon: Star,
      value: stats.avgRating.toString(),
      label: 'Avg Rating',
      color: 'text-yellow-600'
    },
    {
      icon: Users,
      value: stats.totalReviews.toLocaleString(),
      label: 'Reviews',
      color: 'text-pink-600'
    },
    {
      icon: TrendingUp,
      value: stats.states.toString(),
      label: 'States',
      color: 'text-indigo-600'
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            The Largest Food Truck Directory
          </h2>
          <p className="text-gray-600 text-lg">
            Comprehensive coverage across the United States
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {statItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <IconComponent className={`h-8 w-8 ${item.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;