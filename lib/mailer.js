// Отправка писем через SMTP (например, Gmail с паролем приложения).
// Настройки — в .env.local: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM.
import nodemailer from "nodemailer";

export const mailConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

let transport = null;
function getTransport() {
  const port = Number(process.env.SMTP_PORT || 465);
  transport ??= nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transport;
}

const TEXT = {
  ru: {
    subject: "Код подтверждения SPORT QUEST",
    title: "Твой код для входа",
    note: "Код действует 10 минут. Если ты не запрашивал вход, просто проигнорируй это письмо.",
  },
  en: {
    subject: "SPORT QUEST verification code",
    title: "Your sign-in code",
    note: "The code is valid for 10 minutes. If you didn't request it, just ignore this email.",
  },
  uz: {
    subject: "SPORT QUEST tasdiqlash kodi",
    title: "Kirish uchun kodingiz",
    note: "Kod 10 daqiqa amal qiladi. Agar siz soʻramagan boʻlsangiz, bu xatni eʼtiborsiz qoldiring.",
  },
};

export async function sendLoginCode(to, code, lang = "ru") {
  const tx = TEXT[lang] ?? TEXT.ru;
  const html = `
  <div style="background:#03090b;padding:40px 16px;font-family:Arial,Helvetica,sans-serif">
    <div style="max-width:440px;margin:0 auto;background:#07191d;border:1px solid #12353a;border-radius:24px;padding:36px;text-align:center">
      <div style="display:inline-block;background:#18f5b5;color:#03090b;font-weight:800;border-radius:12px;padding:8px 14px;font-size:14px;letter-spacing:1px">SPORT QUEST</div>
      <h1 style="color:#ffffff;font-size:22px;margin:28px 0 8px">${tx.title}</h1>
      <div style="font-size:40px;font-weight:800;letter-spacing:12px;color:#29ffc3;margin:20px 0;padding:18px;background:#03090b;border-radius:16px">${code}</div>
      <p style="color:#7e9296;font-size:13px;line-height:1.6;margin:0">${tx.note}</p>
    </div>
  </div>`;
  await getTransport().sendMail({
    from: process.env.SMTP_FROM || `SPORT QUEST <${process.env.SMTP_USER}>`,
    to,
    subject: `${tx.subject}: ${code}`,
    text: `${tx.title}: ${code}\n\n${tx.note}`,
    html,
  });
}
