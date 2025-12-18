import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

// Placeholder blog posts - will be replaced with MDX files later
const posts = [
  {
    slug: "coming-soon",
    title: "Blog Coming Soon",
    description:
      "I'm working on sharing my thoughts on technology, AI, and building products. Stay tuned!",
    date: "2024",
  },
];

export const metadata = {
  title: "Blog",
  description: "Thoughts on technology, AI, and building products.",
};

export default function BlogPage() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section>
        <BlurFade delay={BLUR_FADE_DELAY}>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Blog
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <p className="mt-4 text-muted-foreground">
            Thoughts on technology, AI, and building products.
          </p>
        </BlurFade>
      </section>

      <section>
        <div className="flex flex-col gap-4">
          {posts.map((post, id) => (
            <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 3 + id * 0.05}>
              <Link href={`/normal/blog/${post.slug}`} className="block group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                  <h2 className="text-lg font-medium group-hover:underline">
                    {post.title}
                  </h2>
                  <time className="text-sm text-muted-foreground tabular-nums">
                    {post.date}
                  </time>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {post.description}
                </p>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
