import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Flowtaris Admin Panel",
  description: "Admin panel for Flowtaris AI platform",
};

const navItems = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/site-config", label: "Site Configuration", icon: "⚙️" },
  { href: "/roi-config", label: "ROI Calculator Config", icon: "💰" },
  { href: "/assessment-config", label: "Assessment Config", icon: "📋" },
  { href: "/capabilities", label: "AI Capabilities", icon: "🧠" },
  { href: "/platforms", label: "ERP Platforms", icon: "🔗" },
  { href: "/case-studies", label: "Case Studies", icon: "📁" },
  { href: "/insights", label: "Insights & Blog", icon: "✍️" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full bg-gray-50 dark:bg-gray-950 flex font-sans antialiased">

        {/* ── Sidebar ────────────────────────────────────────────────── */}
        <aside className="w-64 min-h-screen bg-[#0a0f1a] border-r border-white/5 flex flex-col shrink-0">
          {/* Logo */}
          <div className="px-5 py-5 border-b border-white/5">
            <Link href="/" className="flex items-center gap-3 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.flowtaris.com/logo.svg"
                alt="Flowtaris"
                className="h-8 w-auto"
                onError={(e) => {
                  // Fallback to PNG if SVG fails
                  (e.target as HTMLImageElement).src = "https://www.flowtaris.com/logo.png";
                }}
              />
              <div>
                <span className="block text-sm font-bold text-white leading-none">Admin</span>
                <span className="block text-[10px] text-cyan-400 leading-none tracking-widest uppercase mt-0.5">Panel</span>
              </div>
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-white/5">
            <a
              href="https://flowtaris-ecosystem-flowtaris-ai.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 transition-colors"
            >
              <span>↗</span> View Live Site
            </a>
          </div>
        </aside>

        {/* ── Main Content ───────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Top bar */}
          <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 justify-between shrink-0">
            <h1 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Flowtaris Control Center</h1>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-500">Connected</span>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
