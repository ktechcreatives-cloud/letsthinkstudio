-- ==============================================================================
-- LET'S THINK STUDIO — SEED DATA SCRIPT
-- Execute after running 20260101000000_init_schema.sql
-- ==============================================================================

-- 1. Insert Initial Site Settings
INSERT INTO public.site_settings (key, value)
VALUES
(
    'general',
    '{
        "studioName": "Let''s Think Studio",
        "tagline": "Good ideas deserve great design.",
        "shortBio": "An independent creative studio that helps businesses build memorable brands and communicate through impactful design and digital experiences.",
        "contactEmail": "hello@letsthinkstudio.com",
        "contactPhone": "",
        "whatsappNumber": "",
        "physicalAddress": "",
        "accentColor": "#FF572D",
        "socialLinks": {
            "instagram": "https://instagram.com/letsthinkstudio",
            "linkedin": "https://linkedin.com/company/letsthinkstudio",
            "twitter": "https://x.com/letsthinkstudio",
            "behance": "https://behance.net/letsthinkstudio"
        },
        "seoDefaultTitle": "Let''s Think Studio | Creative Thinking Meets Strategic Execution",
        "seoDefaultDescription": "Independent creative agency specializing in brand identity, custom website design, packaging, and digital strategy. Think Beyond. Create With Purpose.",
        "footerText": "Let''s Think Studio. All rights reserved.",
        "notifyOnNewEnquiry": true,
        "notificationEmail": "leads@letsthinkstudio.com"
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 2. Insert Core Services
INSERT INTO public.services (
    title, slug, short_description, headline, introduction,
    problems_solved, deliverables, process_steps, image_url, icon_name, display_order, status, seo_title, seo_description
)
VALUES
(
    'Brand Strategy & Identity',
    'brand-identity',
    'Build a strong and memorable brand.',
    'Transforming Core Convictions into Unforgettable Brand Identities',
    'In saturated markets, differentiation is survival. We build comprehensive visual and verbal identities from the ground up—uniting naming, brand positioning, typographic systems, color theory, and bespoke design languages that command authority and captivate audiences.',
    ARRAY[
        'Inconsistent visual representation across digital and print touchpoints',
        'Lack of emotional resonance with target high-value clients',
        'Outdated brand perception failing to reflect current business maturity',
        'Difficulty establishing premium price positioning in competitive sectors'
    ],
    ARRAY[
        'Brand Positioning & Core Narrative Architecture',
        'Logotype, Monograms & Responsive Visual Marks',
        'Comprehensive Typography & Chromatic Systems',
        'Editorial Brand Identity Guidelines & Asset Library',
        'Brand Collateral, Stationery & Digital Templates',
        'Multi-channel Asset Kits (Figma, Vector, Web)'
    ],
    '[
        {"stepNumber": "01", "title": "Cultural & Strategic Audit", "description": "Analyzing competitive landscape, category tropes, and audience psychology."},
        {"stepNumber": "02", "title": "Visual Territory Exploration", "description": "Developing distinct conceptual territories with typography and art direction."},
        {"stepNumber": "03", "title": "Systemic Refinement", "description": "Perfecting chosen direction across physical and digital brand touchpoints."},
        {"stepNumber": "04", "title": "Brand Guidelines & Rollout", "description": "Delivering a comprehensive brand bible and master vector assets."}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
    'PenTool',
    1,
    'published',
    'Brand Strategy & Identity | Let''s Think Studio',
    'Strategic brand identity, positioning, and visual systems for ambitious companies.'
),
(
    'Graphic Design & Advertising',
    'graphic-design',
    'Creative designs for every platform.',
    'Art-Directed Visual Communication That Cuts Through Noise',
    'Visual design is not merely decoration—it is commercial persuasion. We produce thoughtful print media, large-scale outdoor campaigns, investor presentations, editorial monographs, and multi-format advertising that convey complex ideas with clarity and graphic impact.',
    ARRAY[
        'Cluttered marketing assets failing to communicate key value propositions',
        'Low conversion rates on social, display, and performance media',
        'Fragmented presentation between digital advertising and printed physical collateral',
        'Generic visual styling that fails to stand out against algorithmic feeds'
    ],
    ARRAY[
        'High-Impact Multi-Format Advertising Creative',
        'Editorial Reports, Monograph Layouts & Investor Decks',
        'Large-Format Billboard & Transit Out-of-Home Graphics',
        'Brand Collateral, Books, Menus & Physical Signage',
        'Social Media Campaign Toolkits & Motion Assets'
    ],
    '[
        {"stepNumber": "01", "title": "Message Distillation", "description": "Pinpointing singular key commercial idea needing communication."},
        {"stepNumber": "02", "title": "Art Direction & Concepting", "description": "Developing visual concepts that subvert visual fatigue."},
        {"stepNumber": "03", "title": "Production & Typesetting", "description": "Typesetting with microscopic kerning and color fidelity."},
        {"stepNumber": "04", "title": "Multi-Platform Export", "description": "Delivering production-ready print CMYK and screen assets."}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1542744094-3a31727221eb?q=80&w=1200&auto=format&fit=crop',
    'Palette',
    2,
    'published',
    'Graphic Design & Advertising | Let''s Think Studio',
    'Art-directed visual communication, editorial publications, and advertising.'
),
(
    'Digital Marketing Creatives',
    'digital-marketing',
    'Reach, engage, and convert your audience.',
    'Performance-Driven Creative Assets Engineered for Conversion',
    'Modern digital marketing demands a delicate equilibrium between algorithmic performance and brand prestige. We build creative asset systems that capture attention in sub-second view windows while cultivating long-term brand equity.',
    ARRAY[
        'Ad fatigue causing rising customer acquisition costs (CAC)',
        'Creative assets that drive cheap clicks but low-quality conversions',
        'Slow asset production bottlenecks delaying campaign launches',
        'Disconnect between ad creative and on-site landing page experience'
    ],
    ARRAY[
        'High-Conversion Static & Animated Ad Creative',
        'Performance Landing Page Design & Copywriting',
        'Omnichannel Campaign Asset Toolkits',
        'Email Marketing Design & Typography Templates',
        'Creative Testing Matrices & Iteration Frameworks'
    ],
    '[
        {"stepNumber": "01", "title": "Channel & Audience Analysis", "description": "Auditing past ad creative, acquisition bottlenecks, and benchmarks."},
        {"stepNumber": "02", "title": "Creative Hook Development", "description": "Writing and storyboarding distinct visual and copy angles."},
        {"stepNumber": "03", "title": "Asset Generation & Batching", "description": "Producing variations tailored for Instagram, LinkedIn, and Display."},
        {"stepNumber": "04", "title": "Post-Launch Creative Iteration", "description": "Reviewing performance metrics to double down on winning hooks."}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    'Megaphone',
    3,
    'published',
    'Digital Marketing Creatives | Let''s Think Studio',
    'Conversion-focused digital marketing creative systems for ambitious brands.'
),
(
    'Website Design & Development',
    'website-development',
    'Fast, modern, and responsive websites.',
    'Bespoke Digital Flagships That Merge Editorial Design With Engineering Rigor',
    'A studio website should be your brand''s most potent commercial asset. We engineer custom, lightning-fast web applications and marketing sites powered by Next.js, TypeScript, and modern headless architectures.',
    ARRAY[
        'Slow loading speeds and poor Core Web Vitals damaging SEO and conversion',
        'Cookie-cutter templates that fail to reflect company caliber',
        'Inflexible CMS architectures leaving marketing teams dependent on engineers',
        'Clunky mobile experiences frustrating high-intent visitors'
    ],
    ARRAY[
        'Custom Web Architecture (Next.js App Router, React, TypeScript)',
        'Fully Responsive Editorial UI/UX Design (Figma to Code)',
        'Custom Content Management System (Supabase / Headless CMS)',
        'Core Web Vitals Optimization (Sub-1s LCP, 0 CLS)',
        'Comprehensive On-Page SEO Architecture & Schema Structured Data',
        'Secure Lead Capture & CRM Webhook Integrations'
    ],
    '[
        {"stepNumber": "01", "title": "Information Architecture", "description": "Mapping user journeys, sitemaps, and conversion paths."},
        {"stepNumber": "02", "title": "Editorial Wireframing & UI", "description": "Designing high-fidelity screens with typographic precision."},
        {"stepNumber": "03", "title": "Clean Front-End Engineering", "description": "Building with Next.js, TypeScript, and Tailwind CSS."},
        {"stepNumber": "04", "title": "Performance Audit & Deployment", "description": "Auditing Core Web Vitals, accessibility, and deploying."}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    'Code',
    4,
    'published',
    'Website Design & Development | Let''s Think Studio',
    'High-performance Next.js websites and custom digital flagships.'
),
(
    'Packaging & Print Design',
    'packaging-print',
    'Impactful packaging that stands out.',
    'Tactile Physical Experiences That Command Shelf Presence',
    'In a world dominated by fleeting digital interactions, tactile physical artifacts possess immense staying power. We design bespoke packaging, luxury unboxing experiences, sustainable structural containers, and premium printed collateral.',
    ARRAY[
        'Generic packaging blending into retail shelves and e-commerce listings',
        'Structural failures resulting in shipping damage or poor unboxing sentiment',
        'Complex manufacturing requirements creating unpredictable supplier delays',
        'Inability to translate digital brand elegance into tangible physical materials'
    ],
    ARRAY[
        'Custom Structural Box & Carton Engineering',
        'Primary & Secondary Label Design Systems',
        'Specialty Finishes (Foil Stamping, Embossing, Spot UV, Letterpress)',
        'Factory-Ready Die-lines & Technical Production Blueprints',
        'Sustainable Material Sourcing & Substrate Selection Guides',
        'Physical Print Collateral (Catalogs, Lookbooks, Menus, Inserts)'
    ],
    '[
        {"stepNumber": "01", "title": "Material & Structural Sourcing", "description": "Selecting paper stocks, glass geometries, and finishes."},
        {"stepNumber": "02", "title": "Die-Line & Graphic Prototyping", "description": "Creating 3D renders and physical mockups for scale testing."},
        {"stepNumber": "03", "title": "Print Production Pre-Flight", "description": "Calibrating spot colors, varnish plates, and trapping."},
        {"stepNumber": "04", "title": "Press Check & Quality Assurance", "description": "Liaising with packaging manufacturers for flawless execution."}
    ]'::jsonb,
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop',
    'Package',
    5,
    'published',
    'Packaging & Print Design | Let''s Think Studio',
    'Tactile packaging, custom structural die-lines, and editorial print design.'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    headline = EXCLUDED.headline,
    introduction = EXCLUDED.introduction,
    problems_solved = EXCLUDED.problems_solved,
    deliverables = EXCLUDED.deliverables,
    process_steps = EXCLUDED.process_steps,
    image_url = EXCLUDED.image_url,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status;
