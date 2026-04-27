const RECIPIENT = "teatrocontactwarsaw@gmail.com";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function targetPath(lang, status) {
  const page = lang === "pl" ? "/pl/kontakt.html" : "/es/contact.html";
  return `${page}?${status}=1`;
}

async function sendWithResend({ lang, name, phone, email, level, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) {
    throw new Error("Missing RESEND_API_KEY or RESEND_FROM");
  }

  const subject =
    lang === "pl"
      ? `Nowy kontakt - Viva Polaco #${new Date().toISOString()}`
      : `Nuevo contacto - Viva Polaco #${new Date().toISOString()}`;

  const html =
    lang === "pl"
      ? `
        <h2>Nowy kontakt ze strony Viva Polaco</h2>
        <p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>
        <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Poziom lub cel:</strong> ${escapeHtml(level)}</p>
        <p><strong>Wiadomość:</strong><br>${escapeHtml(message || "- brak -").replace(/\n/g, "<br>")}</p>
      `
      : `
        <h2>Nuevo contacto desde Viva Polaco</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Nivel u objetivo:</strong> ${escapeHtml(level)}</p>
        <p><strong>Mensaje:</strong><br>${escapeHtml(message || "- sin mensaje -").replace(/\n/g, "<br>")}</p>
      `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [RECIPIENT],
      reply_to: email,
      subject,
      html
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Resend error: ${response.status} ${details}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const lang = req.query.lang === "pl" ? "pl" : "es";
  const body = req.body || {};

  if (body.website) {
    res.redirect(303, targetPath(lang, "sent"));
    return;
  }

  const formTime = Number(body.form_time || 0);
  if (formTime && Date.now() / 1000 - formTime < 3) {
    res.redirect(303, targetPath(lang, "error"));
    return;
  }

  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const level = String(body.level || "").trim();
  const message = String(body.message || "").trim();

  if (!name || name.length < 3 || !phone || !/^[0-9+\s]{8,}$/.test(phone) || !/^\S+@\S+\.\S+$/.test(email) || !level || message.length > 1000) {
    res.redirect(303, targetPath(lang, "error"));
    return;
  }

  try {
    await sendWithResend({ lang, name, phone, email, level, message });
    res.redirect(303, targetPath(lang, "sent"));
  } catch (error) {
    console.error(error);
    res.redirect(303, targetPath(lang, "error"));
  }
}
