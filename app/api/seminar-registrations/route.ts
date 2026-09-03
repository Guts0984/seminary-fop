import { db } from "@/db";
import { auth } from "@/lib/auth";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { registrationTable } from "@/db/schema";

async function requireAdmin(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  const user = session?.user;
  if (!user) return { user: null, status: 401 as const };
  if (user.role !== "admin") return { user: null, status: 403 as const };
  return { user, status: 200 as const };
}

const seminarsByIdsQuery = defineQuery(`
  *[_type == "seminar" && _id in $ids] {
    _id,
    title,
    "availableTypes": type
  }
`);

export async function GET(req: NextRequest) {
  const { user, status } = await requireAdmin(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status });
  }

  const registrations = await db
    .select()
    .from(registrationTable)
    .orderBy(registrationTable.createdAt);

  const seminarIds = [...new Set(registrations.map((r) => r.seminarId))];

  const seminars = seminarIds.length
    ? await client.fetch(seminarsByIdsQuery, { ids: seminarIds })
    : [];

  const seminarsById = new Map(seminars.map((s) => [s._id, s]));

  const enriched = registrations.map((r) => ({
    ...r,
    seminar: seminarsById.get(r.seminarId) ?? null,
  }));

  return NextResponse.json(enriched);
}

export async function DELETE(req: NextRequest) {
  const { user, status } = await requireAdmin(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await db.delete(registrationTable).where(eq(registrationTable.id, id));

  return NextResponse.json({ success: true });
}
