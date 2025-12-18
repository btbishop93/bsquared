import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectStatus = "live" | "development" | "concept";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  live: {
    label: "Live",
    className:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  },
  development: {
    label: "In Development",
    className:
      "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  concept: {
    label: "Concept",
    className: "bg-muted text-muted-foreground",
  },
};

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  status?: ProjectStatus;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  status,
  tags,
  link,
  image,
  video,
  links,
  className,
}: ProjectCardProps) {
  const statusConfig = status ? STATUS_CONFIG[status] : null;

  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 ease-out h-full">
      <Link
        href={href || "#"}
        className={cn("block cursor-pointer", className)}
      >
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <Image
            src={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="mt-1 text-base">{title}</CardTitle>
            {statusConfig && (
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px] px-1.5 py-0",
                  statusConfig.className
                )}
              >
                {statusConfig.label}
              </Badge>
            )}
          </div>
          <time className="font-sans text-xs">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace("https://", "").replace("www.", "").replace("/", "")}
          </div>
          <div className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags?.map((tag) => (
              <Badge
                className="px-1 py-0 text-[10px]"
                variant="secondary"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links?.map((link, idx) => (
              <Link href={link?.href} key={idx} target="_blank">
                <Badge key={idx} className="flex gap-2 px-2 py-1 text-[10px]">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
