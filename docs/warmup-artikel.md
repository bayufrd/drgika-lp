# Warm-up ISR Artikel

## Jalankan
1) Pastikan app running (`npm run dev` / `npm run start`)
2) Warm-up:
- `npm run warmup:artikel`

## Env (opsional)
- `WARMUP_BASE_URL=http://localhost:3000`
- `WARMUP_CONCURRENCY=4`
- `WARMUP_LIMIT=100`

## Cron contoh
- `0 * * * * cd /path/to/drgika-lp && WARMUP_BASE_URL=http://localhost:3000 npm run warmup:artikel`

