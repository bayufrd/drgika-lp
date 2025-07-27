import React from "react";
import { Image } from "./image";

// Define an interface for the gallery item data
interface GalleryItem {
  title: string;
  largeImage: string;
  smallImage: string;
}

// Define props interface
interface GalleryProps {
  data?: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = (props) => {
  return (
    <div id="galeri" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>Satu Tempat, Sejuta Cerita #SOBATJECO</p>
        </div>
        <div className="portfolio-items">
          {props.data && props.data.length > 0 ? (
            props.data.map((d, i) => (
              <Image
                key={`${d.title}-${i}`}
                title={d.title}
                largeImage={d.largeImage}
                smallImage={d.smallImage}
                loading="lazy" // Native lazy loading
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};