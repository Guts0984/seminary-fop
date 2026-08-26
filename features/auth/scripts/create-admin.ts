import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// Set environment variables BEFORE importing `@/lib/auth`
process.env.DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://user:password@localhost:5432/seminars-db";

async function main() {
  // Dynamically load auth AFTER setting process.env
  const { auth } = await import("@/lib/auth");

  console.log("Using Database URL:", process.env.DATABASE_URL);

  const admin = await auth.api.signUpEmail({
    body: {
      email: "mediumrare1298@gmail.com",
      password: "qwerty2288",
      name: "Admin",
    },
  });

  console.log("✅ Admin user created successfully:", admin);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Failed to create admin:", err);
  process.exit(1);
});
