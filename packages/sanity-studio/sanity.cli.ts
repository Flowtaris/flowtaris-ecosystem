import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 's5kwr3ae',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'fver3kz0yytsytb8srf082d3',
  },
  studioHost: 'flowtaris-ai'
})
