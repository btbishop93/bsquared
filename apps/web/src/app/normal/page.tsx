import Link from "next/link";
import Markdown from "react-markdown";
import { Globe } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ResumeCard } from "@/components/resume-card";
import { ProjectCard } from "@/components/project-card";
import config from "@/../../../data/config.json";
import resumeData from "@/../../../data/resume.json";
import skillsData from "@/../../../data/skills.json";
import projectsData from "@/../../../data/projects.json";

const BLUR_FADE_DELAY = 0.04;

export default function NormalPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      {/* Hero */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Hi, I&apos;m {config.name.split(" ")[0]} 👋
                </h1>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <p className="max-w-[600px] md:text-xl">{config.intro}</p>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={config.name} src={config.avatarUrl} />
                <AvatarFallback>{config.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <div className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            <Markdown>{config.bio}</Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Work Experience */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {resumeData.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Education */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {resumeData.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                href={education.href}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {skillsData.featured.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-md bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from AI-powered
                  tools to trading algorithms. Here are a few of my favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {projectsData.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  links={project.links?.map((link) => ({
                    icon: <Globe className="size-3" />,
                    type: link.type,
                    href: link.href,
                  }))}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a DM{" "}
                <Link
                  href="https://x.com/brendenburg"
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on X
                </Link>{" "}
                and I&apos;ll respond whenever I can.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
