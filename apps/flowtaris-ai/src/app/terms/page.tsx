import { Metadata } from 'next'
import { Container, Card, CardContent } from '@repo/ui'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Flowtaris AI',
  description: 'Flowtaris AI Terms of Service. Information about your rights and responsibilities when using our services.',
}

export default function TermsPage() {
  return (
    <div className="flex flex-col flex-1 w-full pt-32 pb-24">
      <Container size="lg">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <FileText className="h-4 w-4 text-brand-cyan-400" />
            <span className="text-[10px] font-bold tracking-[0.16em] text-white/50 uppercase">Legal & Compliance</span>
          </div>
          <h1 className="text-display-lg text-white mb-6">Terms of Service</h1>
          <p className="text-headline-sm text-neutral-400">
            Effective Date: September 1, 2026
          </p>
        </div>

        <Card className="glass-card">
          <CardContent className="p-8 md:p-12 prose prose-invert max-w-none prose-p:text-neutral-300 prose-headings:text-white prose-a:text-[#E8A020]">

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Flowtaris AI website and services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Enterprise Services</h2>
            <p>
              Flowtaris AI provides enterprise AI automation tools. Specific terms regarding uptime, service level agreements (SLAs), and implementation will be detailed in the individual Master Services Agreement (MSA) signed with your organization.
            </p>

            <h2>3. Intellectual Property Rights</h2>
            <p>
              The Site and its original content, features, and functionality are owned by Flowtaris AI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>

            <h2>4. Limitation of Liability</h2>
            <p>
              In no event shall Flowtaris AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>

            <h2>5. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact our legal team through our standard contact forms.
            </p>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
