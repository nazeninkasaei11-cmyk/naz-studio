import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  jsonLd?: object;
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "InteriorDesigner",
  "name": "Naz Studio",
  "description": "Luxury interior design studio in Brisbane, Australia. Creating bespoke homes and timeless interiors.",
  "url": "https://nazstudio.com.au",
  "logo": "https://nazstudio.com.au/favicon.png",
  "image": "https://nazstudio.com.au/images/hero-background.png",
  "telephone": "+61451433314",
  "email": "info@nazstudio.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20 Robinson Rd E",
    "addressLocality": "Virginia",
    "addressRegion": "QLD",
    "postalCode": "4014",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.4282,
    "longitude": 153.0650
  },
  "areaServed": {
    "@type": "Place",
    "name": "Brisbane, Queensland, Australia"
  },
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.instagram.com/nazstudio.com.au/",
    "https://www.facebook.com/profile.php?id=61585530939751"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Naz Studio",
  "url": "https://nazstudio.com.au",
  "description": "Luxury interior design studio in Brisbane, Australia"
};

export function SEO({ title, description, canonical, image, jsonLd }: SEOProps) {
  const siteUrl = "https://nazstudio.com.au";
  const fullTitle = `${title} | Naz Studio`;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const ogImage = image || `${siteUrl}/images/hero-background.png`;

  const structuredData = jsonLd || (canonical === "/" ? [localBusinessSchema, websiteSchema] : null);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
        </script>
      )}
    </Helmet>
  );
}
