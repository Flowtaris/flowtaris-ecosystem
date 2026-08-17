// @flowtaris/sanity-studio - Singleton Action
import { defineAction } from 'sanity'

export const singletonAction = defineAction({
  name: 'singletonPublish',
  title: 'Publish',
  icon: () => '📄',
  handle: async ({ patch, publish }) => {
    await patch({ set: { _id: 'siteConfig' } }).commit()
    await publish()
  },
})