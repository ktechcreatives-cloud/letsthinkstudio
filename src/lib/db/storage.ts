import fs from 'fs/promises';
import path from 'path';
import { 
  Project, 
  Service, 
  BlogPost, 
  Testimonial, 
  SiteSettings, 
  Enquiry, 
  ActivityLog, 
  DashboardMetrics,
  EnquiryStatus 
} from '@/types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_SERVICES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_SETTINGS, 
  INITIAL_ENQUIRIES 
} from './initial-data';

interface DatabaseStore {
  projects: Project[];
  services: Service[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  settings: SiteSettings;
  enquiries: Enquiry[];
  activityLogs: ActivityLog[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const STORE_PATH = path.join(DATA_DIR, 'studio-store.json');

// Memory cache fallback for fast reads and edge contexts
let memoryStore: DatabaseStore | null = null;

async function ensureDataDirectory(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

async function loadStore(): Promise<DatabaseStore> {
  if (memoryStore) {
    return memoryStore;
  }

  try {
    await ensureDataDirectory();
    const data = await fs.readFile(STORE_PATH, 'utf-8');
    if (!data || data.trim() === '') {
      throw new Error('Empty store file');
    }
    const parsed = JSON.parse(data);
    // Ensure all arrays exist
    if (!parsed.projects || parsed.projects.length === 0) {
      parsed.projects = INITIAL_PROJECTS;
    }
    if (!parsed.services || parsed.services.length === 0) {
      parsed.services = INITIAL_SERVICES;
    }
    memoryStore = parsed;
    return memoryStore!;
  } catch {
    // Initialize default data if file does not exist or is invalid
    const initialStore: DatabaseStore = {
      projects: INITIAL_PROJECTS,
      services: INITIAL_SERVICES,
      blogPosts: INITIAL_BLOG_POSTS,
      testimonials: INITIAL_TESTIMONIALS,
      settings: INITIAL_SETTINGS,
      enquiries: INITIAL_ENQUIRIES,
      activityLogs: [
        {
          id: 'act-init-1',
          action: 'System Initialized',
          entityType: 'settings',
          details: { message: "Let's Think Studio core data layer initialized." },
          actorEmail: 'system@letsthinkstudio.com',
          createdAt: new Date().toISOString()
        }
      ]
    };
    memoryStore = initialStore;
    try {
      await fs.writeFile(STORE_PATH, JSON.stringify(initialStore, null, 2), 'utf-8');
    } catch {
      // Ignored
    }
    return initialStore;
  }
}

async function saveStore(store: DatabaseStore): Promise<void> {
  memoryStore = store;
  try {
    await ensureDataDirectory();
    // Write to a temporary file then rename for atomic safe write
    const tempPath = `${STORE_PATH}.tmp`;
    await fs.writeFile(tempPath, JSON.stringify(store, null, 2), 'utf-8');
    await fs.rename(tempPath, STORE_PATH);
  } catch (err) {
    console.error('Failed to write store to disk, maintained in memory:', err);
  }
}

// ----------------------------------------------------------------------------
// PROJECTS
// ----------------------------------------------------------------------------

export async function getProjects(status?: string): Promise<Project[]> {
  const store = await loadStore();
  let list = [...store.projects];
  if (status && status !== 'all') {
    list = list.filter(p => p.status === status);
  }
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const store = await loadStore();
  const found = store.projects.find(p => p.slug === slug);
  return found || null;
}

export async function saveProject(projectData: Partial<Project> & { title: string; category: string }): Promise<Project> {
  const store = await loadStore();
  const now = new Date().toISOString();
  
  const slug = projectData.slug || projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  if (projectData.id) {
    const index = store.projects.findIndex(p => p.id === projectData.id);
    if (index >= 0) {
      const updated: Project = {
        ...store.projects[index],
        ...projectData,
        slug,
        updatedAt: now
      };
      store.projects[index] = updated;
      await addActivityLog({
        action: 'Updated Project',
        entityType: 'project',
        entityId: updated.id,
        details: { title: updated.title, slug: updated.slug }
      });
      await saveStore(store);
      return updated;
    }
  }

  const newProject: Project = {
    id: `proj-${Date.now()}`,
    title: projectData.title,
    slug,
    clientName: projectData.clientName || '',
    industry: projectData.industry || '',
    projectYear: projectData.projectYear || new Date().getFullYear().toString(),
    category: projectData.category,
    servicesProvided: projectData.servicesProvided || [],
    shortDescription: projectData.shortDescription || '',
    projectBrief: projectData.projectBrief || '',
    businessChallenge: projectData.businessChallenge || '',
    creativeStrategy: projectData.creativeStrategy || '',
    designProcess: projectData.designProcess || '',
    finalSolution: projectData.finalSolution || '',
    verifiedResults: projectData.verifiedResults || '',
    coverImage: projectData.coverImage || 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    coverImageAlt: projectData.coverImageAlt || `${projectData.title} presentation`,
    galleryImages: projectData.galleryImages || [],
    featured: projectData.featured ?? false,
    displayOrder: projectData.displayOrder ?? (store.projects.length + 1),
    status: projectData.status || 'published',
    seoTitle: projectData.seoTitle || `${projectData.title} | Case Study | Let's Think Studio`,
    seoDescription: projectData.seoDescription || projectData.shortDescription,
    createdAt: now,
    updatedAt: now
  };

  store.projects.unshift(newProject);
  await addActivityLog({
    action: 'Created Project',
    entityType: 'project',
    entityId: newProject.id,
    details: { title: newProject.title, slug: newProject.slug }
  });
  await saveStore(store);
  return newProject;
}

export async function deleteProject(id: string): Promise<boolean> {
  const store = await loadStore();
  const initialLength = store.projects.length;
  store.projects = store.projects.filter(p => p.id !== id);
  if (store.projects.length !== initialLength) {
    await addActivityLog({
      action: 'Deleted Project',
      entityType: 'project',
      entityId: id
    });
    await saveStore(store);
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------------
// SERVICES
// ----------------------------------------------------------------------------

export async function getServices(status?: string): Promise<Service[]> {
  const store = await loadStore();
  let list = [...store.services];
  if (status && status !== 'all') {
    list = list.filter(s => s.status === status);
  }
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const store = await loadStore();
  const normalized = slug.toLowerCase().trim();
  const found = store.services.find(s => {
    if (s.slug === normalized) return true;
    if (normalized === 'brand-identity' && (s.slug === 'branding' || s.slug === 'brand-identity')) return true;
    if (normalized === 'branding' && (s.slug === 'brand-identity' || s.slug === 'branding')) return true;
    if (normalized === 'website-development' && (s.slug === 'web-development' || s.slug === 'website-development')) return true;
    if (normalized === 'web-development' && (s.slug === 'website-development' || s.slug === 'web-development')) return true;
    return false;
  });
  return found || null;
}

export async function saveService(serviceData: Partial<Service> & { title: string }): Promise<Service> {
  const store = await loadStore();
  const now = new Date().toISOString();
  const slug = serviceData.slug || serviceData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (serviceData.id) {
    const index = store.services.findIndex(s => s.id === serviceData.id);
    if (index >= 0) {
      const updated: Service = {
        ...store.services[index],
        ...serviceData,
        slug,
        updatedAt: now
      };
      store.services[index] = updated;
      await addActivityLog({
        action: 'Updated Service',
        entityType: 'service',
        entityId: updated.id,
        details: { title: updated.title }
      });
      await saveStore(store);
      return updated;
    }
  }

  const newService: Service = {
    id: `srv-${Date.now()}`,
    title: serviceData.title,
    slug,
    shortDescription: serviceData.shortDescription || '',
    headline: serviceData.headline || serviceData.title,
    introduction: serviceData.introduction || '',
    problemsSolved: serviceData.problemsSolved || [],
    deliverables: serviceData.deliverables || [],
    processSteps: serviceData.processSteps || [],
    imageUrl: serviceData.imageUrl || 'https://images.unsplash.com/photo-1542744094-3a31727221eb?q=80&w=1200&auto=format&fit=crop',
    iconName: serviceData.iconName || 'Layers',
    displayOrder: serviceData.displayOrder ?? (store.services.length + 1),
    status: serviceData.status || 'published',
    faqs: serviceData.faqs || [],
    seoTitle: serviceData.seoTitle || `${serviceData.title} | Let's Think Studio`,
    seoDescription: serviceData.seoDescription || serviceData.shortDescription,
    createdAt: now,
    updatedAt: now
  };

  store.services.push(newService);
  await addActivityLog({
    action: 'Created Service',
    entityType: 'service',
    entityId: newService.id,
    details: { title: newService.title }
  });
  await saveStore(store);
  return newService;
}

// ----------------------------------------------------------------------------
// ENQUIRIES (Lead Generation)
// ----------------------------------------------------------------------------

export async function getEnquiries(filters?: { status?: string; query?: string }): Promise<Enquiry[]> {
  const store = await loadStore();
  let list = [...store.enquiries];

  if (filters?.status && filters.status !== 'all') {
    list = list.filter(e => e.status === filters.status);
  }

  if (filters?.query) {
    const q = filters.query.toLowerCase();
    list = list.filter(e => 
      e.fullName.toLowerCase().includes(q) ||
      (e.companyName && e.companyName.toLowerCase().includes(q)) ||
      e.businessEmail.toLowerCase().includes(q) ||
      e.serviceRequired.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEnquiryById(id: string): Promise<Enquiry | null> {
  const store = await loadStore();
  return store.enquiries.find(e => e.id === id) || null;
}

export async function createEnquiry(data: {
  fullName: string;
  companyName?: string;
  businessEmail: string;
  phoneNumber?: string;
  serviceRequired: string;
  projectDescription: string;
  budgetRange: string;
  expectedTimeline: string;
  referralSource?: string;
  privacyConsent: boolean;
}): Promise<Enquiry> {
  const store = await loadStore();
  const now = new Date().toISOString();

  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    fullName: data.fullName,
    companyName: data.companyName || '',
    businessEmail: data.businessEmail,
    phoneNumber: data.phoneNumber || '',
    serviceRequired: data.serviceRequired,
    projectDescription: data.projectDescription,
    budgetRange: data.budgetRange,
    expectedTimeline: data.expectedTimeline,
    referralSource: data.referralSource || '',
    privacyConsent: data.privacyConsent,
    status: 'New',
    leadSource: 'Website Enquiry Form',
    internalNotes: '',
    notesHistory: [],
    createdAt: now,
    updatedAt: now
  };

  store.enquiries.unshift(newEnquiry);
  await addActivityLog({
    action: 'New Enquiry Submitted',
    entityType: 'enquiry',
    entityId: newEnquiry.id,
    details: { 
      client: newEnquiry.fullName, 
      company: newEnquiry.companyName, 
      service: newEnquiry.serviceRequired 
    }
  });

  await saveStore(store);
  return newEnquiry;
}

export async function updateEnquiry(id: string, updates: {
  status?: EnquiryStatus;
  followUpDate?: string;
  internalNotes?: string;
  newNote?: string;
  authorName?: string;
}): Promise<Enquiry | null> {
  const store = await loadStore();
  const index = store.enquiries.findIndex(e => e.id === id);
  if (index === -1) return null;

  const current = store.enquiries[index];
  const now = new Date().toISOString();
  
  const updatedNotesHistory = [...(current.notesHistory || [])];
  if (updates.newNote) {
    updatedNotesHistory.unshift({
      id: `note-${Date.now()}`,
      enquiryId: id,
      authorName: updates.authorName || 'Admin',
      noteContent: updates.newNote,
      createdAt: now
    });
  }

  const updated: Enquiry = {
    ...current,
    status: updates.status || current.status,
    followUpDate: updates.followUpDate !== undefined ? updates.followUpDate : current.followUpDate,
    internalNotes: updates.internalNotes !== undefined ? updates.internalNotes : current.internalNotes,
    notesHistory: updatedNotesHistory,
    updatedAt: now
  };

  store.enquiries[index] = updated;

  await addActivityLog({
    action: 'Updated Enquiry',
    entityType: 'enquiry',
    entityId: id,
    details: { status: updated.status, client: updated.fullName }
  });

  await saveStore(store);
  return updated;
}

// ----------------------------------------------------------------------------
// BLOG POSTS (Insights)
// ----------------------------------------------------------------------------

export async function getBlogPosts(status?: string): Promise<BlogPost[]> {
  const store = await loadStore();
  let list = [...store.blogPosts];
  if (status && status !== 'all') {
    list = list.filter(b => b.status === status);
  }
  return list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const store = await loadStore();
  return store.blogPosts.find(b => b.slug === slug) || null;
}

export async function saveBlogPost(postData: Partial<BlogPost> & { title: string }): Promise<BlogPost> {
  const store = await loadStore();
  const now = new Date().toISOString();
  const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (postData.id) {
    const index = store.blogPosts.findIndex(b => b.id === postData.id);
    if (index >= 0) {
      const updated: BlogPost = {
        ...store.blogPosts[index],
        ...postData,
        slug,
        updatedAt: now
      };
      store.blogPosts[index] = updated;
      await addActivityLog({
        action: 'Updated Article',
        entityType: 'blog',
        entityId: updated.id,
        details: { title: updated.title }
      });
      await saveStore(store);
      return updated;
    }
  }

  const newPost: BlogPost = {
    id: `blog-${Date.now()}`,
    title: postData.title,
    slug,
    excerpt: postData.excerpt || '',
    content: postData.content || '',
    featuredImage: postData.featuredImage || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    featuredImageAlt: postData.featuredImageAlt || postData.title,
    category: postData.category || 'Strategy',
    tags: postData.tags || ['Design', 'Strategy'],
    authorName: postData.authorName || "Let's Think Studio",
    readingTimeMinutes: postData.readingTimeMinutes || 5,
    status: postData.status || 'published',
    publishedAt: postData.publishedAt || now,
    seoTitle: postData.seoTitle || `${postData.title} | Let's Think Studio`,
    seoDescription: postData.seoDescription || postData.excerpt,
    createdAt: now,
    updatedAt: now
  };

  store.blogPosts.unshift(newPost);
  await addActivityLog({
    action: 'Created Article',
    entityType: 'blog',
    entityId: newPost.id,
    details: { title: newPost.title }
  });
  await saveStore(store);
  return newPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const store = await loadStore();
  const initialLength = store.blogPosts.length;
  store.blogPosts = store.blogPosts.filter(b => b.id !== id);
  if (store.blogPosts.length !== initialLength) {
    await addActivityLog({
      action: 'Deleted Article',
      entityType: 'blog',
      entityId: id
    });
    await saveStore(store);
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------------
// TESTIMONIALS
// ----------------------------------------------------------------------------

export async function getTestimonials(status?: string): Promise<Testimonial[]> {
  const store = await loadStore();
  let list = [...store.testimonials];
  if (status && status !== 'all') {
    list = list.filter(t => t.status === status);
  }
  return list.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function saveTestimonial(data: Partial<Testimonial> & { clientName: string; quote: string }): Promise<Testimonial> {
  const store = await loadStore();
  const now = new Date().toISOString();

  if (data.id) {
    const index = store.testimonials.findIndex(t => t.id === data.id);
    if (index >= 0) {
      const updated: Testimonial = {
        ...store.testimonials[index],
        ...data
      };
      store.testimonials[index] = updated;
      await saveStore(store);
      return updated;
    }
  }

  const newTestimonial: Testimonial = {
    id: `test-${Date.now()}`,
    clientName: data.clientName,
    clientRole: data.clientRole || 'Client',
    companyName: data.companyName || 'Company',
    quote: data.quote,
    clientAvatar: data.clientAvatar,
    companyLogo: data.companyLogo,
    projectSlug: data.projectSlug,
    displayOrder: data.displayOrder ?? (store.testimonials.length + 1),
    status: data.status || 'published',
    createdAt: now
  };

  store.testimonials.push(newTestimonial);
  await saveStore(store);
  return newTestimonial;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const store = await loadStore();
  const initial = store.testimonials.length;
  store.testimonials = store.testimonials.filter(t => t.id !== id);
  if (store.testimonials.length !== initial) {
    await saveStore(store);
    return true;
  }
  return false;
}

// ----------------------------------------------------------------------------
// SITE SETTINGS
// ----------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  const store = await loadStore();
  return store.settings;
}

export async function updateSiteSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
  const store = await loadStore();
  const updated: SiteSettings = {
    ...store.settings,
    ...updates,
    updatedAt: new Date().toISOString()
  };
  store.settings = updated;
  await addActivityLog({
    action: 'Updated Site Settings',
    entityType: 'settings',
    details: { fieldsUpdated: Object.keys(updates) }
  });
  await saveStore(store);
  return updated;
}

// ----------------------------------------------------------------------------
// ACTIVITY LOGS & DASHBOARD METRICS
// ----------------------------------------------------------------------------

export async function addActivityLog(log: Omit<ActivityLog, 'id' | 'createdAt'>): Promise<ActivityLog> {
  const store = await loadStore();
  const newLog: ActivityLog = {
    ...log,
    id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    actorEmail: log.actorEmail || 'admin@letsthinkstudio.com',
    createdAt: new Date().toISOString()
  };
  store.activityLogs.unshift(newLog);
  if (store.activityLogs.length > 100) {
    store.activityLogs = store.activityLogs.slice(0, 100);
  }
  return newLog;
}

export async function getActivityLogs(limit = 20): Promise<ActivityLog[]> {
  const store = await loadStore();
  return store.activityLogs.slice(0, limit);
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const store = await loadStore();
  
  const totalEnquiries = store.enquiries.length;
  const newEnquiries = store.enquiries.filter(e => e.status === 'New').length;
  const inProgressStatuses = ['Contacted', 'Meeting Scheduled', 'Proposal Sent'];
  const enquiriesInProgress = store.enquiries.filter(e => inProgressStatuses.includes(e.status)).length;
  const wonProjects = store.enquiries.filter(e => e.status === 'Won').length;
  
  const publishedProjects = store.projects.filter(p => p.status === 'published').length;
  const publishedArticles = store.blogPosts.filter(b => b.status === 'published').length;

  return {
    totalEnquiries,
    newEnquiries,
    enquiriesInProgress,
    wonProjects,
    publishedProjects,
    publishedArticles,
    recentEnquiries: store.enquiries.slice(0, 5),
    recentActivity: store.activityLogs.slice(0, 8)
  };
}
