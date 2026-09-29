"use client";

import { useState, type FormEvent } from "react";
import type { RoomType } from "@/lib/types";

type InquiryFormProps = {
  propertyId: string;
  rooms: RoomType[];
};

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm({ propertyId, rooms }: InquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      property_id: propertyId,
      room_type_id: (form.get("room_type_id") as string) || null,
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      check_in: form.get("check_in") as string,
      check_out: form.get("check_out") as string,
      guests: Number(form.get("guests")),
      message: form.get("message") as string,
    };

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-green-800">
        Thanks! Your inquiry has been sent. We&apos;ll get back to you shortly
        to confirm availability.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" name="phone" type="tel" required />
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700">
            Room type
          </label>
          <select
            name="room_type_id"
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          >
            <option value="">No preference</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Check-in" name="check_in" type="date" required />
        <Field label="Check-out" name="check_out" type="date" required />
        <Field
          label="Guests"
          name="guests"
          type="number"
          min={1}
          defaultValue={2}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-stone-700">
          Message (optional)
        </label>
        <textarea
          name="message"
          rows={4}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
          placeholder="Anything else we should know?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-[#3D2709] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  min,
  defaultValue,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  min?: number;
  defaultValue?: number;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        defaultValue={defaultValue}
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
      />
    </div>
  );
}
