'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import Navbar from '@/components/Navbar'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      // lerp overrides duration/easing. Low lerp = smooth, heavily damped glide;
      // the multiplier buys back the speed so it covers ground fast without feeling abrupt.
      lerp: 0.055,
      wheelMultiplier: 1.9,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <Navbar />
      <div ref={wrapperRef} className="flex-1 overflow-y-auto overscroll-y-contain">
        <div ref={contentRef}>{children}</div>
      </div>
    </>
  )
}
