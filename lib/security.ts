import { escape } from 'html-escaper';
import xss from 'xss';

export function sanitizeInput(input: string): string {
  // Escape HTML entities
  let sanitized = escape(input);
  
  // Prevent XSS
  sanitized = xss(sanitized);
  
  return sanitized;
}

export function generateCSRFToken(): string {
  return crypto.randomUUID();
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken;
}