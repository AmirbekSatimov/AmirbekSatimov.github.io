import { cn } from "@/lib/utils";

export type MediaItem = {
  src: string;
  alt: string;
  type?: "image" | "video";
};

interface Props {
  media: readonly MediaItem[];
  className?: string;
  /** Tailwind height for each item. Defaults to a compact thumbnail row. */
  itemHeight?: string;
}

/**
 * A horizontally scrollable row of images/videos. Items share a fixed height
 * and keep their natural aspect ratio, so mixed sources still line up.
 * Hidden in print, where the media isn't useful.
 */
export function MediaStrip({ media, className, itemHeight = "h-48" }: Props) {
  return (
    <div
      className={cn("flex gap-2 overflow-x-auto pb-1 print:hidden", className)}
    >
      {media.map((item) =>
        item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            aria-label={item.alt}
            controls
            playsInline
            preload="metadata"
            className={cn(
              "w-auto shrink-0 rounded-md border border-muted bg-black",
              itemHeight,
            )}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt}
            loading="lazy"
            className={cn(
              "w-auto shrink-0 rounded-md border border-muted object-cover",
              itemHeight,
            )}
          />
        ),
      )}
    </div>
  );
}
