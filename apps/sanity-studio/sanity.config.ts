import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '5gbgq9zl'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'flowtaris-ai',
  title: 'Flowtaris AI Studio',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('siteConfig').title('Site Configuration'),
            S.divider(),
            S.documentTypeListItem('platformPage').title('Platform Pages'),
            S.documentTypeListItem('aiCapability').title('AI Capabilities'),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
            S.documentTypeListItem('insight').title('Insights & Blog'),
            S.divider(),
            S.documentTypeListItem('assessmentConfig').title('Assessment Config'),
            S.documentTypeListItem('roiConfig').title('ROI Calculator Config'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})