import Script from "next/script";

const siteDescription =
  "Senior Frontend Engineer with 12+ years at Federal Reserve, BNY Mellon & Morgan Stanley. Building AI-powered SaaS products. Based in NYC/NJ, available globally.";

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://heitindersingh.dev/#website",
      url: "https://heitindersingh.dev",
      name: "Heitinder Singh",
      description: siteDescription,
    },
    {
      "@type": "ProfilePage",
      "@id": "https://heitindersingh.dev/#profilepage",
      url: "https://heitindersingh.dev",
      name: "Heitinder Singh | Senior Frontend Engineer",
      mainEntity: {
        "@type": "Person",
        "@id": "https://heitindersingh.dev/#person",
        name: "Heitinder Singh",
        jobTitle: "Senior Frontend Engineer",
        description: siteDescription,
        url: "https://heitindersingh.dev",
        sameAs: [
          "https://www.linkedin.com/in/heitinder-singh-23107718a/",
          "https://github.com/heitinders",
        ],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Angular",
          "AI Integration",
          "Frontend Engineering",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Federal Reserve Bank of New York",
        },
        alumniOf: [
          { "@type": "Organization", name: "BNY Mellon" },
          { "@type": "Organization", name: "Morgan Stanley" },
          { "@type": "Organization", name: "Verizon" },
          { "@type": "Organization", name: "T-Mobile" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "New York",
          addressRegion: "NY",
          addressCountry: "US",
        },
      },
    },
  ],
});

export default function JsonLd() {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      strategy="afterInteractive"
    >
      {jsonLd}
    </Script>
  );
}
