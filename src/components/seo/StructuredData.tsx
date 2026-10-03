import React from 'react';

export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://letsthinkstudio.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: "Let's Think Studio",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    description: "An independent creative studio that helps businesses build memorable brands and communicate through impactful design and digital experiences.",
    email: "hello@letsthinkstudio.com",
    priceRange: '$$$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://instagram.com/letsthinkstudio',
      'https://linkedin.com/company/letsthinkstudio',
      'https://x.com/letsthinkstudio',
      'https://behance.net/letsthinkstudio'
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
