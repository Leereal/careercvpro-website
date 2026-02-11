"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Grid3x3,
  List,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  getArticlesByCategory,
  categoryLabels,
  ArticleCategory,
  CareerArticle,
} from "@/lib/articles";

interface CategoryPageProps {
  category: ArticleCategory;
  title: string;
  description: string;
  icon: React.ElementType;
  accentColor?: string;
}

export default function CategoryPage({
  category,
  title,
  description,
  icon: Icon,
  accentColor = "brand-teal",
}: CategoryPageProps) {
  const [articles, setArticles] = useState<CareerArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const data = await getArticlesByCategory(category);
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [category]);

  // Filter articles by search query
  const filteredArticles = articles.filter((article) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      article.title.toLowerCase().includes(query) ||
      article.excerpt?.toLowerCase().includes(query) ||
      article.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // Sort articles
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "newest") {
      return (
        new Date(b.published_at || b.created_at).getTime() -
        new Date(a.published_at || a.created_at).getTime()
      );
    }
    // For popular, we'd need view count - for now just use featured
    return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0);
  });

  // Separate featured and regular articles
  const featuredArticles = sortedArticles.filter((a) => a.is_featured);
  const regularArticles = sortedArticles.filter((a) => !a.is_featured);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-teal/5 via-background to-brand-gold/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-brand-teal/10 rounded-xl">
                <Icon className="h-8 w-8 text-brand-teal" />
              </div>
              <span className="px-3 py-1 bg-brand-teal/10 text-brand-teal rounded-full text-sm font-medium">
                Career Tips
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {description}
            </p>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href="/career-tips"
                className="hover:text-foreground transition-colors"
              >
                Career Tips
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">
                {categoryLabels[category]}
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              />
            </div>

            {/* Filters & View Toggle */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "popular")
                }
                className="px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-teal/50"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-brand-teal text-white"
                      : "hover:bg-muted"
                  }`}
                  title="Grid view"
                >
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-brand-teal text-white"
                      : "hover:bg-muted"
                  }`}
                  title="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-3 text-muted-foreground">
              <div className="w-8 h-8 border-4 border-brand-teal/30 border-t-brand-teal rounded-full animate-spin" />
              <span>Loading articles...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-2xl mb-6">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
            <p className="text-muted-foreground mb-6">
              We&apos;re working on creating amazing content for this category.
              <br />
              Check back soon!
            </p>
            <Link
              href="/career-tips"
              className="inline-flex items-center gap-2 text-brand-teal hover:underline"
            >
              Browse other categories
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* No Search Results */}
        {!loading &&
          !error &&
          articles.length > 0 &&
          filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-4">
                No articles match &quot;{searchQuery}&quot;
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-brand-teal hover:underline"
              >
                Clear search
              </button>
            </div>
          )}

        {/* Featured Articles */}
        {!loading && !error && featuredArticles.length > 0 && !searchQuery && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-semibold">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.slice(0, 2).map((article) => (
                <FeaturedArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        {!loading && !error && sortedArticles.length > 0 && (
          <section>
            {featuredArticles.length > 0 && !searchQuery && (
              <h2 className="text-xl font-semibold mb-6">All Articles</h2>
            )}

            {viewMode === "grid" ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(searchQuery ? sortedArticles : regularArticles).map(
                  (article) => (
                    <ArticleCard key={article.id} article={article} />
                  )
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {(searchQuery ? sortedArticles : regularArticles).map(
                  (article) => (
                    <ArticleListItem key={article.id} article={article} />
                  )
                )}
              </div>
            )}
          </section>
        )}

        {/* CTA Section */}
        {!loading && !error && (
          <section className="mt-16 p-8 bg-gradient-to-br from-brand-teal/5 to-brand-teal/10 rounded-2xl border border-brand-teal/20 text-center">
            <h3 className="text-2xl font-semibold mb-3">
              Ready to Boost Your Career?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Get your CV professionally reviewed by our ATS checker and
              increase your chances of landing interviews.
            </p>
            <Link
              href="/cv-services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors"
            >
              Check Your CV
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

// Featured Article Card (larger, more prominent)
function FeaturedArticleCard({ article }: { article: CareerArticle }) {
  return (
    <Link
      href={`/career-tips/${article.slug}`}
      className="group relative bg-card border rounded-2xl overflow-hidden hover:shadow-xl hover:border-brand-teal transition-all"
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
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
            ⭐ Featured
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {article.read_time}
          </span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-brand-teal transition-colors">
          {article.title}
        </h3>
        <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
        <div className="mt-4 flex items-center gap-1 text-brand-teal font-medium">
          Read Article
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

// Regular Article Card (grid view)
function ArticleCard({ article }: { article: CareerArticle }) {
  return (
    <Link
      href={`/career-tips/${article.slug}`}
      className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg hover:border-brand-teal transition-all"
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
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {article.read_time}
          {article.published_at && (
            <>
              <span className="mx-1">•</span>
              {new Date(article.published_at).toLocaleDateString("en-ZA", {
                month: "short",
                day: "numeric",
              })}
            </>
          )}
        </div>
        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}

// Article List Item (list view)
function ArticleListItem({ article }: { article: CareerArticle }) {
  return (
    <Link
      href={`/career-tips/${article.slug}`}
      className="group flex gap-4 p-4 bg-card border rounded-xl hover:shadow-lg hover:border-brand-teal transition-all"
    >
      {article.featured_image_url && (
        <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img
            src={article.featured_image_url}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {article.read_time}
          {article.published_at && (
            <>
              <span className="mx-1">•</span>
              {new Date(article.published_at).toLocaleDateString("en-ZA", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </>
          )}
        </div>
        <h3 className="font-semibold mb-1 group-hover:text-brand-teal transition-colors truncate">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
        {article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-brand-teal group-hover:translate-x-1 transition-all flex-shrink-0 self-center" />
    </Link>
  );
}
