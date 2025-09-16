import { MetadataRoute } from 'next';
import { FoodTruckService, generateSlug } from '@/lib/foodTruckService';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adityabandi.github.io/foodtrucks';
  
  const trucks = FoodTruckService.getAllTrucks();
  const cities = FoodTruckService.getCities();
  
  // Base pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // Food truck pages
  trucks.forEach((truck) => {
    routes.push({
      url: `${baseUrl}/truck/${truck.id}`,
      lastModified: new Date(truck.lastUpdated),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // City pages
  cities.forEach((city) => {
    routes.push({
      url: `${baseUrl}/city/${generateSlug(city.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return routes;
}