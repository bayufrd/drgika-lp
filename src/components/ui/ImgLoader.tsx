"use client";

import React, { useState } from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
};

export function ImgLoader({ src, alt, className, ...props }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-accent" />
        </div>
      ) : null}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={(e) => {
          setLoading(false);
          props.onLoad?.(e);
        }}
        {...props}
      />
    </div>
  );
}

