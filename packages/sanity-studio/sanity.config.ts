import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {deskStructure} from './plugins/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'flowtarisai',

  projectId: 's5kwr3ae',
  dataset: 'production',

  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})