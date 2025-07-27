import React, { useState } from "react";

// Define props interface
interface ImageProps {
  title: string;
  largeImage: string;
  smallImage: string;
  loading?: "lazy" | "eager";
}

export const Image: React.FC<ImageProps> = ({ 
  title, 
  largeImage, 
  smallImage, 
  loading = "lazy" 
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div 
      className="portfolio-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={smallImage} 
        alt={title} 
        className="img-responsive"
        loading={loading}
      />
      <div className="image-overlay">
        <h4>{title}</h4>
      </div>
    </div>
  );
};