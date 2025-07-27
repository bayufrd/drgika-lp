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
  title: 'Drg. Ika Kiromin - Praktik Dokter Gigi Profesional',
  description: 'Praktik dokter gigi profesional Drg. Ika Kiromin. Menyediakan layanan kesehatan gigi terpercaya, perawatan berkualitas, dan solusi kesehatan gigi modern untuk seluruh keluarga.',
  keywords: [
    'dokter gigi',
    'praktik gigi',
    'perawatan gigi',
    'kesehatan gigi',
    'dokter gigi profesional',
    'klinik gigi',
    'praktek drg. ika',
    'dokter gigi solo',
    'dokter gigi ika',
    'ika kiromin',
    'klinik solo',
    'praktek solo',
    'dokter gigi surakarta',
    'praktek dokter gigi',
    'drg. ika solo'
  ],
  openGraph: {
    title: 'Drg. Ika Kiromin - Praktik Dokter Gigi',
    description: 'Praktik dokter gigi profesional dengan layanan komprehensif dan perawatan berkualitas.',
    type: 'website',
    locale: 'id_ID',
    // Optional: Add your website's URL
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
  // Optional: Add verification for webmaster tools
  verification: {
    google: 'your-google-site-verification-code', // Optional
  },
  // Optional: Add alternate language versions if applicable
  alternates: {
    canonical: 'https://.drg.ikakiromin.com',
  },
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
