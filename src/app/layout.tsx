import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://adityabandi.github.io/foodtrucks'),
  title: "Diner Wheels - Discover the Best Mobile Diners in America",
  description: "Find amazing mobile diners and food trucks across the United States and worldwide. Search by city, cuisine, and price range. Discover authentic dining experiences with detailed reviews and information.",
  keywords: "food trucks, mobile diners, street food, food truck directory, local dining, mobile kitchen, food truck reviews, diner wheels, american diners",
  authors: [{ name: "Diner Wheels Team" }],
  creator: "Diner Wheels",
  publisher: "Diner Wheels",
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
    url: 'https://adityabandi.github.io/foodtrucks',
    siteName: 'Diner Wheels',
    title: 'Diner Wheels - Discover the Best Mobile Diners in America',
    description: 'Find amazing mobile diners and food trucks across the United States and worldwide. Search by city, cuisine, and price range.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Diner Wheels - Find the Best Mobile Diners',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diner Wheels - Discover the Best Mobile Diners in America',
    description: 'Find amazing mobile diners and food trucks across the United States and worldwide. Search by city, cuisine, and price range.',
    images: ['/og-image.jpg'],
    creator: '@dinerwheels',
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://adityabandi.github.io/foodtrucks',
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
