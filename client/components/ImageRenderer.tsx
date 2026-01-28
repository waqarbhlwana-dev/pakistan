import { useState } from "react";

interface ImageRendererProps {
  content: string;
  altText?: string;
  className?: string;
}

/**
 * Detects if content is an image URL and renders it as an <img> tag.
 * Otherwise, renders as plain text.
 */
export function ImageRenderer({
  content,
  altText = "Image",
  className = "max-w-full h-auto rounded-lg",
}: ImageRendererProps) {
  const [hasError, setHasError] = useState(false);

  // Common image URL patterns
  const imageUrlPatterns = [
    /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i,
    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i,
    /^https?:\/\/.+[?&]format=(jpg|jpeg|png|gif|webp|svg|bmp)/i,
  ];

  const isImageUrl = imageUrlPatterns.some((pattern) =>
    pattern.test(content.trim()),
  );

  // If it's not an image URL or failed to load, show as text
  if (!isImageUrl || hasError) {
    return <p className="whitespace-pre-wrap text-foreground">{content}</p>;
  }

  return (
    <div className="flex justify-center my-4">
      <img
        src={content.trim()}
        alt={altText}
        className={className}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
