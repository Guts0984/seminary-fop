import { drizzle } from "drizzle-orm/node-postgres";

// 1. Grab the global execution context
const g = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined;
};

// 2. Reuse the existing database instance if it exists, otherwise create a new one
export const db = g.db || drizzle(process.env.DATABASE_URL!);

// 3. In development, save the instance to global memory so it survives HMR saves
if (process.env.NODE_ENV !== "production") {
  g.db = db;
}

//docker exec -it seminary-db psql -U postgres -d seminary-db
