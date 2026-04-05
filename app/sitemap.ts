import { MetadataRoute } from 'next'
import { getAllBlogPosts } from './blog/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://woyuduin.com/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const featurePages = [
    'vpn-blocker',
    'ai-counselor',
    'accountability-partner',
    'urge-interruption',
    'couples-mode',
    'journal',
    'recovery-curriculum',
    'habit-stacking',
    'streak-tracker',
  ];

  const featureUrls = featurePages.map((slug) => ({
    url: `https://woyuduin.com/features/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }));

  return [
    {
      url: 'https://woyuduin.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://woyuduin.com/download',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://woyuduin.com/pricing',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://woyuduin.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...featureUrls,
    ...blogUrls,
    {
      url: 'https://woyuduin.com/privacy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]
}
