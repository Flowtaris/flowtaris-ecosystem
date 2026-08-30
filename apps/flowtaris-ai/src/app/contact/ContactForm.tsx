'use client'

import { useState } from 'react'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Button, Input, Label, Textarea, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@repo/ui'
import { ArrowRight, ChevronRight, Mail, Phone, MapPin, MessageSquare, Calendar, Clock, Building2, User, Send, Loader2, CheckCircle, BarChart3 } from 'lucide-react'

const contactReasons = [
  { value: 'demo', label: 'Request Live Demo', description: 'See GenAI Document Intelligence on your ERP' },
  { value: 'assessment', label: 'Guided Assessment', description: 'Workshop with our solutions architects' },
  { value: 'pricing', label: 'Pricing & Licensing', description: 'Custom quote for your volume and platform' },
  { value: 'partnership', label: 'Partnership Inquiry', description: 'iPaaS, SI, or technology partnerships' },
  { value: 'press', label: 'Press & Media', description: 'Media inquiries and speaker requests' },
  { value: 'careers', label: 'Careers', description: 'Join our team (see careers page)' },
  { value: 'support', label: 'Technical Support', description: 'Existing customer support request' },
  { value: 'other', label: 'Other', description: 'General inquiry' },
]

const offices = [
  {
    name: 'Headquarters',
    location: 'Palo Alto, CA',
    address: '525 University Ave, Palo Alto, CA 94301',
    phone: '+1 (650) 555-0100',
    email: 'hello@flowtaris.ai',
    hours: 'Mon-Fri 9am-6pm PT',
  },
  {
    name: 'EMEA Office',
    location: 'London, UK',
    address: '100 Bishopsgate, London EC2N 4AG',
    phone: '+44 20 7946 0123',
    email: 'emea@flowtaris.ai',
    hours: 'Mon-Fri 9am-6pm GMT',
  },
  {
    name: 'APAC Office',
    location: 'Singapore',
    address: '8 Marina Boulevard, Singapore 018981',
    phone: '+65 6123 4567',
    email: 'apac@flowtaris.ai',
    hours: 'Mon-Fri 9am-6pm SGT',
  },
]

export default function ContactForm() {
  const [showForm, setShowForm] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowForm(false)
  }

  const handleReset = () => {
    setShowForm(true)
    const form = document.getElementById('contact-form') as HTMLFormElement | null
    form?.reset()
  }

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Contact<br/>Us',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Ready to transform your finance operations? Request a live demo, start a guided assessment, or ask us anything. We typically respond within 48 hours.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        stats={{
          items: [
            { label: '<4 hrs', value: 'Avg Response' },
            { label: '3', value: 'Global Offices' },
            { label: '50+', value: 'Team Members' },
            { label: '98%', value: 'CSAT Score' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        {/* Contact Form */}
        <section className="py-24 px-6" aria-labelledby="contact-heading">
          <Container size="xl">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Form */}
              <div className="lg:col-span-2">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-headline-lg">Send Us a Message</CardTitle>
                    <p className="text-body-md text-neutral-400">We'll route your inquiry to the right team and respond within 48 hours.</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {showForm && (
                      <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <Label htmlFor="firstName" className="block text-body-sm text-neutral-300 mb-2">
                              First Name *
                            </Label>
                            <Input id="firstName" name="firstName" type="text" placeholder="John" required className="glass" />
                          </div>
                          <div>
                            <Label htmlFor="lastName" className="block text-body-sm text-neutral-300 mb-2">
                              Last Name *
                            </Label>
                            <Input id="lastName" name="lastName" type="text" placeholder="Doe" required className="glass" />
                          </div>
                          <div>
                            <Label htmlFor="email" className="block text-body-sm text-neutral-300 mb-2">
                              Work Email *
                            </Label>
                            <Input id="email" name="email" type="email" placeholder="john@company.com" required className="glass" />
                          </div>
                          <div>
                            <Label htmlFor="company" className="block text-body-sm text-neutral-300 mb-2">
                              Company *
                            </Label>
                            <Input id="company" name="company" type="text" placeholder="Acme Corp" required className="glass" />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="reason" className="block text-body-sm text-neutral-300 mb-2">
                              Reason for Contact *
                            </Label>
                            <Select defaultValue="demo">
                              <SelectTrigger className="glass">
                                <SelectValue placeholder="Select reason" />
                              </SelectTrigger>
                              <SelectContent>
                                {contactReasons.map((reason) => (
                                  <SelectItem key={reason.value} value={reason.value}>
                                    {reason.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="platform" className="block text-body-sm text-neutral-300 mb-2">
                              Primary ERP Platform
                            </Label>
                            <Select defaultValue="netsuite">
                              <SelectTrigger className="glass">
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="netsuite">NetSuite</SelectItem>
                                <SelectItem value="coupa">Coupa</SelectItem>
                                <SelectItem value="sap">SAP S/4HANA</SelectItem>
                                <SelectItem value="workday">Workday</SelectItem>
                                <SelectItem value="multi">Multi-Platform</SelectItem>
                                <SelectItem value="other">Other / Not Sure</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="volume" className="block text-body-sm text-neutral-300 mb-2">
                              Annual Invoice Volume (approx.)
                            </Label>
                            <Select defaultValue="10k-50k">
                              <SelectTrigger className="glass">
                                <SelectValue placeholder="Select volume" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="<10k">Under 10,000</SelectItem>
                                <SelectItem value="10k-50k">10,000 - 50,000</SelectItem>
                                <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                                <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                                <SelectItem value="500k+">500,000+</SelectItem>
                                <SelectItem value="unknown">Not Sure</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="message" className="block text-body-sm text-neutral-300 mb-2">
                            Message *
                          </Label>
                          <Textarea
                            id="message"
                            name="message"
                            placeholder="Tell us about your challenges, timeline, and what you're looking to achieve..."
                            className="glass min-h-[150px] resize-y"
                            required
                          />
                        </div>

                        <div className="glass rounded-xl p-4 border border-brand-amber-500/20 bg-brand-amber-500/5">
                          <p className="text-body-sm text-brand-amber-300 flex items-start gap-2">
                            <span className="flex-shrink-0 mt-0.5">✓</span>
                            <span>By submitting, you agree to our <a href="/privacy" className="underline hover:text-brand-amber-200">Privacy Policy</a> and consent to being contacted by Flowtaris AI. We'll never share your data.</span>
                          </p>
                        </div>

                        <Button type="submit" size="lg" className="glass-strong w-full md:w-auto px-10 py-4" id="submit-btn">
                          <Send className="mr-2 h-5 w-5" />
                          Send Message
                        </Button>
                      </form>
                    )}

                    {/* Success State (client-side simulation) */}
                    {!showForm && (
                      <div id="success-message" className="glass-strong rounded-xl p-8 text-center border border-brand-green-500/30 bg-brand-green-500/5">
                        <div className="w-16 h-16 rounded-full bg-brand-green-500/20 flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="h-8 w-8 text-brand-green-400" />
                        </div>
                        <h3 className="text-headline-lg text-brand-green-400 mb-2">Message Sent!</h3>
                        <p className="text-body-md text-neutral-300 mb-6">Thanks for reaching out. Our team will respond within 48 hours.</p>
                        <Button variant="outline" className="glass" onClick={handleReset}>
                          Send Another Message
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-headline-lg">Other Ways to Connect</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-5 w-5 text-brand-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-headline-sm text-white">Schedule a Call</h4>
                        <p className="text-body-sm text-neutral-400">Book 30 min with a solutions architect</p>
                        <Button variant="ghost" size="sm" className="mt-2" asChild>
                          <a href="#contact-form">
                            Contact Us to Schedule
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="h-5 w-5 text-brand-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-headline-sm text-white">Start Free Assessment</h4>
                        <p className="text-body-sm text-neutral-400">3-minute diagnostic → personalized roadmap</p>
                        <Button variant="ghost" size="sm" className="mt-2" asChild>
                          <a href="/assessment">
                            Take Assessment
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>


                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-headline-lg">Global Offices</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="border-t border-white/10 pt-6 first:border-0 first:pt-0">
                      <h4 className="text-headline-sm text-white flex items-center gap-2">
                        <Mail className="h-4 w-4 text-brand-cyan-400" />
                        General Inquiries
                      </h4>
                      <div className="space-y-2 mt-2 text-body-sm text-neutral-300">
                        <p className="flex items-center gap-2">
                          <a href="mailto:contact@flowtaris.com" className="hover:text-brand-cyan-400 transition-colors">contact@flowtaris.com</a>
                        </p>
                        <p className="text-neutral-400">
                          Reach out directly and we'll route your request to the appropriate team.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        </section>

        {/* FAQ / Quick Links */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="faq-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full max-w-3xl mx-auto">
              <header className="text-center">
                <h2 id="faq-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Quick Answers
                </h2>
              </header>

              <div className="space-y-4">
                {[
                  { q: 'How quickly can I see a demo?', a: 'Usually within 1-2 business days. We customize the demo to your ERP (NetSuite, Coupa, SAP, Workday) and use case.' },
                  { q: 'What\'s the typical implementation timeline?', a: 'Quick Wins (GenAI Document Intelligence): 3-4 weeks. Full platform: 8-12 weeks. Multi-platform: 12-16 weeks.' },
                  { q: 'Do you offer a free trial or POC?', a: 'Yes. Qualified enterprises can run a 4-week Proof of Concept on their own data with full platform access.' },
                  { q: 'How does pricing work?', a: 'Platform subscription + volume-based processing fees. Volume discounts at 50K, 100K, 500K+ invoices/year. Contact us for a custom quote.' },
                  { q: 'What\'s your data security posture?', a: 'SOC2 Type II (Pending), ISO 27001 (Pending), GDPR, CCPA compliant. EU AI Act (Pending). Data encrypted at rest (AES-256) and in transit (TLS 1.3). Never used for model training.' },
                  { q: 'Can you integrate with our iPaaS (MuleSoft, Boomi, Celigo)?', a: 'Yes. We have certified connectors for MuleSoft, Boomi, Celigo, and Workato. Also native APIs for custom integrations.' },
                ].map((faq, i) => (
                  <Card key={i} className="glass-card">
                    <CardContent className="p-6">
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer list-none text-headline-sm text-white">
                          {faq.q}
                          <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="text-body-md text-neutral-300 mt-4 pb-2">{faq.a}</p>
                      </details>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Stack>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center border border-brand-cyan-500/30 bg-gradient-to-r from-brand-cyan-500/5 to-transparent">
              <h2 className="text-display-lg text-gradient-brand mb-6 text-balance">
                Prefer to Start Self-Serve?
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Take our 3-minute diagnostic for an instant AI automation roadmap, or calculate your ROI with live sliders.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="glass-strong px-10 py-4" asChild>
                  <a href="/assessment">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="glass px-10 py-4" asChild>
                  <a href="/roi-calculator">
                    Calculate ROI
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>


    </div>
  )
}