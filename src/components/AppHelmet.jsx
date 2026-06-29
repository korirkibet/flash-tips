import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function AppHelmet({ title, location, description, keywords }) {
  const canonicalUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://flashviptips.com'}${location || ''}`;
  const pageTitle = `${title} | Flash VIP Tips - Fixed VIP Football Predictions`;
  const defaultDesc = "Get the latest Fixed VIP Tips, Football Predictions, Betting Odds and live scores for Premier League, Championship, La Liga, Bundesliga, Serie A and all major leagues worldwide.";
  const metaDesc = description || defaultDesc;
  const metaKeywords = keywords || "football predictions, betting tips, vip tips, fixed matches, premier league tips, soccer predictions, football betting";

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{pageTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={metaDesc} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Flash VIP Tips" />
      <meta name="theme-color" content="#007bff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/logo512.png" />
      <meta property="og:image:alt" content="Flash VIP Tips Logo" />
      <meta property="og:site_name" content="Flash VIP Tips" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content="/logo512.png" />

      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="icon" type="image/png" href="/logo16.png" sizes="16x16" />
      <link rel="icon" type="image/png" href="/logo32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/logo192.png" sizes="192x192" />
    </Helmet>
  );
}
