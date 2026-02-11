import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowLeft,
  ChevronRight,
  Share2,
  Bookmark,
  Tag,
} from "lucide-react";
import {
  getArticleBySlug,
  getRelatedArticles,
  getAllArticleSlugs,
  categoryLabels,
  CareerArticle,
} from "@/lib/articles";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: article.seo_title || article.title,
    description:
      article.seo_description ||
      article.excerpt ||
      `Read ${article.title} - career advice for South African job seekers.`,
    openGraph: {
      title: article.seo_title || article.title,
      description: article.seo_description || article.excerpt || undefined,
      type: "article",
      publishedTime: article.published_at || undefined,
      modifiedTime: article.updated_at,
      images: article.featured_image_url
        ? [{ url: article.featured_image_url }]
        : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article, 4);

  return (
    <article className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href="/career-tips"
              className="hover:text-foreground transition-colors"
            >
              Career Tips
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link
              href={`/career-tips/${article.category}`}
              className="hover:text-foreground transition-colors"
            >
              {categoryLabels[article.category]}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground truncate max-w-[200px]">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href={`/career-tips/${article.category}`}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-teal mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {categoryLabels[article.category]}
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-teal/10 text-brand-teal rounded-full text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                {categoryLabels[article.category]}
              </span>
              {article.is_featured && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
                {article.excerpt}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.read_time}
              </span>
              {article.published_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.published_at).toLocaleDateString("en-ZA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}

              {/* Share Buttons */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  title="Share"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-muted transition-colors"
                  title="Bookmark"
                >
                  <Bookmark className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {article.featured_image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={article.featured_image_url}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none 
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-brand-teal prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:my-4 prose-li:text-muted-foreground prose-li:my-1
              prose-ol:my-4
              prose-blockquote:border-l-brand-teal prose-blockquote:bg-muted/50 
              prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
              prose-blockquote:not-italic prose-blockquote:text-muted-foreground
              prose-img:rounded-xl prose-img:shadow-md
              prose-code:text-brand-teal prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-[#1e1e1e] prose-pre:text-[#d4d4d4]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-4 w-4 text-muted-foreground" />
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-brand-teal/10 hover:text-brand-teal transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Box / CTA */}
          <div className="mt-10 p-6 bg-gradient-to-br from-brand-teal/5 to-brand-teal/10 rounded-2xl border border-brand-teal/20">
            <h3 className="text-lg font-semibold mb-2">
              Need Help with Your CV?
            </h3>
            <p className="text-muted-foreground mb-4">
              Get your CV professionally reviewed and optimized by our ATS
              checker. Stand out to employers and land more interviews.
            </p>
            <Link
              href="/cv-services"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors"
            >
              Check Your CV Now
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArticles.map((related) => (
                <RelatedArticleCard key={related.id} article={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

function RelatedArticleCard({ article }: { article: CareerArticle }) {
  return (
    <Link
      href={`/career-tips/${article.slug}`}
      className="group block bg-card border rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-teal transition-all"
    >
      {article.featured_image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs text-brand-teal font-medium">
          {categoryLabels[article.category]}
        </span>
        <h3 className="font-semibold mt-1 mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {article.read_time}
        </div>
      </div>
    </Link>
  );
}
