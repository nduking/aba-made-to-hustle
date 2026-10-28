// Crockford Base32 Alphabet (excludes I, L, O, U)
export const CROCKFORD_CHARS = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export function generatePublicId(): string {
  let chars = "";
  // Generate 9 random characters
  for (let i = 0; i < 9; i++) {
    const idx = Math.floor(Math.random() * CROCKFORD_CHARS.length);
    chars += CROCKFORD_CHARS[idx];
  }
  
  // Calculate modulo 32 check character
  let sum = 0;
  for (let i = 0; i < chars.length; i++) {
    const val = CROCKFORD_CHARS.indexOf(chars[i]);
    sum += val * (i + 1);
  }
  const checkChar = CROCKFORD_CHARS[sum % CROCKFORD_CHARS.length];
  const full = chars + checkChar;
  
  // Format as ABA-XXXXX-XXXXX
  return `ABA-${full.slice(0, 5)}-${full.slice(5)}`;
}

export function validatePublicId(raw: string): { valid: boolean; normalized: string; error?: string } {
  // Normalize: remove dashes, spaces, convert to uppercase, substitute I->1, L->1, O->0
  let cleaned = raw.toUpperCase().replace(/\s+/g, "").replace(/-/g, "");
  if (cleaned.startsWith("ABA")) {
    cleaned = cleaned.slice(3);
  }
  
  cleaned = cleaned.replace(/I/g, "1").replace(/L/g, "1").replace(/O/g, "0");
  
  if (cleaned.length !== 10) {
    return { valid: false, normalized: raw, error: "ID must be 10 characters (excluding prefix)" };
  }
  
  for (const c of cleaned) {
    if (!CROCKFORD_CHARS.includes(c)) {
      return { valid: false, normalized: raw, error: `Invalid character '${c}' in ID` };
    }
  }
  
  const payload = cleaned.slice(0, 9);
  const providedCheck = cleaned[9];
  
  let sum = 0;
  for (let i = 0; i < payload.length; i++) {
    const val = CROCKFORD_CHARS.indexOf(payload[i]);
    sum += val * (i + 1);
  }
  const expectedCheck = CROCKFORD_CHARS[sum % CROCKFORD_CHARS.length];
  
  if (providedCheck !== expectedCheck) {
    return { valid: false, normalized: `ABA-${payload.slice(0, 5)}-${payload.slice(5)}${providedCheck}`, error: "Check digit mismatch (typo detected)" };
  }
  
  return { valid: true, normalized: `ABA-${payload.slice(0, 5)}-${payload.slice(5)}${expectedCheck}` };
}
