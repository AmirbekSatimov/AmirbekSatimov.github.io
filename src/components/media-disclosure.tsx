import { ChevronRightIcon } from "lucide-react";
import { MediaStrip, type MediaItem } from "./media-strip";

interface Props {
  media: readonly MediaItem[];
  label?: string;
}

/**
 * Collapsed-by-default media, revealed by a "See more" toggle. Built on native
 * <details> so it works without client-side JS (this page is a static export).
 */
export function MediaDisclosure({ media, label = "See more" }: Props) {
  return (
    <details className="group mt-2 print:hidden">
      <summary className="flex w-fit cursor-pointer list-none items-center gap-1 font-mono text-xs font-bold text-muted-foreground hover:text-foreground [&::-webkit-details-marker]:hidden">
        <ChevronRightIcon className="size-3 transition-transform duration-200 group-open:rotate-90" />
        {label}
      </summary>
      <MediaStrip media={media} className="mt-2" itemHeight="h-[32rem]" />
    </details>
  );
}
