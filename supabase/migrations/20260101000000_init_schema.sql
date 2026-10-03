-- ==============================================================================
-- LET'S THINK STUDIO — PRODUCTION SUPABASE POSTGRESQL SCHEMA
-- Complete relational schema with RLS, Triggers, Indexes & Constraints
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Admin & Staff)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 2. PROJECT CATEGORIES
CREATE TABLE IF NOT EXISTS public.project_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 3. PROJECTS (Portfolio & Case Studies)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    client_name TEXT,
    industry TEXT,
    project_year TEXT NOT NULL,
    category_id UUID REFERENCES public.project_categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    services_provided TEXT[] DEFAULT '{}',
    short_description TEXT NOT NULL,
    project_brief TEXT,
    business_challenge TEXT,
    creative_strategy TEXT,
    design_process TEXT,
    final_solution TEXT,
    verified_results TEXT,
    cover_image TEXT NOT NULL,
    cover_image_alt TEXT,
    gallery_images TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 4. PROJECT IMAGES (Detailed project gallery assets)
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 5. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT NOT NULL,
    headline TEXT NOT NULL,
    introduction TEXT NOT NULL,
    problems_solved TEXT[] DEFAULT '{}',
    deliverables TEXT[] DEFAULT '{}',
    process_steps JSONB DEFAULT '[]'::jsonb,
    image_url TEXT,
    icon_name TEXT DEFAULT 'Layers',
    display_order INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 6. SERVICE FAQS
CREATE TABLE IF NOT EXISTS public.service_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 7. ENQUIRIES (Lead Generation)
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    business_email TEXT NOT NULL,
    phone_number TEXT,
    service_required TEXT NOT NULL,
    project_description TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    expected_timeline TEXT NOT NULL,
    referral_source TEXT,
    privacy_consent BOOLEAN NOT NULL DEFAULT true,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost')),
    follow_up_date DATE,
    lead_source TEXT DEFAULT 'Website Enquiry Form',
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 8. ENQUIRY NOTES
CREATE TABLE IF NOT EXISTS public.enquiry_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    note_content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 9. BLOG CATEGORIES
CREATE TABLE IF NOT EXISTS public.blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 10. BLOG POSTS (Insights)
CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    featured_image TEXT NOT NULL,
    featured_image_alt TEXT,
    category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
    category_name TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    author_name TEXT NOT NULL DEFAULT 'Let''s Think Studio',
    reading_time_minutes INT DEFAULT 5,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    seo_title TEXT,
    seo_description TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 11. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL,
    company_name TEXT NOT NULL,
    quote TEXT NOT NULL,
    client_avatar TEXT,
    company_logo TEXT,
    project_slug TEXT,
    display_order INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 12. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- 13. ACTIVITY LOGS
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB,
    actor_email TEXT,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- INDEXES FOR FAST RETRIEVAL
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);

-- AUTOMATIC UPDATED_AT TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_projects_modtime BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_services_modtime BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_enquiries_modtime BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION update_modified_column();
CREATE TRIGGER update_blog_posts_modtime BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_modified_column();

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Published records only)
CREATE POLICY "Public can view published projects" ON public.projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view project categories" ON public.project_categories FOR SELECT USING (true);
CREATE POLICY "Public can view project images" ON public.project_images FOR SELECT USING (true);
CREATE POLICY "Public can view published services" ON public.services FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view service faqs" ON public.service_faqs FOR SELECT USING (true);
CREATE POLICY "Public can view published blog posts" ON public.blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view blog categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Public can view published testimonials" ON public.testimonials FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);

-- PUBLIC INSERT POLICIES (Controlled Enquiry Submission)
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- ADMIN AUTH POLICIES (Full access to authenticated users)
CREATE POLICY "Admin full access profiles" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access project categories" ON public.project_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access project images" ON public.project_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access service faqs" ON public.service_faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access enquiries" ON public.enquiries FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access enquiry notes" ON public.enquiry_notes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blog posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blog categories" ON public.blog_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access site settings" ON public.site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access activity logs" ON public.activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);
