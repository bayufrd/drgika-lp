import { NextResponse } from "next/server";

export const revalidate = 21600;

type PlaceDetailsResponse = {
  result?: {
    name?: string;
    url?: string;
    rating?: number;
    user_ratings_total?: number;
    reviews?: Array<{
      author_name?: string;
      profile_photo_url?: string;
      rating?: number;
      relative_time_description?: string;
      text?: string;
    }>;
  };
  status?: string;
  error_message?: string;
};

export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: "Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID" },
      { status: 501 }
    );
  }

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "name,url,rating,user_ratings_total,reviews");
  url.searchParams.set("language", "id");
  url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { next: { revalidate } });
  const data = (await res.json()) as PlaceDetailsResponse;

  if (!res.ok || data.status !== "OK") {
    return NextResponse.json(
      { error: data.error_message || data.status || "Failed to fetch reviews" },
      { status: 502 }
    );
  }

  const result = data.result || {};

  return NextResponse.json({
    name: result.name || "",
    url: result.url || "",
    rating: result.rating || 0,
    total: result.user_ratings_total || 0,
    reviews: (result.reviews || []).slice(0, 5).map((r) => ({
      author: r.author_name || "",
      avatar: r.profile_photo_url || "",
      rating: r.rating || 0,
      time: r.relative_time_description || "",
      text: r.text || "",
    })),
  });
}

