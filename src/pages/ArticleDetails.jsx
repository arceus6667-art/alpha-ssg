import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Bookmark,
  CheckCircle2,
  Tag,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import { contentService } from '../services/contentService';

export default function ArticleDetails() {
  const { slug } = useParams();
  const [article, setArticle] = useState(() => contentService.getArticle(slug));

  useEffect(() => {
    const load = async () => {
      try {
        await contentService.fetchArticles();
      } catch (e) {
        // Fallback
      }
      setArticle(contentService.getArticle(slug));
    };
    load();
    window.addEventListener('ssg:content_changed', load);
    return () => window.removeEventListener('ssg:content_changed', load);
  }, [slug]);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  // Related articles in same category or recent
  const relatedArticles = contentService.getArticles()
    .filter(a => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <SEO
        title={article.title}
        description={article.excerpt}
        ogImage={article.coverImage}
      />

      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 pt-8 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to Knowledge Base</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              {article.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Author Strip */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <strong className="block text-sm font-bold text-slate-900">
                  {article.author.name}
                </strong>
                <span className="block text-xs text-slate-500">
                  {article.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {article.readingTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl pt-10">
        {/* Cover Image */}
        <div className="rounded-2xl overflow-hidden border border-slate-200 mb-10 shadow-sm aspect-[16/9] max-h-[440px] w-full">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Formatted Article Body */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
            {article.content.split('\n\n').map((block, idx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (trimmed.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100">
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }

              if (trimmed.startsWith('- ')) {
                const items = trimmed.split('\n- ');
                return (
                  <ul key={idx} className="space-y-2 list-disc pl-5 text-sm sm:text-base">
                    {items.map((item, i) => (
                      <li key={i}>{item.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                );
              }

              if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('4. ')) {
                const lines = trimmed.split('\n');
                return (
                  <ol key={idx} className="space-y-2 list-decimal pl-5 text-sm sm:text-base">
                    {lines.map((line, i) => (
                      <li key={i}>{line.replace(/^\d+\.\s*/, '')}</li>
                    ))}
                  </ol>
                );
              }

              return (
                <p key={idx} className="text-sm sm:text-base leading-relaxed text-slate-700">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                <Tag size={13} />
                Tags:
              </span>
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              More Recommended Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map(rel => (
                <ArticleCard key={rel.slug} article={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
