'use client';
import { useCallback } from 'react';
import FlexSection from "./FlexSection";
import Image from "next/image";
import Link from 'next/link';
import { LuClock, LuPlus } from "react-icons/lu";
import { FaHeartPulse } from "react-icons/fa6";
import headerData from 'public/data/data.json';
import { motion, AnimatePresence } from 'framer-motion';

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

    // Safe access to nested object properties
    const hero = headerData?.hero || {};
    const heroButtons = hero?.buttons || {};
    const heroDetailSub = hero?.['detail-sub'] || {};
    const firstPractice = heroDetailSub?.first || {};
    const secondPractice = heroDetailSub?.second || {};

    return (
        <FlexSection
            sectionClassName="py-16 bg-gradient-to-br from-pink-100 to-white relative"
            className="min-h-screen flex items-center justify-center"
            id="pagetop"
        >
            <div className="container pt-24 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="page-top">
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="space-y-6 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-gray-800 drop-shadow-md">
                                {hero.title?.main || 'Senyum Kece'} <span className="text-pink-500">{hero.title?.highlight}</span>
                                <br className="hidden md:block" /> 
                                {hero.title?.subTitle || 'Tanpa Ribet!'}
                            </h1>
                            <p className="text-xl text-gray-700 max-w-xl mx-auto lg:mx-0">
                                {hero.description || ''}
                            </p>
                        </div>
                        {/* Jadwal Praktek */}
                        <div className="bg-white rounded-lg shadow-md p-4 mt-4 max-w-xl mx-auto lg:mx-0">
                            <div className="flex items-center justify-center space-x-2 mb-3">
                                <LuClock className="w-6 h-6 text-pink-500" />
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {hero.detail || 'Jadwal Praktek'}
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-pink-50 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <LuPlus className="w-5 h-5 text-green-500" />
                                        <span className="font-semibold text-gray-700">
                                            {firstPractice.title || 'Praktek UMUM'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {firstPractice.day || 'Senin - Jumat'}
                                        <br />
                                        {firstPractice.time || '09.00 - 11.00'}
                                        <br />
                                        {firstPractice.time2 || '15.00 - 20.00'}
                                        <br />
                                        {firstPractice.time3 || '15.00 - 20.00'}
                                    </p>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-3">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <FaHeartPulse className="w-5 h-5 text-blue-500" />
                                        <span className="font-semibold text-gray-700">
                                            {secondPractice.title || 'Praktek BPJS'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {secondPractice.day || 'Senin - Sabtu'}
                                        <br />
                                        {secondPractice.time || '09.00 - 11.00'}
                                        <br />
                                        {secondPractice.time2 || '15.30 - 17.30'}
                                        <br />
                                        {firstPractice.time3 || '15.00 - 20.00'}
                                    </p>
                                </div>
                            </div>

                            <div className="text-center mt-3 text-xs text-gray-500">
                                {heroDetailSub['add-ons'] || 'Sabtu & Minggu: Konsultasi via tombol di bawah'}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
                            <button
                                onClick={() => scrollToSection(heroButtons.primary?.link || '#booking')}
                                className="cursor-pointer group flex items-center justify-center text-white hover:scale-105 transition-all bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-bold"
                            >
                                {heroButtons.primary?.text || 'Konsultasi Sekarang'}
                            </button>
                            <button
                                onClick={() => scrollToSection(heroButtons.secondary?.link || '#services')}
                                className="cursor-pointer group flex items-center justify-center text-pink-600 hover:scale-105 transition-all border-2 border-pink-300 hover:border-pink-400 px-6 py-3 rounded-lg font-bold"
                            >
                                {heroButtons.secondary?.text || 'Jelajahi Layanan'}
                            </button>
                        </div>
                    </motion.div>
                    <div className="hidden lg:flex justify-center items-center relative w-full max-w-md h-[300px]">
                        <Image
                            src={hero.heroImage || '/images/hero.svg'}
                            alt={hero.heroImageAlt || 'Ilustrasi Perawatan Gigi Modern'}
                            fill
                            className="animate-float"
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </div>
        </FlexSection>
    );
};

export default Hero;