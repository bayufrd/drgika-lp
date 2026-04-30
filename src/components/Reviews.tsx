"use client";

import { useEffect, useState } from "react";
import FlexSection from "./FlexSection";

type Review = {
  author: string;
  avatar: string;
  rating: number;
  time: string;
  text: string;
};

type ReviewsPayload = {
  name: string;
  url: string;
  rating: number;
  total: number;
  reviews: Review[];
};

const Stars = ({ value }: { value: number }) => {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} dari 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-yellow-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [data, setData] = useState<ReviewsPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/reviews")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!cancelled && json && !json.error) setData(json as ReviewsPayload);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;

  return (
    <FlexSection sectionClassName="py-16 bg-white" id="ulasan">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Ulasan <span className="text-pink-500">Pasien</span>
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3 text-gray-700">
            <Stars value={data.rating} />
            <span className="font-semibold">{data.rating.toFixed(1)}/5</span>
            <span className="text-gray-500">({data.total.toLocaleString("id-ID")})</span>
          </div>
          {data.url ? (
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm text-pink-600 hover:text-pink-700 hover:underline"
            >
              Lihat di Google
            </a>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.reviews.map((r, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {r.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.avatar}
                    alt={r.author ? `Foto ${r.author}` : "Foto reviewer"}
                    className="h-10 w-10 rounded-full object-cover"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-pink-100" />
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-gray-800 truncate">{r.author}</div>
                  <div className="text-xs text-gray-500">{r.time}</div>
                </div>
              </div>
              <div className="mt-3">
                <Stars value={r.rating} />
              </div>
              {r.text ? (
                <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-5">
                  {r.text}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </FlexSection>
  );
};

export default Reviews;

