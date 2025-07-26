'use client';

import FlexSection from "./FlexSection";
import Image from "next/image";
import heroImage from "../assets/hero.svg";
import Link from 'next/link';

const Hero = () => (
	<FlexSection
		sectionClassName="py-16 bg-gradient-to-br from-pink-100 to-white"
		className="min-h-screen flex items-center justify-center"
		id="page-top"
	>
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="page-top">
			<div className="space-y-6 text-center lg:text-left">
				<h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-800 drop-shadow-md">
					Senyum <span className="text-pink-500">Kece</span>, Gigi Sehat 
					<br className="hidden md:block" /> Tanpa Ribet!
				</h1>
				<p className="text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
					Klinik gigi masa kini yang bikin kamu nyaman. Perawatan professional, 
					suasana santai, dan teknologi kekinian!
				</p>
				<div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
					<Link 
						href="#booking"
						className="cursor-pointer group flex items-center justify-center text-white hover:scale-105 transition-all bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-bold"
					>
						Konsultasi Sekarang
					</Link>
					<Link 
						href="#services"
						className="cursor-pointer group flex items-center justify-center text-pink-600 hover:scale-105 transition-all border-2 border-pink-300 hover:border-pink-400 px-6 py-3 rounded-lg font-bold"
					>
						Jelajahi Layanan
					</Link>
				</div>
			</div>
			<div className="hidden lg:flex justify-center items-center">
				<Image 
					src={heroImage} 
					alt="Ilustrasi Perawatan Gigi Modern" 
					className="w-full max-w-md animate-float"
				/>
			</div>
		</div>
	</FlexSection>
);

export default Hero;