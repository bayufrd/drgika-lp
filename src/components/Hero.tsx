'use client';
import { useCallback } from 'react';
import FlexSection from "./FlexSection";
import Image from "next/image";
import heroImage from "../assets/hero.svg";
import Link from 'next/link';
import { LuClock, LuPlus } from "react-icons/lu";
import { FaHeartPulse } from "react-icons/fa6";

const useSmoothScroll = () => {
	const scrollToSection = useCallback((sectionId: string) => {
		const section = document.querySelector(sectionId);

		if (section) {
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}, []);

	return { scrollToSection };
};

const Hero = () => {
	const { scrollToSection } = useSmoothScroll();
  
	return (
	<FlexSection
		sectionClassName="py-16 bg-gradient-to-br from-pink-100 to-white relative"
		className="min-h-screen flex items-center justify-center"
		id="pagetop"
	>
		<div className="container pt-24 py-16">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="page-top">
				<div className="space-y-6 text-center lg:text-left">
					<h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-800 drop-shadow-md">
						Senyum <span className="text-pink-500">Kece</span>, Gigi Sehat
						<br className="hidden md:block" /> Tanpa Ribet!
					</h1>
					<p className="text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
						Klinik gigi masa kini yang bikin kamu nyaman. Perawatan professional,
						suasana santai, dan Dokter kekinian!
					</p>

					{/* Jadwal Praktek */}
					<div className="bg-white rounded-lg shadow-md p-4 mt-4 max-w-xl mx-auto lg:mx-0">
						<div className="flex items-center justify-center space-x-2 mb-3">
							<LuClock className="w-6 h-6 text-pink-500" />
							<h3 className="text-lg font-semibold text-gray-800">Jadwal Praktek</h3>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="bg-pink-50 rounded-lg p-3">
								<div className="flex items-center space-x-2 mb-2">
									<LuPlus className="w-5 h-5 text-green-500" />
									<span className="font-semibold text-gray-700">Praktek Umum</span>
								</div>
								<p className="text-sm text-gray-600">
									Senin - Jumat
									<br />
									Pagi: 09.00 - 11.00
									<br />
									Sore: 15.30 - 20.00
								</p>
							</div>

							<div className="bg-blue-50 rounded-lg p-3">
								<div className="flex items-center space-x-2 mb-2">
									<FaHeartPulse className="w-5 h-5 text-blue-500" />
									<span className="font-semibold text-gray-700">Praktek BPJS</span>
								</div>
								<p className="text-sm text-gray-600">
									Senin - Sabtu
									<br />
									Pagi: 09.00 - 11.00
									<br />
									Sore: 15.30 - 17.30
								</p>
							</div>
						</div>

						<div className="text-center mt-3 text-xs text-gray-500">
							Sabtu & Minggu: Konsultasi via tombol di bawah
						</div>
					</div>

					<div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
						<button
							onClick={() => scrollToSection('#booking')}
							className="cursor-pointer group flex items-center justify-center text-white hover:scale-105 transition-all bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-bold"
						>
							Konsultasi Sekarang
						</button>
						<button
							onClick={() => scrollToSection('#services')}
							className="cursor-pointer group flex items-center justify-center text-pink-600 hover:scale-105 transition-all border-2 border-pink-300 hover:border-pink-400 px-6 py-3 rounded-lg font-bold"
						>
							Jelajahi Layanan
						</button>
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
		</div>
    </FlexSection>
	);
  };

export default Hero;