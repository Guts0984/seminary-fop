// Rounds the current time down to 15-minute buckets so GROQ queries using
// $now produce a stable cache key instead of a unique URL per request.
export function nowBucket(): string {
  return new Date(Math.floor(Date.now() / 900_000) * 900_000).toISOString();
}
