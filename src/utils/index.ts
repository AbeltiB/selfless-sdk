/**
 * Generates a 14-digit unique customer ID.
 * Format: 14 numeric digits, e.g. "20240523124501"
 */
export function generateCustomerId(): string {
  const ts = Date.now().toString(); // 13 digits
  const rand = Math.floor(Math.random() * 10).toString(); // 1 digit
  const combined = ts + rand;
  return combined.slice(-14).padStart(14, '0');
}

/**
 * Derives a consistent 14-digit customer ID from a phone number.
 * Same phone always returns the same base, allowing DB lookup first.
 */
export function deriveCustomerIdFromPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length >= 14) return digits.slice(0, 14);
  const ts = Date.now().toString().slice(-6);
  const combined = digits + ts;
  return combined.slice(-14).padStart(14, '0');
}

/**
 * Formats a ticket number: prefix + zero-padded sequence.
 * e.g. generateTicketNumber('A', 7) => 'A-007'
 */
export function generateTicketNumber(prefix: string, sequence: number): string {
  return `${prefix.toUpperCase()}-${sequence.toString().padStart(3, '0')}`;
}

/**
 * Parses a ticket number string into prefix and sequence number.
 */
export function parseTicketNumber(ticketNumber: string): { prefix: string; sequence: number } | null {
  const match = ticketNumber.match(/^([A-Z]+)-(\d+)$/i);
  if (!match || !match[1] || !match[2]) return null;
  return { prefix: match[1].toUpperCase(), sequence: parseInt(match[2], 10) };
}

/**
 * Estimates wait time in seconds based on queue length and avg service time.
 */
export function estimateWaitSeconds(waitingAhead: number, avgServiceSeconds: number): number {
  return Math.max(0, waitingAhead * avgServiceSeconds);
}

/**
 * Formats a duration in seconds into a human-readable string.
 */
export function formatWaitTime(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/**
 * Calculates p95 from an array of values (wait times in seconds).
 */
export function calculateP95(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.ceil(0.95 * sorted.length) - 1;
  return sorted[Math.max(0, index)] ?? 0;
}

/**
 * Calculates the average of an array of numbers.
 */
export function calculateAverage(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/**
 * Formats a date to a short time string: HH:mm
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

/**
 * Returns today's date at midnight UTC (for queue date grouping).
 */
export function todayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/**
 * Checks if two dates are the same calendar day (UTC).
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
}
