// app/api/newsletter-subscribers/route.ts
import { db } from "@/db";
import { newsletterSubscribersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

async function requireSession(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  return session?.user ?? null;
}

export async function GET(req: NextRequest) {
  const user = await requireSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const subscribers = await db
    .select()
    .from(newsletterSubscribersTable)
    .orderBy(newsletterSubscribersTable.id);

  return NextResponse.json(subscribers);
}

export async function DELETE(req: NextRequest) {
  const user = await requireSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await db
    .delete(newsletterSubscribersTable)
    .where(eq(newsletterSubscribersTable.id, id));

  return NextResponse.json({ success: true });
}
