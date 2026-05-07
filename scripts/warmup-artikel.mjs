const baseUrl = process.env.WARMUP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const concurrency = Math.max(1, Number(process.env.WARMUP_CONCURRENCY || 4));
const limit = Math.max(1, Math.min(100, Number(process.env.WARMUP_LIMIT || 100)));

function slugify(title) {
  return String(title || "artikel")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .toLowerCase();
}

async function fetchJson(path) {
  const url = new URL(path, baseUrl).toString();
  const res = await fetch(url, { headers: { "user-agent": "drgika-lp-warmup" } });
  if (!res.ok) throw new Error(`Request failed ${res.status} ${url}`);
  return res.json();
}

async function warmPath(path) {
  const url = new URL(path, baseUrl).toString();
  const res = await fetch(url, { headers: { "user-agent": "drgika-lp-warmup" } });
  if (!res.ok) throw new Error(`Warmup failed ${res.status} ${url}`);
}

async function getAllArticles() {
  let page = 1;
  const out = [];
  while (true) {
    const json = await fetchJson(`/api/articles?page=${page}&limit=${limit}`);
    const articles = json?.data?.articles || [];
    const meta = json?.data?.meta || { page, limit, total: out.length };
    out.push(...articles);
    const total = Number(meta.total || 0);
    if (out.length >= total || articles.length === 0) break;
    page += 1;
  }
  return out;
}

async function runPool(items, worker) {
  let idx = 0;
  const results = [];
  const runners = Array.from({ length: concurrency }).map(async () => {
    while (idx < items.length) {
      const current = items[idx++];
      results.push(await worker(current));
    }
  });
  await Promise.all(runners);
  return results;
}

async function main() {
  console.log(`[warmup] baseUrl=${baseUrl}`);
  console.log(`[warmup] concurrency=${concurrency} limit=${limit}`);

  await warmPath("/artikel");

  const articles = await getAllArticles();
  console.log(`[warmup] articles=${articles.length}`);

  const paths = articles
    .filter((a) => a && a.id)
    .map((a) => `/artikel/${encodeURIComponent(slugify(a.title))}-${a.id}`);

  let ok = 0;
  let fail = 0;
  await runPool(paths, async (p) => {
    try {
      await warmPath(p);
      ok += 1;
    } catch (e) {
      fail += 1;
      console.error(String(e?.message || e));
    }
  });

  console.log(`[warmup] ok=${ok} fail=${fail}`);
  if (fail > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

