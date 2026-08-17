// @flowtaris/sanity-studio - Desk Structure
import { type StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Flowtaris AI')
    .items([
      // AI Capabilities
      S.listItem()
        .title('AI Capabilities')
        .icon(() => '⚡')
        .child(
          S.documentTypeList('aiCapability')
            .title('AI Capabilities')
            .filter('_type == "aiCapability"')
            .defaultOrdering([{ field: 'maturity', direction: 'asc' }, { field: 'title', direction: 'asc' }])
        ),

      // Case Studies
      S.listItem()
        .title('Case Studies')
        .icon(() => '📊')
        .child(
          S.documentTypeList('caseStudy')
            .title('Case Studies')
            .filter('_type == "caseStudy"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      // Insights
      S.listItem()
        .title('Insights')
        .icon(() => '📝')
        .child(
          S.documentTypeList('insight')
            .title('Insights & Articles')
            .filter('_type == "insight"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),

      // Platform Pages
      S.listItem()
        .title('Platform Pages')
        .icon(() => '🔗')
        .child(
          S.documentTypeList('platformPage')
            .title('Platform Pages')
            .filter('_type == "platformPage"')
            .defaultOrdering([{ field: 'platform', direction: 'asc' }])
        ),

      S.divider(),

      // Configuration Documents
      S.listItem()
        .title('Assessment Configuration')
        .icon(() => '📋')
        .child(
          S.documentTypeList('assessmentConfig')
            .title('Assessment Configuration')
            .filter('_type == "assessmentConfig"')
        ),

      S.listItem()
        .title('ROI Calculator Configuration')
        .icon(() => '💰')
        .child(
          S.documentTypeList('roiConfig')
            .title('ROI Calculator Configuration')
            .filter('_type == "roiConfig"')
        ),

      S.listItem()
        .title('Cost of Inaction Configuration')
        .icon(() => '⚠️')
        .child(
          S.documentTypeList('inactionConfig')
            .title('Cost of Inaction Configuration')
            .filter('_type == "inactionConfig"')
        ),

      S.divider(),

      // Site Config (Singleton)
      S.listItem()
        .title('Site Configuration')
        .icon(() => '⚙️')
        .child(
          S.editor()
            .id('siteConfig')
            .schemaType('siteConfig')
            .documentId('siteConfig')
            .title('Site Configuration')
        ),
    ])