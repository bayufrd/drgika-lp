"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ImgLoader } from "@/components/ui/ImgLoader";

type Article = {
  id: number;
  title?: string;
  author?: string;
  imageurl?: string;
  bodyContent?: { text?: string };
};

type Meta = { page: number; limit: number; total: number };

export default function ArticleList({
  initialArticles = [],
  initialMeta = { page: 1, limit: 4, total: 0 },
}: {
  initialArticles?: Article[];
  initialMeta?: Meta;
}) {
  const [articles, setArticles] = useState<Article[]>(initialArticles || []);
  const [meta, setMeta] = useState<Meta>(
    initialMeta || { page: 1, limit: 4, total: 0 }
  );
  const [loading, setLoading] = useState(false);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((meta.total || 0) / (meta.limit || 4))),
    [meta.limit, meta.total]
  );

  useEffect(() => {
    document.title = "Artikel";
  }, []);

  async function goToPage(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/articles?page=${newPage}&limit=${meta.limit}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
      const json = await res.json();
      setArticles(json.data?.articles || []);
      setMeta(json.data?.meta || meta);
    } catch (e) {
      console.error("Pagination fetch failed", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Artikel</h1>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(meta.limit || 4)].map((_, i) => (
            <div key={i} className="border rounded p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded mb-3" />
              <div className="h-6 bg-gray-200 rounded mb-2 w-2/3" />
              <div className="h-4 bg-gray-200 rounded mb-2 w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : articles.length === 0 ? (
        <div className="text-sm text-gray-500">Tidak ada artikel ditemukan.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((a) => (
            <article key={a.id} className="border rounded p-4">
              <Link
                href={`/artikel/${encodeURIComponent(
                  (a.title || "artikel").replace(/\s+/g, "-").toLowerCase()
                )}-${a.id}`}
                className="block"
              >
                {a.imageurl ? (
                  <ImgLoader
                    src={a.imageurl}
                    alt={a.title || "Artikel"}
                    className="w-full h-48 object-cover rounded mb-3"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/company/no-image.png";
                    }}
                  />
                ) : null}
                <h2 className="text-lg font-semibold mb-1">{a.title}</h2>
                <p className="text-sm text-gray-500">By {a.author || "Admin"}</p>
                <p className="mt-2 text-sm text-gray-700">
                  {a.bodyContent?.text
                    ? a.bodyContent.text.slice(0, 160) +
                      (a.bodyContent.text.length > 160 ? "..." : "")
                    : ""}
                </p>
              </Link>
            </article>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => goToPage(meta.page - 1)}
          disabled={meta.page <= 1 || loading}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <span className="text-sm">
          Page {meta.page} / {totalPages}
        </span>
        <button
          onClick={() => goToPage(meta.page + 1)}
          disabled={meta.page >= totalPages || loading}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

