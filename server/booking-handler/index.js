import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT ?? 3001;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "https://mydentsochi.ru";

if (!BOT_TOKEN || !CHAT_ID) {
  console.error(
    "FATAL: TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set in .env"
  );
  process.exit(1);
}

app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(express.json({ limit: "10kb" }));

const PHONE_RE = /^\+7\d{10}$/;
const NAME_RE = /^.{2,100}$/;

function escape(s) {
  return String(s).replace(/[_*[\]()~`>#+\-=|{}.!]/g, (m) => `\\${m}`);
}

app.post("/api/booking", async (req, res) => {
  const { name, phone, serviceSlug, preferredTime, message } = req.body ?? {};

  if (
    !NAME_RE.test(String(name ?? "")) ||
    !PHONE_RE.test(String(phone ?? ""))
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const lines = [
    "🦷 *Новая заявка с сайта*",
    "",
    `*Имя:* ${escape(name)}`,
    `*Телефон:* ${escape(phone)}`,
  ];
  if (serviceSlug) lines.push(`*Услуга:* ${escape(serviceSlug)}`);
  if (preferredTime) lines.push(`*Удобное время:* ${escape(preferredTime)}`);
  if (message) lines.push(`*Комментарий:* ${escape(message)}`);
  lines.push(
    "",
    `_${new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}_`
  );

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: lines.join("\n"),
          parse_mode: "Markdown",
        }),
      }
    );
    if (!response.ok) {
      const body = await response.text();
      console.error("Telegram API error:", body);
      return res.status(502).json({ error: "Failed to forward to Telegram" });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error("Booking handler error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/healthz", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Booking handler listening on :${PORT}`);
});
