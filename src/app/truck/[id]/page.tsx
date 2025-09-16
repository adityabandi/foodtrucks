import { FoodTruckService, generateSEOTitle, generateSEODescription } from '@/lib/foodTruckService';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FoodTruckDetail from '@/components/FoodTruckDetail';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const truck = await FoodTruckService.getTruckById(id);
  
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
      canonical: `/truck/${id}`,
    },
  };
}

export async function generateStaticParams() {
  const trucks = await FoodTruckService.getAllTrucks();
  return trucks.map((truck) => ({
    id: truck.id,
  }));
}

export default async function TruckPage({ params }: Props) {
  const { id } = await params;
  const truck = await FoodTruckService.getTruckById(id);

  if (!truck) {
    notFound();
  }

  return <FoodTruckDetail truck={truck} />;
}