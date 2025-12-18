"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import config from "@/../../../data/config.json";

const BLUR_FADE_DELAY = 0.04;

export function AboutSection() {
  return (
    <section id="about" className="mx-auto w-full max-w-2xl px-4">
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="text-xl font-bold">About</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 4}>
        <div className="prose prose-invert max-w-full text-pretty text-muted-foreground dark:prose-invert">
          {config.bio.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mt-4 first:mt-2">
              {paragraph}
            </p>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}
