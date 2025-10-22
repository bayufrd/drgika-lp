"use client";

import React, { useState, useEffect, useRef, MouseEvent } from "react";
import FlexSection from "./FlexSection";
import Image from "next/image";
import { LuSearch, LuX } from "react-icons/lu";
// Removed framer-motion to disable animations on tab/pagination changes
import Data from "public/data/data.json";

// Hook untuk deteksi mobile/desktop
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

interface PicturesItem {
  id: string;
  title: string;
  description: string;
  largeImage: string;
  smallImage: string;
  category: string;
}

const Pictures: React.FC = () => {
  const { pictures } = Data;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<PicturesItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  // Cek apakah mobile (<= 768px)
  const isMobile = useMediaQuery("(max-width: 768px)");
  const imagesPerPage = isMobile ? 2 : 4;

  // Filter gambar
  const filteredPictures = selectedCategory
    ? pictures.items.filter((item) => item.category === selectedCategory)
    : pictures.items;

  // Hitung pagination
  const totalPages = Math.ceil(filteredPictures.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentPictures = filteredPictures.slice(
    startIndex,
    startIndex + imagesPerPage
  );

  // Reset halaman kalau ganti kategori
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, isMobile]);

  // play modal video when opened, pause when closed or switched
  useEffect(() => {
    if (selectedImage && selectedImage.largeImage && selectedImage.largeImage.toLowerCase().endsWith('.mp4')) {
      const vid = modalVideoRef.current;
      if (vid) {
        // try to play; if browser blocks autoplay with sound, user can use controls
        const playPromise = vid.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.catch(() => {
            // ignore play errors (autoplay blocked) - user can click play
          });
        }
      }
    } else {
      // pause any existing modal video
      const vid = modalVideoRef.current;
      if (vid) {
        try {
          vid.pause();
          vid.currentTime = 0;
        } catch (e) {
          // ignore
        }
      }
    }
    // cleanup when unmount
    return () => {
      const vid = modalVideoRef.current;
      if (vid) {
        try {
          vid.pause();
        } catch (e) {}
      }
    };
  }, [selectedImage]);

  const handleImageSelect = (item: any) => {
    const formattedItem: PicturesItem = {
      id: item.id || "default-id",
      title: item.title || "",
      description: item.description || "",
      largeImage: item.largeImage || item.smallImage || "",
      smallImage: item.smallImage || "",
      category: item.category || "",
    };
    setSelectedImage(formattedItem);
  };

  return (
    <FlexSection
      sectionClassName="py-16 bg-gradient-to-br from-pink-50 to-white"
      id="galeri"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            {pictures.mainTitle.text}{" "}
            <span className="text-pink-500">{pictures.mainTitle.highlight}</span>
          </h2>
          <p className="text-xl text-gray-600 mt-4">{pictures.subtitle}</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center space-x-4 mb-12">
          {pictures.categories.map((category) => (
            <button
              key={category.value || "all"}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category.value
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 text-pink-600 hover:bg-pink-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentPictures.map((item) => (
            <div
              key={item.id || "default-id"}
              className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
              onClick={() => handleImageSelect(item)}
            >
                {item.smallImage && item.smallImage.toLowerCase().endsWith('.mp4') ? (
                  <video
                    src={item.smallImage}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    muted
                    autoPlay
                    preload="metadata"
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.smallImage}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <LuSearch className="mx-auto w-10 h-10 text-white" />
                  </div>
                </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            {/* Mobile: show compact current/total with prev/next */}
            {isMobile ? (
              <div className="flex items-center justify-center space-x-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200 disabled:opacity-50`}
                >
                  Prev
                </button>
                <div className="px-4 py-1 rounded-md bg-white text-pink-600 border border-gray-200">
                  {currentPage}/{totalPages}
                </div>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md bg-pink-100 text-pink-600 hover:bg-pink-200 disabled:opacity-50`}
                >
                  Next
                </button>
              </div>
            ) : (
              /* Desktop: condensed pagination with ellipses */
              <div className="flex items-center justify-center space-x-2">
                {/** Build page items with ellipses **/}
                {(() => {
                  const items: Array<number | string> = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) items.push(i);
                  } else {
                    // always show first 2
                    items.push(1, 2);
                    // left ellipsis
                    if (currentPage > 4) items.push("left-ellipsis");
                    // middle window
                    const start = Math.max(3, currentPage - 1);
                    const end = Math.min(totalPages - 2, currentPage + 1);
                    for (let i = start; i <= end; i++) items.push(i);
                    // right ellipsis
                    if (currentPage < totalPages - 3) items.push("right-ellipsis");
                    // always show last 2
                    items.push(totalPages - 1, totalPages);
                  }

                  return items.map((it, idx) => {
                    if (typeof it === "string") {
                      return (
                        <span key={it + idx} className="px-3 py-1 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    const page = it as number;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === page
                            ? "bg-pink-500 text-white"
                            : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="max-w-4xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e: MouseEvent) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] flex items-center justify-center bg-gray-300">
                {selectedImage.largeImage && selectedImage.largeImage.toLowerCase().endsWith('.mp4') ? (
                  <video
                    ref={modalVideoRef}
                    src={selectedImage.largeImage}
                    width={1200}
                    height={800}
                    className="max-w-full max-h-full object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <Image
                    src={selectedImage.largeImage}
                    alt={selectedImage.title}
                    width={1200}
                    height={800}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    onError={(e) => {
                      const imgElement = e.currentTarget;
                      imgElement.style.display = "none";
                      imgElement.parentElement?.classList.add("bg-gray-300");
                    }}
                    loading="lazy"
                  />
                )}
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
                <p className="text-gray-600">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 bg-pink-50 p-8 rounded-lg shadow-md text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {pictures.footer.title.text}{" "}
            <span className="text-pink-500">{pictures.footer.title.highlight}</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {pictures.footer.description}
          </p>
        </div>
      </div>
    </FlexSection>
  );
};

export default Pictures;
