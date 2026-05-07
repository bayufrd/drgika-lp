import ArticleList from "@/components/article/ArticleList";
import { getArticles } from "./_data";

export const revalidate = 3600;

export default async function Page() {
  const result = await getArticles(1, 4);
  return (
    <main>
      <ArticleList
        initialArticles={result.articles}
        initialMeta={result.meta}
      />
    </main>
  );
}
