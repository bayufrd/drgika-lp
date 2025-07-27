"use client";

import { useState } from 'react';
import FlexSection from "./FlexSection";
import Image from "next/image";
import { LuImagePlus, LuSearch, LuX } from "react-icons/lu";
import { motion, AnimatePresence } from 'framer-motion';

// Definisi tipe untuk item galeri
interface GalleryItem {
  id: string;
  title: string;
  description: string;
  largeImage: string;
  smallImage: string;
  category: 'sebelum' | 'sesudah' | 'proses';
}

// Contoh data galeri (bisa diganti dengan data dari backend)
const galleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Senyum Transformasi',
    description: 'Dari malu-malu jadi PD abis!',
    largeImage: '/images/gallery-1-large.jpg',
    smallImage: '/images/gallery-1-small.jpg',
    category: 'sesudah'
  },
  // Tambahkan lebih banyak item...
];

const Gallery: React.FC = () => {
  // State untuk manajemen galeri
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Filter gambar berdasarkan kategori
  const filteredGallery = selectedCategory
    ? galleryData.filter(item => item.category === selectedCategory)
    : galleryData;

  // Kategori filter
  const categories = [
    { label: 'Semua', value: null },
    { label: 'Sebelum', value: 'sebelum' },
    { label: 'Proses', value: 'proses' },
    { label: 'Sesudah', value: 'sesudah' }
  ];

  return (
    <FlexSection
      sectionClassName="py-16 bg-gradient-to-br from-pink-50 to-white"
      id="galeri"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Behind The <span className="text-pink-500">Senyum Kece</span>
          </h2>
          <p className="text-xl text-gray-600 mt-4">
            Perjalanan Kece Menuju Senyum Percaya Diri
          </p>
        </motion.div>

        {/* Kategori Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.value || 'all'}
              onClick={() => setSelectedCategory(category.value)}
              className={`
                px-4 py-2 rounded-full transition-all duration-300
                ${selectedCategory === category.value 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-pink-100 text-pink-600 hover:bg-pink-200'}
              `}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid Galeri */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredGallery.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => setSelectedImage(item)}
              >
                <Image
                  src={item.smallImage}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <LuSearch className="mx-auto w-10 h-10 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal Gambar */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Image
                  src={selectedImage.largeImage}
                  alt={selectedImage.title}
                  width={1200}
                  height={800}
                  className="w-full max-h-[70vh] object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-pink-100 transition"
                  onClick={() => setSelectedImage(null)}
                >
                  <LuX className="w-6 h-6 text-gray-700" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-gray-600">
                  {selectedImage.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-16 bg-pink-50 p-8 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Cerita <span className="text-pink-500">Di Balik Senyum</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Setiap foto adalah perjalanan transformasi. 
            Dari senyum yang kurang percaya diri hingga 
            senyum yang memukau - Drg. Ika ada di sini untuk 
            membantu Anda menemukan kepercayaan diri Anda! 💫✨
          </p>
        </div>
      </div>
    </FlexSection>
  );
};

export default Gallery;