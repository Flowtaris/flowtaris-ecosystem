// @flowtaris/cms-client - Sanity CMS client with GROQ queries and typegen

import { createClient } from 'next-sanity'
import {groq} from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
})

// Preview client for draft mode
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts',
})

export function getClient(preview = false) {
  return preview ? previewClient : client
}

// GROQ Queries
export const queries = {
  // Site config
  siteConfig: groq`*[_type == "siteConfig"][0]{
    navigation,
    footer,
    socialLinks,
    schemaOrg,
    defaults
  }`,

  // AI Capabilities
  allCapabilities: groq`*[_type == "aiCapability"] | order(order asc) {
    _id,
    title,
    slug,
    category,
    platforms,
    maturity,
    shortDescription,
    longDescription,
    metrics[],
    technicalDetails,
    demoVideo,
    icon,
    order,
    seo,
    geoSignals
  }`,

  capabilityBySlug: groq`*[_type == "aiCapability" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    category,
    platforms,
    maturity,
    shortDescription,
    longDescription,
    metrics[],
    technicalDetails,
    demoVideo,
    icon,
    order,
    seo,
    geoSignals,
    relatedCaseStudies[]->{_id, title, slug, client, results[]}
  }`,

  // Case Studies
  allCaseStudies: groq`*[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    slug,
    client,
    industry,
    platforms,
    challenge,
    solution,
    results[],
    timeline,
    testimonial,
    heroImage,
    metricHighlights[],
    order,
    seo,
    geoSignals
  }`,

  caseStudyBySlug: groq`*[_type == "caseStudy" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    client,
    industry,
    platforms,
    challenge,
    solution,
    results[],
    timeline,
    testimonial,
    heroImage,
    metricHighlights[],
    order,
    seo,
    geoSignals,
    relatedCapabilities[]->{_id, title, slug, category}
  }`,

  caseStudiesByPlatform: groq`*[_type == "caseStudy" && $platform in platforms] | order(order asc) {
    _id,
    title,
    slug,
    client,
    industry,
    platforms,
    challenge,
    solution,
    results[],
    timeline,
    testimonial,
    heroImage,
    metricHighlights[],
    order,
    seo,
    geoSignals
  }`,

  // Assessment Config
  assessmentConfig: groq`*[_type == "assessmentConfig"][0]{
    questions[],
    recommendationRules[],
    capabilityMapping
  }`,

  // ROI Config
  roiConfig: groq`*[_type == "roiConfig"][0]{
    assumptions,
    formulas,
    benchmarks,
    platformMultipliers
  }`,

  // Insights
  allInsights: groq`*[_type == "insight"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author,
    excerpt,
    richText,
    topicClusters[],
    faqItems[],
    citations[],
    relatedCapabilities[]->{_id, title, slug},
    publishedAt,
    seo,
    geoSignals
  }`,

  insightBySlug: groq`*[_type == "insight" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    author,
    excerpt,
    richText,
    topicClusters[],
    faqItems[],
    citations[],
    relatedCapabilities[]->{_id, title, slug},
    publishedAt,
    seo,
    geoSignals
  }`,

  // Platform Pages
  allPlatformPages: groq`*[_type == "platformPage"] {
    _id,
    platform,
    slug,
    overview,
    capabilities[],
    integrations[],
    certifications[],
    faq[],
    seo,
    geoSignals
  }`,

  platformPageBySlug: groq`*[_type == "platformPage" && slug.current == $slug][0]{
    _id,
    platform,
    slug,
    overview,
    capabilities[],
    integrations[],
    certifications[],
    faq[],
    seo,
    geoSignals
  }`,
} as const

export type {
  SanityClient,
} from 'next-sanity'