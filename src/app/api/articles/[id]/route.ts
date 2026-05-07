import { NextResponse } from "next/server";
import { withDB } from "@/utils/db";
import { normalizeRowToArticle } from "../_normalize";

export const revalidate = 3600;

const OUTLET_ID = 1;

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (!Number.isFinite(id)) {
      return NextResponse.json({ data: { article: null } }, { status: 400 });
    }

    const row = await withDB(async (conn) => {
      const [rows] = (await conn.query(
        "SELECT * FROM article_data WHERE id = ? AND outlet_id = ? AND deleted_at IS NULL LIMIT 1",
        [id, OUTLET_ID]
      )) as any;
      return rows?.[0] || null;
    });

    const article = normalizeRowToArticle(row);
    return NextResponse.json({ data: { article } });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

