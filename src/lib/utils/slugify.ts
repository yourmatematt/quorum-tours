/**
 * Convert a string to a URL-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')  // Remove non-word chars (except spaces and hyphens)
    .replace(/[\s_]+/g, '-')   // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-')       // Collapse consecutive hyphens
    .replace(/^-+|-+$/g, '');  // Trim hyphens from ends
}

/**
 * Generate a unique slug by appending a short random suffix.
 */
export function generateUniqueSlug(base: string): string {
  const slug = slugify(base);
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${slug}-${suffix}`;
}
