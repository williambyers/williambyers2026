'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const PROJECT_TYPES = [
  'Product renders — single hero',
  'Product renders — full range / catalogue',
  'Campaign / launch creative',
  'Packaging visuals & mockups',
  'Animation / motion',
  'Web design',
  'Graphic design (social, print, brochures)',
  'Not sure yet',
];
const BUDGETS = ['Under £1k', '£1–3k', '£3–7k', '£7k+', 'Ongoing / retainer', 'Not sure yet'];
const TIMELINES = ['ASAP / under 2 weeks', '1 month', '2–3 months', 'Just exploring'];
const REFERRALS = ['Search (Google etc.)', 'Social media', 'Word of mouth', 'LinkedIn', 'Other'];

const input =
  'w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors';

const select =
  'w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-neutral-600 transition-colors appearance-none cursor-pointer';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[13px] text-neutral-500 flex items-center gap-2">
        {label}
        {hint && <span className="text-neutral-600">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Pills({
  options, selected, onToggle, single,
}: {
  options: string[];
  selected: string | string[];
  onToggle: (v: string) => void;
  single?: boolean;
}) {
  const isActive = (o: string) =>
    single ? selected === o : (selected as string[]).includes(o);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => (
        <button
          key={o}
          type="button"
          onClick={() => onToggle(o)}
          className={`px-3 py-1.5 rounded-full text-[13px] border transition-colors ${
            isActive(o)
              ? 'bg-white text-black border-white'
              : 'border-neutral-700 text-neutral-500 hover:border-neutral-500 hover:text-white'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState('');
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [hasAssets, setHasAssets] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isFreelance = enquiryType === 'Freelance project';

  const toggleProjectType = (t: string) =>
    setProjectTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Wire up to your preferred endpoint here (Formspree, API route, etc.)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-white font-light mb-4" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
          Message sent.
        </h2>
        <p className="text-neutral-500 text-[14px] max-w-sm leading-relaxed">
          Thanks for reaching out — I&apos;ll get back to you within 1–2 working days.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-8 pt-36 pb-32 flex flex-col items-center">
      <div className="w-full max-w-lg">

        <p className="text-neutral-500 text-[13px] mb-5 uppercase tracking-widest">Contact</p>
        <h1 className="text-white font-light leading-none mb-16" style={{ fontSize: 'clamp(40px, 6vw, 90px)' }}>
          Let&apos;s work<br />together.
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-7">

          {/* Honeypot — hidden from humans, catches bots */}
          <input type="text" name="_honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

          <Field label="Name *">
            <input name="name" type="text" required placeholder="Your name" className={input} />
          </Field>

          <Field label="Email *">
            <input name="email" type="email" required placeholder="your@email.com" className={input} />
          </Field>

          <Field label="Company / brand" hint="— optional">
            <input name="company" type="text" placeholder="Where do you work?" className={input} />
          </Field>

          <Field label="What's this about? *">
            <div className="relative">
              <select
                name="enquiry_type"
                required
                value={enquiryType}
                onChange={e => setEnquiryType(e.target.value)}
                className={select}
              >
                <option value="" disabled>Select one…</option>
                {['Freelance project', 'Full-time role', 'Collaboration', 'Something else'].map(o => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">▾</span>
            </div>
          </Field>

          {/* Freelance-only fields */}
          <AnimatePresence initial={false}>
            {isFreelance && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden flex flex-col gap-7"
              >
                <Field label="What kind of work?">
                  <Pills options={PROJECT_TYPES} selected={projectTypes} onToggle={toggleProjectType} />
                </Field>

                <Field label="Budget">
                  <Pills options={BUDGETS} selected={budget} onToggle={v => setBudget(b => b === v ? '' : v)} single />
                </Field>

                <Field label="Timeline">
                  <Pills options={TIMELINES} selected={timeline} onToggle={v => setTimeline(t => t === v ? '' : v)} single />
                </Field>

                <Field label="Link to brief, product page, or existing assets" hint="— optional">
                  <input name="brief_url" type="url" placeholder="https://…" className={input} />
                </Field>

                <Field label="Do you have 3D assets / CAD files?">
                  <Pills options={['Yes', 'No', 'Not sure']} selected={hasAssets} onToggle={v => setHasAssets(a => a === v ? '' : v)} single />
                </Field>
              </motion.div>
            )}
          </AnimatePresence>

          <Field label="Message *">
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me about what you're working on, what you need, or just say hi."
              className={`${input} resize-none`}
            />
          </Field>

          <Field label="How did you hear about me?" hint="— optional">
            <div className="relative">
              <select name="referral" className={select}>
                <option value="">Select…</option>
                {REFERRALS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">▾</span>
            </div>
          </Field>

          {/* Consent */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={e => setConsent(e.target.checked)}
              required
              className="mt-0.5 accent-[#f5c800] shrink-0"
            />
            <span className="text-[13px] text-neutral-500 leading-relaxed">
              I&apos;m happy for William Byers to store this enquiry and use it to get in touch with me.
            </span>
          </label>

          <div>
            <button
              type="submit"
              className="bg-[#f5c800] text-black text-[14px] font-medium px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors"
            >
              Send message
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
