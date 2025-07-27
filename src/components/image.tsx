"use client";

import React, { useState } from "react";

// Define props interface
interface ImageProps {
  title: string;
  largeImage: string;
  smallImage: string;
  loading?: "lazy" | "eager";
  className?: string;
}

export const Image: React.FC<ImageProps> = ({ 
  title, 
  largeImage, 
  smallImage, 
  loading = "lazy",
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <img 
      src={smallImage} 
      alt={title} 
      className={`w-full h-full object-cover ${className}`}
      loading={loading}
    />
  );
};