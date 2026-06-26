import { seminarTable } from "@/features/seminars/schemas/seminarTable";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { InsertSeminarType } from "./schemas/seminarTable";

export const DUMMY_SEMINARS: InsertSeminarType[] = [
  {
    title: "Tax Optimization Strategies for Ukrainian LLCs in 2026",
    type: ["seminar"],
    status: "upcoming",
    eventDate: new Date("2026-07-15T10:00:00Z"),
    speakers: ["Olena Kravchenko (Senior Tax Consultant)"],
    price: 1200,
    location: "Kyiv, Premier Palace Hotel",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&auto=format&fit=crop&q=60",
    category: ["Finance"],
    slug: "tax-optimization-strategies-for-ukrainian-llcs-in-2026",
  },
  {
    title: "AI Integration in Digital Marketing: Practical Case Studies",
    type: ["webinar"],
    status: "upcoming",
    eventDate: new Date("2026-06-28T14:00:00Z"),
    speakers: ["Dmytro Kovalenko (Head of Growth at TechUA)"],
    price: 0,
    thumbnail:
      "https://images.unsplash.com/photo-1591115765373-5209765f710b?w=500&auto=format&fit=crop&q=60",
    category: ["Marketing"],
    slug: "ai-integration-in-digital-marketing-practical-case-studies",
  },
  {
    title: "Labor Law Reforms 2026: What HR Managers Need to Know",
    type: ["seminar"],
    status: "upcoming",
    eventDate: new Date("2026-08-05T09:30:00Z"),
    speakers: ["Ihor Shevchenko (Partner at LexPartners)"],
    price: 1500,
    location: "Lviv, Bank Hotel Conference Hall",
    thumbnail:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&auto=format&fit=crop&q=60",
    category: ["Law"],
    slug: "labor-law-reforms-2026-what-hr-managers-need-to-know",
  },
  {
    title: "How to Scale Your E-commerce Business Internationally",
    type: ["webinar"],
    status: "upcoming",
    eventDate: new Date("2026-07-02T16:00:00Z"),
    speakers: ["Anna Morozova (Founder of GlobalTrade)"],
    price: 450,
    thumbnail:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=500&auto=format&fit=crop&q=60",
    category: ["Business Management"],
    slug: "how-to-scale-your-e-commerce-business-internationally",
  },
  {
    title: "Advanced QuickBooks Frameworks for Financial Analysts",
    type: ["webinar"],
    status: "past",
    eventDate: new Date("2026-05-12T11:00:00Z"),
    speakers: ["Serhiy Tkachuk (Audit Lead)"],
    price: 800,
    thumbnail:
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=500&auto=format&fit=crop&q=60",
    category: ["Finance"],
    slug: "advanced-quickbooks-frameworks-for-financial-analysts",
  },
  {
    title: "Crisis Management & Leadership Workshop",
    type: ["seminar", "recording"], // Example of handling both types at once!
    status: "past",
    eventDate: new Date("2026-04-20T10:00:00Z"),
    speakers: ["Vitaliy Reznik (Business Coach)"],
    price: 2500,
    location: "Odesa, Bristol Hotel",
    thumbnail:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60",
    category: ["Business Management"],
    slug: "crisis-management-and-leadership-workshop",
  },
];

async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });
  const seedDb = drizzle({ client: pool });
  try {
    console.log("Seeding data...");
    await seedDb.insert(seminarTable).values(DUMMY_SEMINARS);
    console.log("Seeding complete successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await pool.end();
  }
}

seed();
