import { withDB } from "@/utils/db";
import { normalizeRowToArticle } from "@/app/api/articles/_normalize";

const OUTLET_ID = 1;

export async function getArticles(page: number, limit: number) {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, Math.min(100, limit));
  const offset = (safePage - 1) * safeLimit;

  const result = await withDB(async (conn) => {
    const [[{ total }]] = (await conn.query(
      "SELECT COUNT(*) as total FROM article_data WHERE deleted_at IS NULL AND outlet_id = ?",
      [OUTLET_ID]
    )) as any;
    const [rows] = (await conn.query(
      "SELECT * FROM article_data WHERE deleted_at IS NULL AND outlet_id = ? ORDER BY id DESC LIMIT ? OFFSET ?",
      [OUTLET_ID, safeLimit, offset]
    )) as any;
    return { total: total || 0, rows: rows || [] };
  });

  return {
    articles: (result.rows || []).map(normalizeRowToArticle).filter(Boolean),
    meta: { page: safePage, limit: safeLimit, total: result.total },
  };
}

export async function getArticleById(id: number) {
  if (!Number.isFinite(id)) return null;
  const row = await withDB(async (conn) => {
    const [rows] = (await conn.query(
      "SELECT * FROM article_data WHERE id = ? AND outlet_id = ? AND deleted_at IS NULL LIMIT 1",
      [id, OUTLET_ID]
    )) as any;
    return rows?.[0] || null;
  });
  return normalizeRowToArticle(row);
}

