import type { Preview } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from '@repo/ui'
import '../apps/flowtaris-ai/src/app/globals.css'

// Global decorators
const decorators = [
  // Theme provider wrapper with default dark theme
  (Story: React.FC) => (
    <ThemeProvider defaultTheme="dark" enableSystem={false}>
      <div className="bg-surface-layer4 min-h-screen text-brand-navy-900 dark:text-brand-white">
        <Story />
      </div>
    </ThemeProvider>
  ),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0f1a' },
        { name: 'brand-navy', value: '#051022' },
        { name: 'brand-cyan', value: '#00b8db' },
      ],
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard', enabled: true },
        ],
      },
    },
    nextjs: {
      appDirectory: true,
    },
    // Global types for all components
    globalTypes: {
      theme: {
        description: 'Global theme for components',
        defaultValue: 'dark',
        toolbar: {
          title: 'Theme',
          icon: 'circlehollow',
          items: ['light', 'dark'],
          dynamicTitle: true,
        },
      },
    },
  },
  decorators,
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
}

export default preview