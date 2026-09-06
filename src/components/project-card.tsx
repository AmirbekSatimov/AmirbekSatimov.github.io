import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

const SITE_DOMAIN = "amirbeksatimov.com";

/**
 * Renders a link as a readable address for the print stylesheet, where the
 * href isn't clickable. Site-relative links (e.g. hosted PDFs) are qualified
 * with the domain so they're usable from a printed page.
 */
function formatPrintUrl(link: string) {
  if (link.startsWith("/")) {
    return `${SITE_DOMAIN}${link}`;
  }

  return link
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

interface Props {
  title: string;
  date?: string;
  description: string;
  tags: readonly string[];
  link?: string;
  media?: readonly { src: string; alt: string; type?: "image" | "video" }[];
}

export function ProjectCard({
  title,
  date,
  description,
  tags,
  link,
  media,
}: Props) {
  const hasMedia = media !== undefined && media.length > 0;

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border border-muted p-3",
        // Media needs room to breathe, so those cards take the full grid width.
        hasMedia && "md:col-span-2",
      )}
    >
      <CardHeader className="">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-x-2">
            <CardTitle className="text-base">
              {link ? (
                <a href={link} target="_blank" className="hover:underline">
                  {title}
                </a>
              ) : (
                title
              )}
            </CardTitle>
            {date ? (
              <div className="shrink-0 text-xs tabular-nums text-gray-500">
                {date}
              </div>
            ) : null}
          </div>
          <div className="hidden font-mono text-xs underline print:visible">
            {link ? formatPrintUrl(link) : null}
          </div>
          <CardDescription className="font-mono text-xs">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      {hasMedia ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 print:hidden">
          {media.map((item) =>
            item.type === "video" ? (
              <video
                key={item.src}
                src={item.src}
                aria-label={item.alt}
                controls
                playsInline
                preload="metadata"
                className="h-48 w-auto shrink-0 rounded-md border border-muted bg-black"
              />
            ) : (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                className="h-48 w-auto shrink-0 rounded-md border border-muted object-cover"
              />
            ),
          )}
        </div>
      ) : null}
      <CardContent className="mt-auto flex">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              className="px-1 py-0 text-[10px]"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
