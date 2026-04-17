const fallbackSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="Imagen no disponible">
  <rect width="800" height="800" fill="#f1f5f9"/>
  <rect x="240" y="240" width="320" height="220" rx="20" fill="#cbd5e1"/>
  <circle cx="330" cy="320" r="34" fill="#94a3b8"/>
  <path d="M255 430l80-85 70 60 55-40 85 65v28H255z" fill="#94a3b8"/>
  <text x="400" y="525" text-anchor="middle" fill="#475569" font-size="34" font-family="Arial, sans-serif">Imagen no disponible</text>
</svg>`;

export const IMAGE_FALLBACK_SRC = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(fallbackSvg)}`;

export const setImageFallback = (
  image: HTMLImageElement,
  fallbackSrc: string = IMAGE_FALLBACK_SRC
): void => {
  if (image.src !== fallbackSrc) {
    image.src = fallbackSrc;
  }
};
