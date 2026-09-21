import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Called by a Sanity webhook (sanity.io/manage -> project -> API -> Webhooks)
// on document create/update/delete. Configure the webhook URL as:
//   https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
// Purging the root layout invalidates every statically generated page,
// so all slug pages regenerate on their next visit after a Studio change.
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 500 },
    );
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  revalidateTag("sanity", "max");
  revalidatePath("/", "layout");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
