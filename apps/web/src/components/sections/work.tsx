"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import resumeData from "@/../../../data/resume.json";

const BLUR_FADE_DELAY = 0.04;

interface WorkExperience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  description: string;
  logo?: string;
}

function ResumeCard({ work }: { work: WorkExperience }) {
  return (
    <Card className="flex">
      <div className="flex-none">
        <Avatar className="m-auto size-12 border bg-muted-foreground/10">
          <AvatarImage src={work.logo} alt={work.company} />
          <AvatarFallback>{work.company[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-grow flex-col items-center ml-4">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
              {work.company}
            </h3>
            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
              {work.start} - {work.end}
            </div>
          </div>
          <div className="font-sans text-xs text-muted-foreground">
            {work.title}
          </div>
        </CardHeader>
        <CardContent className="mt-2 p-0 text-xs text-muted-foreground">
          {work.description}
        </CardContent>
      </div>
    </Card>
  );
}

export function WorkSection() {
  return (
    <section id="work" className="mx-auto w-full max-w-2xl px-4">
      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <h2 className="text-xl font-bold">Work Experience</h2>
      </BlurFade>
      <div className="mt-4 space-y-4">
        {resumeData.work.map((work, index) => (
          <BlurFade
            key={work.company}
            delay={BLUR_FADE_DELAY * 6 + index * 0.05}
          >
            <ResumeCard work={work} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
