import { NextResponse } from "next/server";
import { withDB } from "@/utils/db";
import { normalizeRowToArticle } from "./_normalize";

export const revalidate = 3600;

const OUTLET_ID = 1;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.max(
      1,
      Math.min(100, parseInt(url.searchParams.get("limit") || "4", 10))
    );
    const offset = (page - 1) * limit;

    const result = await withDB(async (conn) => {
      const [[{ total }]] = (await conn.query(
        "SELECT COUNT(*) as total FROM article_data WHERE deleted_at IS NULL AND outlet_id = ?",
        [OUTLET_ID]
      )) as any;
      const [rows] = (await conn.query(
        "SELECT * FROM article_data WHERE deleted_at IS NULL AND outlet_id = ? ORDER BY id DESC LIMIT ? OFFSET ?",
        [OUTLET_ID, limit, offset]
      )) as any;
      return { total: total || 0, rows: rows || [] };
    });

    const articles = (result.rows || [])
      .map(normalizeRowToArticle)
      .filter(Boolean);

    return NextResponse.json({
      data: { articles, meta: { page, limit, total: result.total } },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

