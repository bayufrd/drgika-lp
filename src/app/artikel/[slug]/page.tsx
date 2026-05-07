import ArticleDetail from "@/components/article/ArticleDetail";
import { getArticleById } from "../_data";

export const revalidate = 3600;

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug || "";
  const maybeId = slug.split("-").pop() || "";
  const article = await getArticleById(Number(maybeId));
  return (
    <main>
      <ArticleDetail article={article} />
    </main>
  );
}
