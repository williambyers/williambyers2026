'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useNavbarVisible } from '@/components/NavbarVisibilityContext';

const CHARS = 'hello@williambyers.co'.split('');

const HOVER_TRANSFORMS = [
  { r: -14, y: 3 }, { r: 10, y: -4 }, { r: -8, y: 5 }, { r: 16, y: -3 }, { r: -12, y: 4 },
  { r: 18, y: -5 }, { r: -10, y: 3 }, { r: 14, y: -4 }, { r: -16, y: 5 }, { r: 8, y: -3 },
  { r: -18, y: 4 }, { r: 12, y: -5 }, { r: -6, y: 3 }, { r: 16, y: -4 }, { r: -14, y: 5 },
  { r: 10, y: -3 }, { r: -12, y: 4 }, { r: 18, y: -5 }, { r: -8, y: 3 }, { r: 14, y: -4 },
  { r: -10, y: 5 },
];

export default function Navbar() {
  const visible = useNavbarVisible();
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleWorkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/') {
      (window as any).__lenis?.scrollTo('#work', { offset: -96, duration: 1 });
    } else {
      router.push('/#work');
    }
  };

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="px-6 h-24 flex items-center justify-between">
        <Link href="/" className="text-[14px] font-medium text-white">
          William Byers
        </Link>

        <div className="flex items-center gap-8">
          <a href="/#work" onClick={handleWorkClick} className="text-[14px] font-medium text-neutral-500 hover:text-white transition-colors cursor-pointer">
            Work
          </a>
          <Link href="/feed" className="text-[14px] font-medium text-neutral-500 hover:text-white transition-colors">
            Feed
          </Link>
          <Link href="/about" className="text-[14px] font-medium text-neutral-500 hover:text-white transition-colors">
            About
          </Link>
        </div>

        <Link
          href="mailto:hello@williambyers.co"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="text-[14px] font-medium text-black bg-[#f5c800] px-4 py-1.5 rounded-full inline-flex items-center"
        >
          {CHARS.map((char, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                transform: hovered ? `rotate(${HOVER_TRANSFORMS[i].r}deg) translateY(${HOVER_TRANSFORMS[i].y}px)` : 'rotate(0deg) translateY(0px)',
                transition: hovered ? `transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 30}ms` : 'transform 140ms ease 0ms',
              }}
            >
              {char}
            </span>
          ))}
        </Link>
      </div>
    </header>
  );
}
