// Простое файловое хранилище для демо. Структуру легко заменить на настоящую БД:
// все обращения идут через функции ниже.
import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const FILE = path.join(process.cwd(), ".data", "db.json");

async function read() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return { users: [] };
  }
}

async function write(db) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(db, null, 2));
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

const publicUser = (u) => ({ name: u.name, email: u.email, token: u.token, picture: u.picture ?? null, provider: u.authProvider ?? (u.googleId ? "google" : "email") });

export async function createUser({ name, email, password, progress }) {
  const db = await read();
  const normalized = email.trim().toLowerCase();
  if (db.users.some((u) => u.email === normalized)) throw new Error("exists");
  const user = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalized,
    ...hashPassword(password),
    token: crypto.randomBytes(24).toString("hex"),
    progress: progress ?? null,
    createdAt: new Date().toISOString(),
  };
  db.users.push(user);
  await write(db);
  return publicUser(user);
}

export async function login({ email, password }) {
  const db = await read();
  const user = db.users.find((u) => u.email === email.trim().toLowerCase());
  if (!user) throw new Error("invalid");
  const { hash } = hashPassword(password, user.salt);
  if (!crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.hash, "hex"))) {
    throw new Error("invalid");
  }
  return { user: publicUser(user), progress: user.progress };
}

// Вход через Google: ищем по googleId, затем по email (привязка существующего аккаунта),
// иначе создаём нового пользователя. Аватар и имя обновляются при каждом входе.
export async function googleLogin({ sub, email, name, picture, progress }) {
  const db = await read();
  const normalized = email.toLowerCase();
  let user = db.users.find((u) => u.googleId === sub) ?? db.users.find((u) => u.email === normalized);
  let isNew = false;
  if (!user) {
    isNew = true;
    user = {
      id: crypto.randomUUID(),
      email: normalized,
      token: crypto.randomBytes(24).toString("hex"),
      progress: progress ?? null,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
  }
  user.googleId = sub;
  user.name = name || user.name || normalized.split("@")[0];
  user.picture = picture || null;
  await write(db);
  return { user: publicUser(user), progress: isNew ? null : user.progress };
}

// Вход через Clerk (почта с кодом или Google): данные уже проверены Clerk на сервере
export async function clerkLogin({ clerkId, email, name, picture, provider, progress }) {
  const db = await read();
  const normalized = email.toLowerCase();
  let user = db.users.find((u) => u.clerkId === clerkId) ?? db.users.find((u) => u.email === normalized);
  const isNew = !user;
  if (!user) {
    user = {
      id: crypto.randomUUID(),
      email: normalized,
      name: null,
      token: crypto.randomBytes(24).toString("hex"),
      progress: progress ?? null,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
  }
  user.clerkId = clerkId;
  user.name = user.name || name || null;
  user.picture = picture || user.picture || null;
  user.authProvider = provider;
  await write(db);
  return { user: publicUser(user), progress: isNew ? null : user.progress };
}

// ---------- Вход по коду из письма ----------
const CODE_TTL = 10 * 60 * 1000; // код живёт 10 минут
const RESEND_AFTER = 60 * 1000; // новый код не чаще раза в минуту
const MAX_ATTEMPTS = 5;

const hashCode = (email, code) => crypto.createHash("sha256").update(`${email}:${code}`).digest("hex");

// Создаёт новый 6-значный код. Возвращает { code } или { wait } (сколько секунд ждать).
export async function createLoginCode(email) {
  const db = await read();
  db.codes ??= {};
  const normalized = email.trim().toLowerCase();
  const prev = db.codes[normalized];
  if (prev && Date.now() - prev.sentAt < RESEND_AFTER) {
    return { wait: Math.ceil((RESEND_AFTER - (Date.now() - prev.sentAt)) / 1000) };
  }
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  db.codes[normalized] = { hash: hashCode(normalized, code), sentAt: Date.now(), expires: Date.now() + CODE_TTL, attempts: 0 };
  await write(db);
  return { code };
}

// Проверяет код. При успехе находит или создаёт пользователя.
export async function verifyLoginCode(email, code, progress) {
  const db = await read();
  const normalized = email.trim().toLowerCase();
  const entry = db.codes?.[normalized];
  if (!entry || entry.expires < Date.now()) throw new Error("code_expired");
  if (entry.attempts >= MAX_ATTEMPTS) throw new Error("code_attempts");
  const ok = crypto.timingSafeEqual(Buffer.from(entry.hash, "hex"), Buffer.from(hashCode(normalized, String(code).trim()), "hex"));
  if (!ok) {
    entry.attempts += 1;
    await write(db);
    throw new Error(entry.attempts >= MAX_ATTEMPTS ? "code_attempts" : "code_invalid");
  }
  delete db.codes[normalized];

  let user = db.users.find((u) => u.email === normalized);
  const isNew = !user;
  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name: null,
      email: normalized,
      token: crypto.randomBytes(24).toString("hex"),
      progress: progress ?? null,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
  }
  user.emailVerified = true;
  await write(db);
  return { user: publicUser(user), progress: isNew ? null : user.progress, isNew };
}

export async function updateName(token, name) {
  const db = await read();
  const user = db.users.find((u) => u.token === token);
  if (!user) return null;
  user.name = name.trim().slice(0, 40);
  await write(db);
  return publicUser(user);
}

export async function getProgress(token) {
  const db = await read();
  const user = db.users.find((u) => u.token === token);
  return user ? { progress: user.progress, user: publicUser(user) } : null;
}

export async function saveProgress(token, progress) {
  const db = await read();
  const user = db.users.find((u) => u.token === token);
  if (!user) return false;
  user.progress = progress;
  await write(db);
  return true;
}

export function tokenFrom(request) {
  const header = request.headers.get("authorization") || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}
