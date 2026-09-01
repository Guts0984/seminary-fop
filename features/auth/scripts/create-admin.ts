import dotenv from "dotenv";
import path from "path";
import { eq } from "drizzle-orm";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://user:password@localhost:5432/seminars-db";

async function main() {
  const { auth } = await import("@/lib/auth");
  const { db } = await import("@/db"); // Import your Drizzle DB instance
  const { user } = await import("@/db/schema"); // Import your schema

  console.log("Using Database URL:", process.env.DATABASE_URL);

  // 1. Create the user (Better Auth assigns default role "user")
  const admin = await auth.api.signUpEmail({
    body: {
      email: "mediumrare1298@gmail.com",
      password: "qwerty2288",
      name: "Admin",
    },
  });

  // 2. Elevate to "admin" directly in the database
  await db
    .update(user)
    .set({ role: "admin" })
    .where(eq(user.email, "mediumrare1298@gmail.com"));

  console.log("✅ Admin user created and elevated successfully:", admin);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Failed to create admin:", err);
  process.exit(1);
});
