import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const g = globalThis as unknown as {
  pool: Pool | undefined;
};

function createPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Check your .env.local");
  }

  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
    keepAlive: true,
    keepAliveInitialDelayMillis: 10_000,
    // enable only on Besthosting production via env var
    ssl:
      process.env.DATABASE_SSL === "true"
        ? { rejectUnauthorized: false }
        : false,
  });
}

const pool = g.pool ?? createPool();

// cache pool across hot reloads in dev
if (process.env.NODE_ENV !== "production") {
  g.pool = pool;
}

pool.on("error", (err) => {
  console.error("[DB] Pool error:", err.message);
});

export const db = drizzle(pool, { schema });
export { pool };

//docker exec -it seminary-fop-postgres-1 psql -U user -d seminars-db
