'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { projects, type Project, type CaseStudyImage } from '@/lib/projects';

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const tags = project.tags ?? project.subtitle.split('/').map((t) => t.trim());

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true);
        project.caseStudy.images.forEach((img) => {
          const el = new window.Image();
          el.src = img.src;
        });
      }}
      onMouseLeave={() => setHovered(false)}
      className="group text-left cursor-pointer"
    >
      <div className="relative w-full overflow-hidden bg-neutral-800 mb-3 rounded-md">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            width={0}
            height={0}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="w-full h-auto transition-opacity duration-300 group-hover:opacity-70"
            priority
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-neutral-900" />
        )}

        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              style={{ transformOrigin: 'top right' }}
              className="absolute top-2 right-2 flex flex-wrap justify-end gap-1 pointer-events-none"
            >
              {tags.map((tag) => (
                <span key={tag} className="bg-black/60 backdrop-blur-sm text-white text-[11px] px-2 py-1 rounded-md whitespace-nowrap">
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-[14px] text-white font-medium mb-1">{project.title}</p>
      <p className="text-[13px] text-neutral-500 leading-snug">{project.caseStudy.tagline}</p>
    </button>
  );
}

function groupImages(images: CaseStudyImage[]): Array<CaseStudyImage | [CaseStudyImage, CaseStudyImage]> {
  const groups: Array<CaseStudyImage | [CaseStudyImage, CaseStudyImage]> = [];
  let i = 0;
  while (i < images.length) {
    if (images[i].layout === 'half' && i + 1 < images.length && images[i + 1].layout === 'half') {
      groups.push([images[i], images[i + 1]]);
      i += 2;
    } else {
      groups.push(images[i]);
      i++;
    }
  }
  return groups;
}

function ProjectOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageGroups = groupImages(project.caseStudy.images);
  const tags = project.tags ?? project.subtitle.split('/').map((t) => t.trim());

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const stop = (e: WheelEvent) => e.stopPropagation();
    el.addEventListener('wheel', stop, { passive: true });
    return () => el.removeEventListener('wheel', stop);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      ref={overlayRef}
      initial={{ clipPath: 'circle(0% at 50% 100%)' }}
      animate={{ clipPath: 'circle(160% at 50% 100%)' }}
      exit={{ clipPath: 'circle(0% at 50% 100%)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto"
    >
      {/* Content fades in after overlay expands */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25, delay: 0.35 }}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[110] w-9 h-9 rounded-full bg-[#f5c800] flex items-center justify-center text-black text-sm font-semibold hover:scale-105 active:scale-95 transition-transform"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center pt-24 pb-14 px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-7">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 text-[13px] text-white/70 border border-white/20 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-white font-light tracking-tight leading-none mb-7" style={{ fontSize: 'clamp(52px, 9vw, 128px)' }}>
            {project.title}
          </h1>

          <p className="text-neutral-400 text-[14px] leading-relaxed max-w-[480px]">{project.caseStudy.tagline}</p>
        </div>

        {imageGroups.length > 0 && (
          <div className="space-y-3 pb-24 px-8 max-w-[1920px] mx-auto">
            {imageGroups.map((group, i) => {
              if (Array.isArray(group)) {
                return (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    {group.map((img) => (
                      <div key={img.src} className="relative aspect-square w-full overflow-hidden bg-neutral-900 rounded-md">
                        <Image src={img.src} alt={img.alt} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div key={group.src} className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900 rounded-md">
                  <Image src={group.src} alt={group.alt} fill className="object-cover" />
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <div className="pt-32 pb-24 px-6">
          <p className="text-neutral-400 text-[21px] mt-6 leading-relaxed max-w-xl">Elevating brands and transforming identity through the power of visual communication. </p>
        </div>

        <div id="work" className="pb-16 px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-12 items-start">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} onClick={() => setSelected(project)} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>{selected && <ProjectOverlay project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
}
