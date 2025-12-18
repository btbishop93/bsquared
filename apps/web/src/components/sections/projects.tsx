"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import projectsData from "@/../../../data/projects.json";

const BLUR_FADE_DELAY = 0.04;

interface Project {
  title: string;
  description: string;
  tech: string[];
  links: {
    demo: string | null;
    github: string | null;
  };
  featured: boolean;
  image?: string;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col overflow-hidden border hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            {project.title}
          </CardTitle>
          <div className="flex gap-2">
            {project.links.github && (
              <Link
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
            )}
            {project.links.demo && (
              <Link
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 flex-1 flex flex-col">
        <CardDescription className="text-sm text-muted-foreground mb-3 flex-1">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-1">
          {project.tech.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs px-2 py-0">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectsSection() {
  const featuredProjects = projectsData.projects.filter((p) => p.featured);
  const otherProjects = projectsData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto w-full max-w-2xl px-4">
      <BlurFade delay={BLUR_FADE_DELAY * 12}>
        <h2 className="text-xl font-bold">Projects</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 13}>
        <p className="text-muted-foreground text-sm mt-1 mb-4">
          A selection of projects I&apos;ve built
        </p>
      </BlurFade>

      {/* Featured projects */}
      <div className="grid gap-4 sm:grid-cols-2">
        {featuredProjects.map((project, index) => (
          <BlurFade
            key={project.title}
            delay={BLUR_FADE_DELAY * 14 + index * 0.05}
          >
            <ProjectCard project={project} />
          </BlurFade>
        ))}
      </div>

      {/* Other projects */}
      {otherProjects.length > 0 && (
        <div className="mt-6">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">
              Other Projects
            </h3>
          </BlurFade>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherProjects.map((project, index) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 16 + index * 0.05}
              >
                <ProjectCard project={project} />
              </BlurFade>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
