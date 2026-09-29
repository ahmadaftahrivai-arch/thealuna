import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { InquiryInput } from "@/lib/types";

function isValidInquiry(body: unknown): body is InquiryInput {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.property_id === "string" &&
    b.property_id.length > 0 &&
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.includes("@") &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.check_in === "string" &&
    b.check_in.length > 0 &&
    typeof b.check_out === "string" &&
    b.check_out.length > 0 &&
    typeof b.guests === "number" &&
    b.guests > 0
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidInquiry(body)) {
    return NextResponse.json(
      { error: "Missing or invalid fields." },
      { status: 400 }
    );
  }

  if (new Date(body.check_out) <= new Date(body.check_in)) {
    return NextResponse.json(
      { error: "Check-out date must be after check-in date." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured yet, so inquiries can't be saved. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
      { status: 501 }
    );
  }

  const { error } = await supabase.from("inquiries").insert({
    property_id: body.property_id,
    room_type_id: body.room_type_id || null,
    name: body.name.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    check_in: body.check_in,
    check_out: body.check_out,
    guests: body.guests,
    message: body.message?.trim() ?? "",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
