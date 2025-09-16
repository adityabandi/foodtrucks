import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoodTruck Finder - Discover the Best Food Trucks in America",
  description: "Find amazing food trucks across the United States. Search by city, cuisine, and price range. Discover local mobile dining experiences with detailed reviews and information.",
  keywords: "food trucks, mobile food, street food, food truck directory, local dining, food truck finder, mobile kitchen, food truck reviews",
  authors: [{ name: "FoodTruck Finder Team" }],
  creator: "FoodTruck Finder",
  publisher: "FoodTruck Finder",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://foodtruckfinder.com',
    siteName: 'FoodTruck Finder',
    title: 'FoodTruck Finder - Discover the Best Food Trucks in America',
    description: 'Find amazing food trucks across the United States. Search by city, cuisine, and price range.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FoodTruck Finder - Find the Best Food Trucks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodTruck Finder - Discover the Best Food Trucks in America',
    description: 'Find amazing food trucks across the United States. Search by city, cuisine, and price range.',
    images: ['/og-image.jpg'],
    creator: '@foodtruckfinder',
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://foodtruckfinder.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
