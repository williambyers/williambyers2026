'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { projects, type Project } from '@/lib/projects';


function projectTags(project: Project) {
  return (project.tags ?? project.subtitle.split('/').map((t) => t.trim())).join(', ');
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => {
        project.caseStudy.images.forEach((img) => {
          const el = new window.Image();
          el.src = img.src;
        });
      }}
      className="group text-left block w-full"
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-neutral-200">
        {project.coverImage && (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-opacity duration-500 group-hover:opacity-85"
            priority
          />
        )}
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-6">
        <span className="text-[14px] text-white">{project.title}</span>
        <span className="text-[14px] text-neutral-500 text-right">{projectTags(project)}</span>
      </div>
    </button>
  );
}

// How far one wheel tick sends the strip. Pairs with the low lerp in the tick loop:
// damped easing for smoothness, extra distance per gesture for speed.
const WHEEL_TRAVEL = 1.9;

const FADE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SLIDE_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const FADE = { duration: 0.38, ease: FADE_EASE };
const SLIDE = { duration: 0.65, ease: SLIDE_EASE };

/**
 * Dynamic variants, driven by AnimatePresence's `custom`. They have to be functions:
 * an exiting element keeps the props it was last rendered with, so a plain prop would
 * still read `false` on the viewer being replaced. `custom` is evaluated at exit time.
 *
 * Switching: outgoing travels left while the next arrives from the right — one scroll.
 * Opening/closing: a soft fade, with no sideways movement.
 */
const viewerVariants = {
  enter: (switching: boolean) =>
    switching ? { x: '100%', opacity: 1, scale: 1 } : { x: 0, opacity: 0, scale: 0.985 },
  center: (switching: boolean) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: switching ? SLIDE : FADE,
  }),
  exit: (switching: boolean) =>
    switching
      ? { x: '-100%', opacity: 1, scale: 1, transition: SLIDE }
      : { x: 0, opacity: 0, scale: 0.99, transition: FADE },
};

function ProjectInfo({ project }: { project: Project }) {
  return (
    <>
      {project.caseStudy.year && (
        <p className="text-[14px] text-white mb-4 md:mb-8">{project.caseStudy.year}</p>
      )}

      <p className="text-[14px] text-white leading-relaxed">{project.caseStudy.tagline}</p>

      {project.website && (
        <a
          href={project.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 md:mt-8 text-[14px] text-white hover:opacity-70 transition-opacity"
        >
          Website →
        </a>
      )}
    </>
  );
}

function ProjectViewer({
  project,
  nextProject,
  isSwitching,
  onNext,
  onClose,
}: {
  project: Project;
  nextProject: Project;
  isSwitching: boolean;
  onNext: () => void;
  onClose: () => void;
}) {
  const images = useMemo(
    () =>
      project.caseStudy.images.length
        ? project.caseStudy.images
        : project.coverImage
          ? [{ src: project.coverImage, alt: project.title }]
          : [],
    [project],
  );

  const scrollerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Vertical wheel drives horizontal travel, eased toward a target so it glides.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    let raf = 0;
    let running = false;

    const tick = () => {
      const delta = targetRef.current - el.scrollLeft;
      if (Math.abs(delta) < 0.5) {
        el.scrollLeft = targetRef.current;
        running = false;
        return;
      }
      // Low factor = smooth, damped glide; WHEEL_TRAVEL below buys back the speed.
      el.scrollLeft += delta * 0.06;
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      e.stopPropagation(); // Lenis is listening underneath
      // Below md the strip stacks and scrolls vertically — leave that to the browser.
      if (!window.matchMedia('(min-width: 768px)').matches) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();

      const max = el.scrollWidth - el.clientWidth;
      targetRef.current = Math.min(
        Math.max(targetRef.current + e.deltaY * WHEEL_TRAVEL, 0),
        max,
      );

      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <motion.div
      custom={isSwitching}
      variants={viewerVariants}
      initial="enter"
      animate="center"
      exit="exit"
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
    >
      {/* One list, two directions: stacked and scrolled vertically on mobile,
          a horizontal strip on desktop. */}
      <div
        ref={scrollerRef}
        // The viewer is a DOM descendant of Lenis's wrapper, so touch events bubble to it
        // and it blocks this element's native scrolling unless told to stand down.
        data-lenis-prevent
        className="absolute inset-0 no-scrollbar
                   overflow-y-auto overflow-x-hidden md:overflow-y-hidden md:overflow-x-auto
                   flex flex-col md:flex-row md:items-end
                   gap-10 md:gap-6
                   px-4 md:px-0 md:pl-8
                   pt-20 md:pt-16 pb-28 md:pb-10"
      >
        {/* Mobile only — on desktop this moves up into the header row beside Close */}
        <div className="shrink-0 md:hidden">
          <ProjectInfo project={project} />
        </div>

        {images.map((img, i) => (
          <div key={`${project.slug}-${i}`} className="shrink-0 w-full md:w-auto">
            <Image
              src={img.src}
              alt={img.alt}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 70vw"
              className="w-full h-auto md:h-[76vh] md:w-auto block"
              priority
            />
          </div>
        ))}

        {/* Desktop clips the oversized name to a sliver; mobile just wraps it */}
        {/* Width follows the name so it's never clipped; the strip just scrolls further */}
        <button
          onClick={onNext}
          className="shrink-0 text-left group flex flex-col justify-center
                     w-full md:w-auto md:pl-[8vw] md:pr-[8vw] md:h-[76vh]"
        >
          <span className="block text-[14px] text-neutral-500 mb-2 md:mb-6 group-hover:text-white transition-colors duration-300">
            Next project
          </span>
          <span
            className="block text-white leading-[0.9] md:leading-[0.85] md:whitespace-nowrap"
            style={{ fontSize: 'clamp(32px, 6vw, 96px)' }}
          >
            {nextProject.title}
          </span>
        </button>
      </div>

      {/* Desktop: the write-up stacks top-right, with Close alongside it */}
      <div className="hidden md:flex absolute top-0 right-8 z-[300] items-start gap-8 pt-5">
        <div className="flex flex-col text-[14px] text-white max-w-sm">
          {project.caseStudy.year && (
            <span className="text-neutral-500">{project.caseStudy.year}</span>
          )}
          <span>{project.title}</span>
          <span className="mt-3 leading-relaxed">{project.caseStudy.tagline}</span>
          {project.website && (
            <a
              href={project.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 self-start whitespace-nowrap hover:opacity-70 transition-opacity"
            >
              Website →
            </a>
          )}
        </div>

        <button
          onClick={onClose}
          className="shrink-0 text-[14px] text-white hover:opacity-70 transition-opacity"
        >
          Close
        </button>
      </div>

      {/* Mobile keeps Close pinned to the bottom */}
      <button
        onClick={onClose}
        className="md:hidden absolute z-[300] text-[14px] text-white hover:opacity-70 transition-opacity
                   bottom-6 left-1/2 -translate-x-1/2"
      >
        Close
      </button>
    </motion.div>
  );
}

export default function Home() {
  const [selected, setSelected] = useState<Project | null>(null);
  // Distinguishes project-to-project (slide) from open/close (fade).
  const [isSwitching, setIsSwitching] = useState(false);

  const open = (project: Project) => {
    setIsSwitching(false);
    setSelected(project);
  };

  const close = () => {
    setIsSwitching(false);
    setSelected(null);
  };

  const goNext = (from: Project) => {
    setIsSwitching(true);
    setSelected(projects[(projects.indexOf(from) + 1) % projects.length]);
  };

  useEffect(() => {
    const handler = () => close();
    window.addEventListener('closeOverlay', handler);
    return () => window.removeEventListener('closeOverlay', handler);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('projectOpen', { detail: Boolean(selected) }));
  }, [selected]);

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <h1 className="pt-32 pb-24 px-8 text-center text-[20px] uppercase leading-[1.5] max-w-2xl mx-auto">
          A Designer Specialising In Brand Identity, Campaign And Digital.
        </h1>

        <div id="work" className="px-8 pb-20 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-10">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} onClick={() => open(project)} />
          ))}
        </div>
      </div>

      {/* Keyed by slug so each project mounts fresh. Both are on screen during a switch,
          so the outgoing and incoming strips slide past each other without a gap. */}
      <AnimatePresence custom={isSwitching}>
        {selected && (
          <ProjectViewer
            key={selected.slug}
            project={selected}
            nextProject={projects[(projects.indexOf(selected) + 1) % projects.length]}
            isSwitching={isSwitching}
            onNext={() => goNext(selected)}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}
