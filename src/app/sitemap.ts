import { MetadataRoute } from 'next';
import { getProjects, getServices, getBlogPosts } from '@/lib/db/storage';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://letsthinkstudio.com';

  const [projects, services, posts] = await Promise.all([
    getProjects('published'),
    getServices('published'),
    getBlogPosts('published')
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map(s => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(s.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date(p.updatedAt || new Date()),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map(b => ({
    url: `${baseUrl}/insights/${b.slug}`,
    lastModified: new Date(b.updatedAt || new Date()),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
