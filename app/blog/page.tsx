import Link from 'next/link';
import { getAllBlogPosts } from './data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Porn Recovery Guides & App Reviews',
  description: 'Expert guides on quitting porn, blocking adult content, NoFap strategies, and building discipline. Free resources for recovery.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="min-h-screen px-6 py-20" style={{ backgroundColor: '#08080f' }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Blog</h1>
        <p className="text-white/40 mb-10">Guides, reviews, and strategies for quitting porn and building discipline.</p>

        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block glass rounded-2xl p-6 hover:border-purple-500/30 border border-white/5 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-purple-600/20 text-purple-300 text-xs px-2.5 py-1 rounded-full font-medium">
                  {post.category}
                </span>
                <span className="text-white/30 text-xs">{post.readTime}</span>
                <span className="text-white/30 text-xs">{post.publishedAt}</span>
              </div>
              <h2 className="text-lg font-bold text-white mb-2">{post.title}</h2>
              <p className="text-white/40 text-sm">{post.description}</p>
            </Link>
          ))}
        </div>

        <a href="/" className="inline-block mt-10 text-white/30 text-sm hover:text-white/50 transition-colors">
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
