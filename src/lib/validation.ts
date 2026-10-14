export const MAX_IMAGE_SIZE = 15 * 1024 * 1024;

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(
    file.type as (typeof ALLOWED_IMAGE_TYPES)[number]
  )) {
    return "Please upload a JPEG, PNG, or WebP image.";
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return "Image size must be 15 MB or less.";
  }

  if (file.size === 0) {
    return "The selected image is empty.";
  }

  return null;
}