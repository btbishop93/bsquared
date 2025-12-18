"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import resumeData from "@/../../../data/resume.json";

const BLUR_FADE_DELAY = 0.04;

interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  logo?: string;
}

function EducationCard({ education }: { education: Education }) {
  return (
    <Card className="flex">
      <div className="flex-none">
        <Avatar className="m-auto size-12 border bg-muted-foreground/10">
          <AvatarImage src={education.logo} alt={education.school} />
          <AvatarFallback>{education.school[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-grow flex-col items-center ml-4">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between gap-x-2 text-base">
            <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm">
              {education.school}
            </h3>
            <div className="text-xs sm:text-sm tabular-nums text-muted-foreground text-right">
              {education.start} - {education.end}
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-2 p-0 text-xs text-muted-foreground">
          {education.degree}
        </CardContent>
      </div>
    </Card>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="mx-auto w-full max-w-2xl px-4">
      <BlurFade delay={BLUR_FADE_DELAY * 7}>
        <h2 className="text-xl font-bold">Education</h2>
      </BlurFade>
      <div className="mt-4 space-y-4">
        {resumeData.education.map((edu, index) => (
          <BlurFade key={edu.school} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
            <EducationCard education={edu} />
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
