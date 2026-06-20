import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache, Suspense } from "react";
import { EmbeddedTweet } from "react-tweet";
import { getTweet } from "react-tweet/api";
import type {
  QuotedTweet,
  Tweet as TweetData,
  TweetBase,
  TweetEntities,
} from "react-tweet/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/lib/articles";
import { XTwitterIcon } from "@/components/icons";

// Force static generation to avoid hydration issues
export const dynamic = "force-static";

const TWEET_FETCH_TIMEOUT_MS = 5000;
const X_STATUS_URL = "https://x.com/i/status/";

function normalizeTweetEntities(
  entities: Partial<TweetEntities> | undefined
): TweetEntities {
  return {
    hashtags: entities?.hashtags ?? [],
    urls: entities?.urls ?? [],
    user_mentions: entities?.user_mentions ?? [],
    symbols: entities?.symbols ?? [],
    media: entities?.media,
  };
}

function normalizeTweetBase<T extends TweetBase>(tweet: T): T {
  return {
    ...tweet,
    entities: normalizeTweetEntities(tweet.entities),
  };
}

function normalizeQuotedTweet(tweet: QuotedTweet): QuotedTweet {
  return normalizeTweetBase(tweet);
}

function normalizeTweet(tweet: TweetData): TweetData {
  return {
    ...normalizeTweetBase(tweet),
    parent: tweet.parent ? normalizeTweetBase(tweet.parent) : undefined,
    quoted_tweet: tweet.quoted_tweet
      ? normalizeQuotedTweet(tweet.quoted_tweet)
      : undefined,
  };
}

function TweetEmbedFallback({ id }: { id: string }) {
  return (
    <a
      href={`${X_STATUS_URL}${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="not-prose my-6 block rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
    >
      View post on X
    </a>
  );
}

async function TweetEmbedContent({ id }: { id: string }) {
  try {
    const tweet = await getTweet(id, {
      cache: "force-cache",
      signal: AbortSignal.timeout(TWEET_FETCH_TIMEOUT_MS),
    });

    if (!tweet) {
      return <TweetEmbedFallback id={id} />;
    }

    return <EmbeddedTweet tweet={normalizeTweet(tweet)} />;
  } catch {
    return <TweetEmbedFallback id={id} />;
  }
}

function TweetEmbed({ id }: { id: string }) {
  return (
    <Suspense
      fallback={
        <div className="my-6 h-[400px] animate-pulse rounded-xl bg-muted/50" />
      }
    >
      <TweetEmbedContent id={id} />
    </Suspense>
  );
}

// MDX components available in articles
const mdxComponents = {
  Tweet: TweetEmbed,
};

const getCompiledArticle = cache(async (slug: string) => {
  try {
    const article = getArticleBySlug(slug);
    const { content } = await compileMDX({
      source: article.content,
      options: { parseFrontmatter: false },
      components: mdxComponents,
    });
    return { meta: article.meta, content };
  } catch {
    return null;
  }
});

export function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCompiledArticle(slug);
  if (!article) {
    return { title: "Not Found" };
  }
  return {
    title: article.meta.title,
    description: article.meta.description,
  };
}

export default async function WritingArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getCompiledArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert max-w-none">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground no-underline mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to writing
      </Link>
      {article.meta.headerImage && (
        <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden not-prose">
          <Image
            src={article.meta.headerImage}
            alt={article.meta.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{article.meta.title}</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <time>{article.meta.dateFormatted}</time>
          <span>•</span>
          <span>{article.meta.readTime}</span>
          {article.meta.xUrl && (
            <>
              <span>•</span>
              <a
                href={article.meta.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <XTwitterIcon className="h-4 w-4" />
                <span>View on X</span>
              </a>
            </>
          )}
        </p>
      </header>
      {article.content}
    </article>
  );
}
