import { FoodTruckService, generateSlug } from '@/lib/foodTruckService';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityPage from '@/components/CityPage';

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const trucks = (await FoodTruckService.getAllTrucks()).filter(truck => 
    generateSlug(truck.city) === city
  );
  
  if (trucks.length === 0) {
    return {
      title: 'City Not Found',
      description: 'The requested city could not be found.'
    };
  }

  const firstTruck = trucks[0];
  const cuisineTypes = [...new Set(trucks.flatMap(t => t.cuisine))];
  const avgRating = trucks.reduce((sum, truck) => sum + (truck.rating || 0), 0) / trucks.length;

  return {
    title: `Food Trucks in ${cityName}, ${firstTruck.state} - Best Mobile Food Directory`,
    description: `Discover ${trucks.length} amazing food trucks in ${cityName}, ${firstTruck.state}. Find ${cuisineTypes.slice(0, 5).join(', ')} and more. Average rating: ${avgRating.toFixed(1)}/5.`,
    keywords: [
      `food trucks ${cityName}`,
      `${cityName} street food`,
      `mobile food ${firstTruck.state}`,
      ...cuisineTypes,
      'food truck directory',
      'local dining'
    ].join(', '),
    openGraph: {
      title: `Food Trucks in ${cityName}, ${firstTruck.state}`,
      description: `Find the best food trucks in ${cityName}. ${trucks.length} trucks serving ${cuisineTypes.slice(0, 3).join(', ')} and more.`,
      type: 'website',
      locale: 'en_US',
      siteName: 'FoodTruck Finder',
    },
    alternates: {
      canonical: `/city/${city}`,
    },
  };
}

export async function generateStaticParams() {
  const cities = await FoodTruckService.getCities();
  return cities.map((city) => ({
    city: generateSlug(city.name),
  }));
}

export default async function CityPageRoute({ params }: Props) {
  const { city } = await params;
  const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const trucks = (await FoodTruckService.getAllTrucks()).filter(truck => 
    generateSlug(truck.city) === city
  );

  if (trucks.length === 0) {
    notFound();
  }

  return <CityPage city={cityName} trucks={trucks} />;
}