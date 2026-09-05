import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

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
}

export function ProjectCard({ title, date, description, tags, link }: Props) {
  return (
    <Card className="flex flex-col overflow-hidden border border-muted p-3">
      <CardHeader className="">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-x-2">
            <CardTitle className="text-base">
              {link ? (
                <a
                  href={link}
                  target="_blank"
                  className="inline-flex items-center gap-1 hover:underline"
                >
                  {title}{" "}
                  <span className="size-1 rounded-full bg-green-500"></span>
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
