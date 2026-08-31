'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { feedImages, type FeedImage } from '@/lib/feed';

function useCols() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 768) setCols(2);
      else if (window.innerWidth < 1024) setCols(3);
      else setCols(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return cols;
}

function buildColumns<T>(items: T[], cols: number): T[][] {
  const columns: T[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => columns[i % cols].push(item));
  return columns;
}

function FeedCard({ img }: { img: FeedImage }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-md" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Image src={img.src} alt={img.alt} width={0} height={0} sizes="25vw" className="w-full h-auto block" />

      <AnimatePresence>
        {hovered && img.caption && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            style={{ transformOrigin: 'bottom left' }}
            className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-sm rounded-md px-4 py-3 pointer-events-none"
          >
            <p className="text-white text-[13px] leading-snug">{img.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FeedPage() {
  const cols = useCols();
  const columns = buildColumns(feedImages, cols);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-6">
      <div className="mb-16">
        <p className="text-neutral-500 text-[13px] mb-4 uppercase tracking-widest">Feed</p>
        <h1 className="font-light text-white leading-[0.9] mb-6" style={{ fontSize: 'clamp(40px, 6vw, 90px)' }}>
          Work &amp; process.
        </h1>
        <p className="text-neutral-500 text-[14px] max-w-md leading-relaxed">
          The stuff that doesn&apos;t fit a case study — client work, 3D renders, one-offs, and things made for the sake of it.
        </p>
      </div>

      {feedImages.length === 0 ? (
        <p className="text-neutral-600 text-[14px]">
          No images yet — add some to <code className="text-neutral-400">lib/feed.ts</code>.
        </p>
      ) : (
        <div className="flex gap-2">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-2 flex-1 min-w-0">
              {col.map((img, i) => (
                <FeedCard key={i} img={img} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
