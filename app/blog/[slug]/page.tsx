import { getBlogPost, getAllBlogPosts } from '../data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllBlogPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.description,
    keywords: [post.keyword, 'porn blocker', 'quit porn', 'nofap', 'woyuduin'],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url: `https://woyuduin.com/blog/${slug}`,
    },
    alternates: {
      canonical: `https://woyuduin.com/blog/${slug}`,
    },
  };
}

function formatInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-purple-400 hover:underline">$1</a>');
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'Woyuduin' },
    publisher: { '@type': 'Organization', name: 'Woyuduin', url: 'https://woyuduin.com' },
    mainEntityOfPage: `https://woyuduin.com/blog/${slug}`,
  };

  const htmlContent = post.content
    .split('\n')
    .map((line) => {
      if (line.startsWith('### ')) return `<h3 class="text-lg font-bold text-white mt-8 mb-3">${line.slice(4)}</h3>`;
      if (line.startsWith('## ')) return `<h2 class="text-xl font-bold text-white mt-10 mb-4">${line.slice(3)}</h2>`;
      if (line.startsWith('- ')) return `<li class="text-white/60 ml-4 mb-1">${formatInline(line.slice(2))}</li>`;
      if (line.match(/^\d+\.\s/)) return `<li class="text-white/60 ml-4 mb-2 list-decimal">${formatInline(line.replace(/^\d+\.\s/, ''))}</li>`;
      if (line.startsWith('|')) {
        const cells = line.split('|').filter(Boolean).map(c => c.trim());
        if (cells.every(c => c.match(/^[-:]+$/))) return '';
        const tag = line.includes('---') ? 'th' : 'td';
        return `<tr>${cells.map(c => `<${tag} class="border border-white/10 px-3 py-2 text-white/60 text-sm">${formatInline(c)}</${tag}>`).join('')}</tr>`;
      }
      if (line.trim() === '') return '<br/>';
      return `<p class="text-white/60 leading-relaxed mb-3">${formatInline(line)}</p>`;
    })
    .join('\n');

  return (
    <main className="min-h-screen px-6 py-20" style={{ backgroundColor: '#08080f' }}>
      <div className="max-w-3xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Link href="/blog" className="text-white/30 text-sm hover:text-white/50 transition-colors">
          ← Back to Blog
        </Link>

        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-600/20 text-purple-300 text-xs px-2.5 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <span className="text-white/30 text-xs">{post.readTime}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4">
            {post.title}
          </h1>
          <div className="text-white/30 text-sm">
            Published {post.publishedAt} &bull; Updated {post.updatedAt}
          </div>
        </div>

        <article dangerouslySetInnerHTML={{ __html: htmlContent }} />

        {/* CTA */}
        <div className="mt-12 glass rounded-2xl p-8 text-center border border-white/5">
          <h3 className="text-xl font-bold text-white mb-2">Ready to Take Control?</h3>
          <p className="text-white/40 text-sm mb-6">Download Woyuduin free — block porn, kill urges, build discipline.</p>
          <a
            href="/download"
            className="inline-block bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105"
          >
            Download Free — Android
          </a>
        </div>

        <a href="/" className="inline-block mt-10 text-white/30 text-sm hover:text-white/50 transition-colors">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
