export type ProjectStatus = 'published' | 'draft' | 'archived';

export interface Project {
  id: string;
  title: string;
  slug: string;
  clientName?: string;
  industry?: string;
  projectYear: string;
  category: string; // e.g. "Branding", "Websites and UI/UX", "Packaging"
  servicesProvided: string[];
  shortDescription: string;
  projectBrief?: string;
  businessChallenge?: string;
  creativeStrategy?: string;
  designProcess?: string;
  finalSolution?: string;
  verifiedResults?: string;
  coverImage: string;
  coverImageAlt?: string;
  galleryImages: string[];
  featured: boolean;
  displayOrder: number;
  status: ProjectStatus;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  displayOrder: number;
}

export type ServiceStatus = 'published' | 'draft';

export interface ServiceFAQ {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  headline: string;
  introduction: string;
  problemsSolved: string[];
  deliverables: string[];
  processSteps: ProcessStep[];
  imageUrl: string;
  iconName: string;
  displayOrder: number;
  status: ServiceStatus;
  faqs: ServiceFAQ[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 
  | 'New' 
  | 'Contacted' 
  | 'Meeting Scheduled' 
  | 'Proposal Sent' 
  | 'Won' 
  | 'Lost';

export interface EnquiryNote {
  id: string;
  enquiryId: string;
  authorName: string;
  noteContent: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
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
  status: EnquiryStatus;
  followUpDate?: string;
  leadSource?: string;
  internalNotes?: string;
  notesHistory?: EnquiryNote[];
  createdAt: string;
  updatedAt: string;
}

export type BlogPostStatus = 'published' | 'draft' | 'archived';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt?: string;
  category: string;
  tags: string[];
  authorName: string;
  readingTimeMinutes: number;
  status: BlogPostStatus;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  quote: string;
  clientAvatar?: string;
  companyLogo?: string;
  projectSlug?: string;
  displayOrder: number;
  status: 'published' | 'draft';
  createdAt: string;
}

export interface SiteSettings {
  studioName: string;
  tagline: string;
  shortBio: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  physicalAddress: string;
  accentColor: string;
  socialLinks: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    behance?: string;
    dribbble?: string;
  };
  seoDefaultTitle: string;
  seoDefaultDescription: string;
  footerText: string;
  notifyOnNewEnquiry: boolean;
  notificationEmail: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entityType: 'project' | 'service' | 'enquiry' | 'blog' | 'testimonial' | 'settings' | 'auth';
  entityId?: string;
  details?: Record<string, unknown>;
  actorEmail?: string;
  createdAt: string;
}

export interface DashboardMetrics {
  totalEnquiries: number;
  newEnquiries: number;
  enquiriesInProgress: number;
  wonProjects: number;
  publishedProjects: number;
  publishedArticles: number;
  recentEnquiries: Enquiry[];
  recentActivity: ActivityLog[];
}
