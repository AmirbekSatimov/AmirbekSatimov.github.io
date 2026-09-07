"use client";

import { useId, useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { MediaStrip, type MediaItem } from "./media-strip";
import { cn } from "@/lib/utils";

interface Props {
  media: readonly MediaItem[];
  label?: string;
}

/**
 * Collapsed-by-default media with a "See more" toggle.
 *
 * The content stays mounted and is collapsed via a grid-rows 1fr -> 0fr
 * transition, which animates in both directions. A native <details> can't do
 * this: it drops its content the moment it closes, so there is no closing
 * frame to animate, and browsers hide closed content with `content-visibility`
 * rather than `display`, which stops CSS animations from re-firing on reopen.
 */
export function MediaDisclosure({ media, label = "See more" }: Props) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="mt-2 print:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-fit cursor-pointer items-center gap-1 font-mono text-xs font-bold text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronRightIcon
          className={cn(
            "size-3 transition-transform duration-300 ease-out motion-reduce:transition-none",
            open && "rotate-90",
          )}
        />
        {label}
      </button>

      <div
        id={contentId}
        className={cn(
          "grid transition-all duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <MediaStrip media={media} className="mt-2" itemHeight="h-[32rem]" />
        </div>
      </div>
    </div>
  );
}
