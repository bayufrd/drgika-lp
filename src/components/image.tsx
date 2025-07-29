"use client";

import React, { useState } from "react";

// Define props interface
interface ImageProps {
  title: string;
  largeImage: string;
  smallImage: string;
  loading?: "lazy" | "eager";
  className?: string;
  width?: number;
  height?: number;
}

export const Image: React.FC<ImageProps> = ({ 
  title, 
  largeImage, 
  smallImage, 
  loading = "lazy",
  className = "",
  width = 300,  // Default width
  height = 200  // Default height
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <img 
      src={smallImage} 
      alt={title} 
      width={width}
      height={height}
      className={`w-full h-full object-cover ${className}`}
      loading={loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};