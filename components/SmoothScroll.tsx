'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import Navbar from '@/components/Navbar'
import { NavbarVisibilityContext } from '@/components/NavbarVisibilityContext'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [navbarVisible, setNavbarVisible] = useState(true)

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      duration: 0.6,
      wheelMultiplier: 1.2,
    });
    (window as any).__lenis = lenis;

    lenis.on('scroll', (instance: Lenis) => {
      if (instance.scroll < 80) {
        setNavbarVisible(true)
      } else {
        setNavbarVisible(instance.direction === -1)
      }
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
    <NavbarVisibilityContext.Provider value={navbarVisible}>
      <Navbar />
      <div ref={wrapperRef} className="flex-1 overflow-y-auto overscroll-y-contain">
        <div ref={contentRef}>{children}</div>
      </div>
    </NavbarVisibilityContext.Provider>
  )
}
