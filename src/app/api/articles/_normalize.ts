export type Article = {
  id: number | null;
  title: string;
  author: string;
  bodyContent: { html: string; text: string; raw: null; markdown: null };
  description: string;
  imageurl: string;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  documentInStages: Array<{ stage: "PUBLISHED" | "UNPUBLISHED" }>;
  stage: "PUBLISHED" | "UNPUBLISHED";
};

export function normalizeRowToArticle(row: any): Article | null {
  if (!row) return null;
  const body = row.body || "";
  const deleted = Boolean(row.deleted_at);
  return {
    id: row.id ?? null,
    title: row.title || "",
    author: row.author || "",
    bodyContent: {
      html: body,
      text: body.replace(/<[^>]+>/g, ""),
      raw: null,
      markdown: null,
    },
    description: row.description || "",
    imageurl: row.image_url || row.imageurl || "",
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null,
    deletedAt: row.deleted_at ? new Date(row.deleted_at).toISOString() : null,
    documentInStages: deleted ? [{ stage: "UNPUBLISHED" }] : [{ stage: "PUBLISHED" }],
    stage: deleted ? "UNPUBLISHED" : "PUBLISHED",
  };
}

