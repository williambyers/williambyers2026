'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Project } from '@/lib/projects';

function AccordionSection({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen);

  return (
    <div className="py-4 first:pt-0">
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2 text-[14px] font-medium text-white hover:text-neutral-400 transition-colors cursor-pointer w-full text-left">
        <span className="relative w-3 h-3.5 text-neutral-500">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'open' : 'closed'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {open ? '−' : '+'}
            </motion.span>
          </AnimatePresence>
        </span>
        {title}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CaseStudyInfo({ project }: { project: Project }) {
  const { title, caseStudy, website } = project;

  return (
    <div className="divide-y divide-neutral-800">
      <AccordionSection title="Informations" defaultOpen>
        <p className="text-[14px] text-white leading-relaxed mb-3">{caseStudy.tagline}</p>

        <div className="space-y-4">
          {caseStudy.body.map((para, i) => (
            <p key={i} className="text-[14px] text-neutral-500 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="inline-block mt-8 text-[14px] text-orange-500 hover:text-orange-400 transition-colors">
            Visit {new URL(website).hostname} website →
          </a>
        )}
      </AccordionSection>

      {caseStudy.credits && caseStudy.credits.length > 0 && (
        <AccordionSection title="Credits">
          <div className="space-y-2">
            {caseStudy.credits.map((credit) => (
              <div key={credit.role} className="flex items-baseline justify-between gap-4 text-[14px]">
                <span className="text-neutral-500">{credit.role}</span>
                <span className="text-white text-right">{credit.name}</span>
              </div>
            ))}
          </div>
        </AccordionSection>
      )}
    </div>
  );
}
