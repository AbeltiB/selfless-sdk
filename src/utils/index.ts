import * as crypto from 'crypto';

export function generateCustomerId(): string {
  const ts = Date.now().toString();
  const rand = Math.floor(Math.random() * 10).toString();
  return (ts + rand).slice(-14).padStart(14, '0');
}

export function deriveCustomerIdFromPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length >= 14) return digits.slice(0, 14);
  const ts = Date.now().toString().slice(-6);
  return (digits + ts).slice(-14).padStart(14, '0');
}

export function generateTicketNumber(prefix: string, sequence: number): string {
  return `${prefix.toUpperCase()}-${sequence.toString().padStart(3, '0')}`;
}

export function parseTicketNumber(ticketNumber: string): { prefix: string; sequence: number } | null {
  const match = ticketNumber.match(/^([A-Z]+)-(\d+)$/i);
  if (!match || !match[1] || !match[2]) return null;
  return { prefix: match[1].toUpperCase(), sequence: parseInt(match[2], 10) };
}

export function estimateWaitSeconds(waitingAhead: number, avgServiceSeconds: number): number {
  return Math.max(0, waitingAhead * avgServiceSeconds);
}

export function formatWaitTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function calculateP95(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil(0.95 * sorted.length) - 1;
  return sorted[Math.max(0, index)] ?? 0;
}

export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function todayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}

// ─── Telegram Auth ────────────────────────────────────────────────────────────

export interface TelegramAuthData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

/**
 * Verifies the Telegram Login Widget HMAC payload.
 * Algorithm: HMAC-SHA256(data_check_string, SHA256(bot_token))
 * Rejects payloads older than maxAgeSeconds (default 86400 = 24h).
 */
export function verifyTelegramAuth(
  data: TelegramAuthData,
  botToken: string,
  maxAgeSeconds = 86400,
): boolean {
  const { hash, ...rest } = data;

  const age = Math.floor(Date.now() / 1000) - rest.auth_date;
  if (age > maxAgeSeconds) return false;

  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const dataCheckString = Object.keys(rest)
    .sort()
    .map((k) => `${k}=${(rest as Record<string, unknown>)[k]}`)
    .join('\n');

  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return computedHash === hash;
}
