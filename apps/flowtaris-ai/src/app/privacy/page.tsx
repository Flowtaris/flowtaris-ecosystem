import { Metadata } from 'next'
import { Container, Card, CardContent } from '@repo/ui'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Flowtaris AI',
  description: 'Flowtaris AI Privacy Policy. Information about how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col flex-1 w-full pt-32 pb-24">
      <Container size="lg">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Shield className="h-4 w-4 text-brand-cyan-400" />
            <span className="text-[10px] font-bold tracking-[0.16em] text-white/50 uppercase">Legal & Compliance</span>
          </div>
          <h1 className="text-display-lg text-white mb-6">Privacy Policy</h1>
          <p className="text-headline-sm text-neutral-400">
            Effective Date: September 1, 2026
          </p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-8 md:p-12 prose prose-invert max-w-none prose-p:text-neutral-300 prose-headings:text-white prose-a:text-[#E8A020]">

            <h2>1. Introduction</h2>
            <p>
              Flowtaris AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our enterprise AI automation services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We may collect information about you in a variety of ways, including:
            </p>
            <ul>
              <li><strong>Personal Data:</strong> Name, email address, phone number, and company details provided via contact forms or assessment wizards.</li>
              <li><strong>Usage Data:</strong> Information automatically collected when accessing the site, such as IP addresses, browser types, and interaction metrics.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul>
              <li>Respond to your inquiries and offer customer support.</li>
              <li>Deliver our enterprise AI automation solutions and platform updates.</li>
              <li>Improve website performance and user experience.</li>
            </ul>

            <h2>4. Disclosure of Your Information</h2>
            <p>
              We do not sell, trade, or rent your Personal Data to third parties. We may share information with trusted third-party service providers (Processors) who assist us in operating our website and conducting our business, so long as those parties agree to keep this information confidential and secure.
            </p>

            <h2>5. Security of Your Information</h2>
            <p>
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
            </p>

            <h2>6. Contact Us</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact us at:
              <br /><br />
              <strong>Flowtaris AI Legal Department</strong><br />
              Email: privacy@flowtaris.com
            </p>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
