import { BlurFade } from "@/components/ui/blur-fade";
import { Badge } from "@/components/ui/badge";

interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SkillsSectionProps {
  categories: readonly SkillCategory[];
  blurFadeDelay: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  Languages:
    "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20",
  "Libraries & Frameworks":
    "border-violet-500/30 bg-violet-500/10 text-violet-400 hover:bg-violet-500/20",
  "AI & Agents":
    "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20",
  "Platforms & Tooling":
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20",
};

const DEFAULT_COLOR =
  "border-zinc-500/30 bg-zinc-500/10 text-zinc-400 hover:bg-zinc-500/20";

export function SkillsSection({
  categories,
  blurFadeDelay,
}: SkillsSectionProps) {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={blurFadeDelay * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>

        <div className="mt-2 space-y-4">
          {categories.map((category, catIndex) => (
            <BlurFade
              key={category.name}
              delay={blurFadeDelay * 10 + catIndex * 0.05}
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
                      className={`text-xs px-2 py-0.5 ${
                        CATEGORY_COLORS[category.name] ?? DEFAULT_COLOR
                      }`}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
