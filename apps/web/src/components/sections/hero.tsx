"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import config from "@/../../../data/config.json";

const BLUR_FADE_DELAY = 0.04;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="mx-auto w-full max-w-2xl space-y-8 px-4 py-12 md:py-24"
    >
      <div className="flex flex-col-reverse gap-8 md:flex-row md:justify-between md:items-center">
        <div className="flex flex-1 flex-col space-y-4">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Hi, I&apos;m {config.name.split(" ")[0]} 👋
            </h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <TypingAnimation
              className="max-w-[600px] text-muted-foreground md:text-xl"
              duration={40}
            >
              {config.intro}
            </TypingAnimation>
          </BlurFade>
        </div>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Avatar className="size-28 border">
            <AvatarImage src={config.avatarUrl} alt={config.name} />
            <AvatarFallback>{config.initials}</AvatarFallback>
          </Avatar>
        </BlurFade>
      </div>
    </section>
  );
}
