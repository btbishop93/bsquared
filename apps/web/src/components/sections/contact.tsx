"use client";

import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import linksData from "@/../../../data/links.json";
import config from "@/../../../data/config.json";

const BLUR_FADE_DELAY = 0.04;

const iconMap: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  x: Twitter,
  mail: Mail,
};

export function ContactSection() {
  return (
    <section id="contact" className="mx-auto w-full max-w-2xl px-4 py-12">
      <BlurFade delay={BLUR_FADE_DELAY * 17}>
        <h2 className="text-xl font-bold">Contact</h2>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 18}>
        <p className="text-muted-foreground mt-2 mb-6 max-w-md">
          Want to chat? Feel free to reach out via any of the links below or
          send me an email.
        </p>
      </BlurFade>

      {/* Social links */}
      <BlurFade delay={BLUR_FADE_DELAY * 19}>
        <div className="flex flex-wrap gap-3">
          {linksData.social.map((link) => {
            const Icon = iconMap[link.icon] || Mail;
            return (
              <Button
                key={link.name}
                variant="outline"
                size="sm"
                asChild
                className="gap-2"
              >
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-4 w-4" />
                  {link.name}
                </Link>
              </Button>
            );
          })}
        </div>
      </BlurFade>

      {/* Resume download */}
      <BlurFade delay={BLUR_FADE_DELAY * 20}>
        <div className="mt-8">
          <Button asChild>
            <Link
              href={config.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </Link>
          </Button>
        </div>
      </BlurFade>
    </section>
  );
}
