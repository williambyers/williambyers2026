'use client';

import { useRef, useEffect, type ReactNode } from 'react';

// Captures wheel events before Lenis (which sits on a parent element)
// so that vertical trackpad scroll drives horizontal position instead.
export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation(); // stops Lenis (parent bubble listener) from firing
      el.scrollLeft += e.deltaX + e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div
      ref={ref}
      className="h-full flex flex-row items-center overflow-x-scroll"
      style={{
        gap: '3vw',
        paddingLeft: '10vw',
        paddingRight: '10vw',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none' as React.CSSProperties['msOverflowStyle'],
      }}
    >
      {children}
    </div>
  );
}
