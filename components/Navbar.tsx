'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// pointer-events-auto because the header itself is transparent to clicks — see below.
const linkClass =
  'text-[14px] pointer-events-auto hover:opacity-70 transition-[opacity,color] duration-300';

export default function Navbar() {
  // The project viewer puts its own Close top-right, so these step aside while it's open.
  const [projectOpen, setProjectOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => setProjectOpen(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener('projectOpen', handler);
    return () => window.removeEventListener('projectOpen', handler);
  }, []);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-[200] pointer-events-none text-white">
      <div className="px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className={linkClass}
          onClick={() => window.dispatchEvent(new CustomEvent('closeOverlay'))}
        >
          William Byers
        </Link>

        {!projectOpen && (
          <a href="mailto:hello@williambyers.co" className={linkClass}>
            hello@williambyers.co
          </a>
        )}
      </div>
    </header>
  );
}
