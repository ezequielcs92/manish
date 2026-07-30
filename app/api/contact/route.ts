import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
  website?: unknown;
};

function readText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  if (readText(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = readText(payload.name, 100);
  const company = readText(payload.company, 120);
  const email = readText(payload.email, 200);
  const service = readText(payload.service, 100);
  const message = readText(payload.message, 4000);

  if (!name || !service || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "Completá los campos requeridos" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json({ ok: true, delivery: "development" });
    }
    return NextResponse.json({ error: "Servicio de correo no configurado" }, { status: 503 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Manish Web <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "hola@manish.com.ar"],
      reply_to: email,
      subject: `Nueva consulta web · ${name}${company ? ` · ${company}` : ""}`,
      text: `Nombre: ${name}\nEmpresa: ${company || "-"}\nEmail: ${email}\nInterés: ${service}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "No se pudo enviar el correo" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
