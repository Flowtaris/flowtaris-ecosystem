export * from './siteConfig'
export * from './platformPage'
export * from './aiCapability'
export * from './caseStudy'
export * from './insight'
export * from './assessmentConfig'
export * from './roiConfig'

export const schemaTypes = [
  require('./siteConfig').default,
  require('./platformPage').default,
  require('./aiCapability').default,
  require('./caseStudy').default,
  require('./insight').default,
  require('./assessmentConfig').default,
  require('./roiConfig').default,
]