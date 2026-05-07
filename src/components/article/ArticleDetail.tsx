"use client";

import React, { useEffect, useState } from "react";
import { ImgLoader } from "@/components/ui/ImgLoader";
import type { Article as NormalizedArticle } from "@/app/api/articles/_normalize";

type Article = NormalizedArticle & { body?: string };

export default function ArticleDetail({ article }: { article: Article | null }) {
  useEffect(() => {
    document.title = article?.title ? `${article.title} - Artikel` : "Artikel";
  }, [article?.title]);

  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [latestMeta, setLatestMeta] = useState({ page: 1, limit: 4, total: 0 });
  const [latestLoading, setLatestLoading] = useState(false);

  useEffect(() => {
    if (!article) return;
    fetchLatestArticles(1);
  }, [article]);

  async function fetchLatestArticles(page: number) {
    setLatestLoading(true);
    try {
      const res = await fetch(`/api/articles?page=${page}&limit=4`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch latest articles");
      const json = await res.json();
      setLatestArticles(json.data?.articles || []);
      setLatestMeta(json.data?.meta || { page: 1, limit: 4, total: 0 });
    } catch {
      setLatestArticles([]);
    } finally {
      setLatestLoading(false);
    }
  }

  const latestTotalPages = Math.max(
    1,
    Math.ceil((latestMeta.total || 0) / (latestMeta.limit || 4))
  );

  if (!article) return <div className="container mx-auto p-6">Artikel tidak ditemukan.</div>;

  return (
    <>
      <div className="relative min-h-screen bg-gray-50">
        {article.imageurl ? (
          <div
            className="w-full bg-center bg-cover z-0"
            style={{
              height: "80vh",
              backgroundImage: `url(${article.imageurl})`,
              filter: "brightness(0.7)",
              position: "relative",
            }}
          />
        ) : null}
        <div className="relative z-10 flex flex-col items-center justify-center" style={{ marginTop: "-16vh" }}>
          <div className="w-full max-w-6xl px-2 md:px-4 lg:px-8">
            <div className="bg-white/80 backdrop-blur border border-gray-200 rounded-xl shadow-lg p-4 md:p-8 lg:p-10">
              {article.title ? (
                <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center drop-shadow-lg">
                  {article.title}
                </h1>
              ) : null}

              <div className="quill-preview min-h-[120px] mb-6 text-gray-800">
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.bodyContent?.html || article.body || "",
                  }}
                />
              </div>

              {article.imageurl ? (
                <div className="w-full flex justify-center mb-4">
                  <ImgLoader
                    src={article.imageurl}
                    alt={article.title || "Artikel"}
                    className="rounded-xl object-cover w-full h-auto"
                    style={{ maxHeight: "420px", width: "100%", objectFit: "cover" }}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "/assets/company/no-image.png";
                    }}
                  />
                </div>
              ) : null}
              <div className="flex items-center justify-between mt-6">
                <span className="text-sm text-gray-500">
                  By {article.author || "Admin"}
                </span>
                <span className="text-xs text-gray-400">
                  &copy;{" "}
                  {new Date().toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Artikel Terbaru !</h2>
        {latestLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(latestMeta.limit || 4)].map((_, i) => (
              <div key={i} className="border rounded-lg p-3 animate-pulse bg-white">
                <div className="w-full h-24 bg-gray-200 rounded mb-2" />
                <div className="h-5 bg-gray-200 rounded mb-1 w-2/3" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : latestArticles.length === 0 ? (
          <div className="text-sm text-gray-500">Tidak ada artikel terbaru.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {latestArticles.map((a) => (
              <div key={a.id} className="border rounded-lg p-3 bg-white flex flex-col">
                <a
                  href={`/artikel/${encodeURIComponent(
                    (a.title || "artikel").replace(/\s+/g, "-").toLowerCase()
                  )}-${a.id}`}
                  className="block"
                >
                  {a.imageurl ? (
                    <ImgLoader
                      src={a.imageurl}
                      alt={a.title || "Artikel"}
                      className="w-full h-24 object-cover rounded mb-2"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/assets/company/no-image.png";
                      }}
                    />
                  ) : null}
                  <h3 className="text-base font-semibold mb-1 truncate">{a.title}</h3>
                  <p className="text-xs text-gray-500 truncate">By {a.author || "Admin"}</p>
                </a>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => fetchLatestArticles(latestMeta.page - 1)}
            disabled={latestMeta.page <= 1 || latestLoading}
            className="px-2 py-1 border rounded bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            &lt;
          </button>
          <span className="text-sm">
            {latestMeta.page} / {latestTotalPages}
          </span>
          <button
            onClick={() => fetchLatestArticles(latestMeta.page + 1)}
            disabled={latestMeta.page >= latestTotalPages || latestLoading}
            className="px-2 py-1 border rounded bg-white text-gray-700 hover:bg-gray-100 transition"
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}
