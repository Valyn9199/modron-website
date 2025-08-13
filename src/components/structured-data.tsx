export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "logo": "https://www.modron.com/Modron_logo.png",
    "description": "Australia's green GPU infrastructure — solar powered, immersion cooled, and enterprise-ready.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressLocality": "Sydney",
      "addressRegion": "NSW"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contact@modron.com"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Infrastructure Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Training Infrastructure",
            "description": "High-performance GPU clusters for AI model training"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Green Computing Solutions",
            "description": "Sustainable, solar-powered computing infrastructure"
          }
        }
      ]
    }
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MODRON",
    "url": "https://www.modron.com",
    "description": "Sustainable AI Infrastructure - Green GPU Computing Solutions"
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Sustainable AI Infrastructure",
    "description": "Australia's green GPU infrastructure — solar powered, immersion cooled, and enterprise-ready.",
    "provider": {
      "@type": "Organization",
      "name": "MODRON"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "serviceType": "AI Computing Infrastructure",
    "category": "Technology Services",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Infrastructure Services"
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
