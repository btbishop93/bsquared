"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";
import skillsData from "@/../../../data/skills.json";

const BLUR_FADE_DELAY = 0.04;

export function SkillsSection() {
  return (
    <section id="skills" className="mx-auto w-full max-w-2xl px-4">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <h2 className="text-xl font-bold">Skills</h2>
      </BlurFade>
      <div className="mt-4 flex flex-wrap gap-2">
        {skillsData.featured.map((skill, index) => (
          <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + index * 0.02}>
            <Badge variant="secondary" className="px-3 py-1">
              {skill}
            </Badge>
          </BlurFade>
        ))}
      </div>

      {/* Category breakdown */}
      <div className="mt-8 space-y-4">
        {skillsData.categories.map((category, catIndex) => (
          <BlurFade
            key={category.name}
            delay={BLUR_FADE_DELAY * 11 + catIndex * 0.05}
          >
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="text-xs px-2 py-0.5"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
