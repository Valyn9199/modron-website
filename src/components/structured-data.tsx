export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "logo": "https://www.modron.com/Modron_logo.png",
    "description": "High-availability enterprise AI compute infrastructure with SLA-backed hosting and sustainable GPU rentals",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@modron.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Enterprise AI Infrastructure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Enterprise AI Training Infrastructure",
            "description": "High-performance GPU clusters for enterprise AI model training in Asia Pacific"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Green Computing Solutions",
            "description": "Sustainable, solar-powered computing infrastructure for Asia Pacific region"
          }
        }
      ]
    },
    "areaServed": ["Global", "Australia", "Asia Pacific", "APAC", "US", "Europe"],
    "serviceType": "Enterprise AI Compute Infrastructure",
    "slogan": "Sustainable enterprise AI compute for global enterprises"
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "description": "High-availability enterprise AI compute infrastructure with SLA-backed hosting. Sustainable GPU rentals with immersion cooling, solar power, and global availability."
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Enterprise AI Infrastructure",
    "description": "High-availability enterprise AI compute infrastructure with SLA-backed hosting and sustainable GPU rentals",
    "provider": {
      "@type": "Organization",
      "name": "MODRON"
    },
    "areaServed": ["Global", "Australia", "Asia Pacific", "APAC", "US", "Europe"],
    "serviceType": "Enterprise AI Computing Infrastructure",
    "category": "Technology Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Enterprise AI Infrastructure Services"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.modron.com"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  )
}
