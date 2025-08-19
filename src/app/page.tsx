import Benefits from "@/components/Benefits";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowTo from "@/components/HowTo";
import Services from "@/components/Services";
import Pictures from "@/components/Pictures";
import { Metadata } from 'next';

export const metadata: Metadata = {
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  title: 'Drg. Ika Kiromin - Praktik Dokter Gigi Profesional di Solo & Sekitarnya',
  description: 'Praktik dokter gigi profesional Drg. Ika Kiromin di Solo, Surakarta, dan Sukoharjo. Menyediakan layanan kesehatan gigi terpercaya, perawatan berkualitas, dan solusi kesehatan gigi modern untuk seluruh keluarga.',
  keywords: [
    // Existing keywords
    'dokter gigi',
    'praktik gigi',
    'perawatan gigi',
    'kesehatan gigi',
    'dokter gigi profesional',
    'klinik gigi',

    // Localized and specific keywords
    'dokter gigi solo',
    'klinik gigi surakarta',
    'praktik dokter gigi sukoharjo',
    'drg. ika kiromin solo',
    'dokter gigi terdekat solo',
    'klinik gigi berpengalaman',
    'perawatan gigi profesional',
    'dokter gigi terpercaya',

    // Additional local SEO keywords
    'praktik dokter gigi wilayah solo',
    'layanan kesehatan gigi solo',
    'klinik gigi bersih dan modern',
    'dokter gigi berpengalaman di solo',
    'perawatan gigi komprehensif'
  ],
  openGraph: {
    title: 'Drg. Ika Kiromin - Praktik Dokter Gigi Profesional di Solo',
    description: 'Praktik dokter gigi profesional terpercaya di wilayah Solo, Surakarta, dan Sukoharjo. Perawatan berkualitas dan komprehensif untuk kesehatan gigi keluarga.',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/path/to/clinic-image.jpg', // Replace with actual image path
        width: 1200,
        height: 630,
        alt: 'Praktik Dokter Gigi Drg. Ika Kiromin di Solo'
      }
    ],
    url: 'https://drg.ikakiromin.com', // Ensure this is the correct domain
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drg. Ika Kiromin - Dokter Gigi Profesional Solo',
    description: 'Layanan kesehatan gigi profesional di Solo, Surakarta, dan Sukoharjo.',
    images: ['/path/to/clinic-image.jpg'] // Same image as OpenGraph
  },
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
  verification: {
    google: 'your-google-site-verification-code', // Optional
    // Consider adding other webmaster tool verifications if used
  },
  alternates: {
    canonical: 'https://drg.ikakiromin.com', // Confirm the exact domain
  },
  // Optional: Add local business structured data
  other: {
    'og:type': 'medical:clinic',
    'og:locale:alternate': ['en_US', 'id_ID'],
  }
};
const Home = () => (
  <>
    <Header />
    <Hero />
    <HowTo />
    <Services />
    <Benefits />
    <Pictures />
    <Booking />
    <Footer />
  </>
);

export default Home;
