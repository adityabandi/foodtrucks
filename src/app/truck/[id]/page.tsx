import { FoodTruckService, generateSEOTitle, generateSEODescription } from '@/lib/foodTruckService';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FoodTruckDetail from '@/components/FoodTruckDetail';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const truck = FoodTruckService.getTruckById(params.id);
  
  if (!truck) {
    return {
      title: 'Food Truck Not Found',
      description: 'The requested food truck could not be found.'
    };
  }

  return {
    title: generateSEOTitle(truck),
    description: generateSEODescription(truck),
    keywords: [
      ...truck.cuisine,
      ...truck.specialties,
      ...truck.tags,
      truck.city,
      truck.state,
      'food truck',
      'mobile food',
      'street food'
    ].join(', '),
    openGraph: {
      title: generateSEOTitle(truck),
      description: generateSEODescription(truck),
      type: 'website',
      locale: 'en_US',
      siteName: 'FoodTruck Finder',
    },
    twitter: {
      card: 'summary_large_image',
      title: generateSEOTitle(truck),
      description: generateSEODescription(truck),
    },
    alternates: {
      canonical: `/truck/${truck.id}`,
    },
  };
}

export async function generateStaticParams() {
  const trucks = FoodTruckService.getAllTrucks();
  return trucks.map((truck) => ({
    id: truck.id,
  }));
}

export default function TruckPage({ params }: Props) {
  const truck = FoodTruckService.getTruckById(params.id);

  if (!truck) {
    notFound();
  }

  return <FoodTruckDetail truck={truck} />;
}