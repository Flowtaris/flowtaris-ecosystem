// @repo/ui - Code Stories
import type { Meta, StoryObj } from '@storybook/react'
import { Code, InlineCode } from '../code'

const meta: Meta<typeof Code> = {
  title: 'Primitives/Code',
  component: Code,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Syntax-highlighted code display with copy functionality, line numbers, and filename support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: 'select',
      options: ['tsx', 'ts', 'js', 'jsx', 'json', 'css', 'html', 'bash', 'python', 'rust', 'go'],
      description: 'Programming language for syntax highlighting',
    },
    showLineNumbers: {
      control: 'boolean',
      description: 'Show line numbers',
    },
    copyable: {
      control: 'boolean',
      description: 'Enable copy to clipboard',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height (e.g., "300px")',
    },
    filename: {
      control: 'text',
      description: 'Optional filename to display',
    },
  },
}

export default meta
type Story = StoryObj<typeof Code>

// Default
export const Default: Story = {
  args: {
    children: `export function Button({
  children,
  variant = 'default',
  size = 'default',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </button>
  )
}`,
    language: 'tsx',
    showLineNumbers: true,
    copyable: true,
  },
}

// With Filename
export const WithFilename: Story = {
  args: {
    filename: 'components/ui/button.tsx',
    children: `import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { buttonVariants } from './button.variants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
  loading?: boolean
  asChild?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, asChild, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = 'Button'`,
    language: 'tsx',
    showLineNumbers: true,
    copyable: true,
  },
}

// Without Line Numbers
export const NoLineNumbers: Story = {
  args: {
    children: `.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  transition: all 150ms ease;
}

.button:focus-visible {
  outline: none;
  ring: 2px;
  ring-offset: 2px;
}`,
    language: 'css',
    showLineNumbers: false,
    copyable: true,
  },
}

// JSON Example
export const JSONExample: Story = {
  args: {
    filename: 'package.json',
    children: `{
  "name": "@flowtaris/ui",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "dev": "next dev",
    "build": "tsc && next build",
    "lint": "next lint",
    "test": "vitest run",
    "storybook": "storybook dev -p 6006"
  },
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0"
  }
}`,
    language: 'json',
    showLineNumbers: true,
    copyable: true,
  },
}

// Bash/Shell
export const BashExample: Story = {
  args: {
    filename: 'deploy.sh',
    children: `#!/bin/bash
# Deployment script for Flowtaris AI

set -e

echo "🚀 Starting deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Run tests
echo "🧪 Running tests..."
npm run test

# Deploy to Vercel
echo "☁️ Deploying to Vercel..."
vercel --prod --token=$VERCEL_TOKEN

# Verify deployment
echo "✅ Verifying deployment..."
curl -f https://flowtaris.ai/api/health || exit 1

echo "🎉 Deployment complete!"`,
    language: 'bash',
    showLineNumbers: true,
    copyable: true,
  },
}

// Max Height
export const WithMaxHeight: Story = {
  args: {
    filename: 'long-file.tsx',
    maxHeight: '200px',
    children: `// This is a very long file that demonstrates the maxHeight prop
// It will show a scrollbar when the content exceeds the specified height

import React, { useState, useEffect, useCallback, useMemo } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  createdAt: Date
  updatedAt: Date
}

interface UserListProps {
  users: User[]
  onSelect: (user: User) => void
  filter?: string
  sortBy?: keyof User
  sortOrder?: 'asc' | 'desc'
}

export function UserList({ users, onSelect, filter, sortBy, sortOrder }: UserListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => !filter || user.name.toLowerCase().includes(filter.toLowerCase()))
      .sort((a, b) => {
        if (!sortBy) return 0
        const aVal = a[sortBy]
        const bVal = b[sortBy]
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [users, filter, sortBy, sortOrder])

  const handleRowClick = useCallback((user: User) => {
    setSelectedId(user.id)
    onSelect(user)
  }, [onSelect])

  const toggleExpand = useCallback((id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  return (
    <div className="space-y-2">
      {filteredUsers.map(user => (
        <UserRow
          key={user.id}
          user={user}
          isSelected={selectedId === user.id}
          isExpanded={expandedRows.has(user.id)}
          onClick={handleRowClick}
          onToggleExpand={toggleExpand}
        />
      ))}
    </div>
  )
}

function UserRow({ user, isSelected, isExpanded, onClick, onToggleExpand }: {
  user: User
  isSelected: boolean
  isExpanded: boolean
  onClick: (user: User) => void
  onToggleExpand: (id: string) => void
}) {
  return (
    <div
      className={\`p-4 rounded-lg border transition-colors \${
        isSelected
          ? 'bg-brand-cyan-50 border-brand-cyan-200 dark:bg-brand-cyan-900/20 dark:border-brand-cyan-800'
          : 'bg-white border-neutral-200 dark:bg-neutral-950 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900'
      }\`}
      onClick={() => onClick(user)}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-brand-cyan-100 dark:bg-brand-cyan-900/30 flex items-center justify-center">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="w-full h-full rounded-full" />
          ) : (
            <span className="font-medium text-brand-cyan-600 dark:text-brand-cyan-400">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-neutral-900 dark:text-white truncate">
            {user.name}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
            {user.email}
          </p>
        </div>
        <span className="px-2 py-1 text-xs font-medium rounded-full \$
          user.role === 'admin'
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
            : user.role === 'user'
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
            : 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-400'
        \}>
          {user.role}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleExpand(user.id)
          }}
          className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          <ChevronDown className={\`h-5 w-5 transition-transform \${isExpanded ? 'rotate-180' : ''}\`} />
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-neutral-500">Created:</span>
              <span className="ml-2 font-mono">{user.createdAt.toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-neutral-500">Updated:</span>
              <span className="ml-2 font-mono">{user.updatedAt.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}`,
    language: 'tsx',
    showLineNumbers: true,
    copyable: true,
  },
}

// InlineCode
export const InlineCodeExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <p className="text-body-md text-neutral-600 dark:text-neutral-400">
        Use the <InlineCode>Button</InlineCode> component for primary actions, and <InlineCode>Card</InlineCode> for content containers.
      </p>
      <p className="text-body-md text-neutral-600 dark:text-neutral-400">
        The <InlineCode>cn()</InlineCode> utility combines <InlineCode>clsx</InlineCode> and <InlineCode>tailwind-merge</InlineCode> for className handling.
      </p>
      <p className="text-body-md text-neutral-600 dark:text-neutral-400">
        Run <InlineCode>npm run dev</InlineCode> to start the development server on <InlineCode>localhost:3000</InlineCode>.
      </p>
      <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg">
        <p className="font-mono text-sm text-neutral-700 dark:text-neutral-300">
          Import with: <InlineCode>{`import { Button, Card } from '@repo/ui'`}</InlineCode>
        </p>
      </div>
    </div>
  ),
}

// Dark Mode
export const DarkMode: Story = {
  args: {
    filename: 'theme-config.ts',
    children: `export const themeConfig = {
  colors: {
    primary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      500: '#14b8a6',
      900: '#134e4a',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      900: '#171717',
      950: '#0a0a0a',
    },
  },
  fonts: {
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },
  radius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
  },
}`,
    language: 'ts',
    showLineNumbers: true,
    copyable: true,
  },
  decorators: [
    (Story) => (
      <div className="dark p-8">
        <Story />
      </div>
    ),
  ],
}