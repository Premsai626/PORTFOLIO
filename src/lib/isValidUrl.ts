/**
 * Link and URL Validation Utility
 * Rejects empty strings, undefined, null, '#', javascript:, and placeholder strings.
 * Validates real http(s) and mailto links.
 */

export function isValidUrl(url?: string | null): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const trimmed = url.trim();
  if (trimmed.length === 0) {
    return false;
  }

  // Explicitly reject fake destinations, anchors, and scripts
  if (
    trimmed === '#' ||
    trimmed.startsWith('#') ||
    trimmed.toLowerCase().startsWith('javascript:') ||
    trimmed === 'undefined' ||
    trimmed === 'null' ||
    trimmed === 'YOUR_URL_HERE' ||
    trimmed.includes('example.com') ||
    trimmed.includes('username')
  ) {
    return false;
  }

  // Valid schemas
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('mailto:')
  ) {
    return true;
  }

  return false;
}
