import { site } from '@/site';

/**
 * دادهٔ ساختاریافته (JSON-LD) از همان src/site.ts ساخته می‌شود تا
 * هرگز با متن صفحه یکی‌نبودن پیدا نکند. React 19 این <script> را به <head> منتقل می‌کند.
 */
export default function Seo() {
  const physician = {
    '@context': 'https://schema.org',
    '@type': ['Physician', 'MedicalClinic'],
    '@id': 'https://milanorezaee2.github.io/doctor/#physician',
    name: site.brand.nameFa,
    alternateName: site.brand.nameEn,
    description: site.brand.tagline,
    url: 'https://milanorezaee2.github.io/doctor/',
    telephone: site.contact.telE164,
    email: site.contact.email,
    inLanguage: 'fa-IR',
    availableLanguage: ['fa', 'en'],
    image: 'https://milanorezaee2.github.io/doctor/og.png',
    areaServed: { '@type': 'City', name: 'تهران' },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IR',
      addressLocality: 'تهران',
      streetAddress: site.contact.address,
    },
    medicalSpecialty: ['Acupuncture', 'PhysicalTherapy'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    sameAs: [site.social.youtube].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'خدمات تخصصی',
      itemListElement: site.services.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'MedicalTherapy',
          name: s.title,
          description: s.desc,
        },
      })),
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: site.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: site.navigation.map((l, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: l.label,
      item: `https://milanorezaee2.github.io/doctor/#${l.id}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(physician)}</script>
      <script type="application/ld+json">{JSON.stringify(faqPage)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </>
  );
}
