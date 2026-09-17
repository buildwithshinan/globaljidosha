"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface GSAPWrapperProps {
  children: React.ReactNode
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale"
  delay?: number
  duration?: number
  className?: string
}

export default function GSAPWrapper({
  children,
  animation = "fadeIn",
  delay = 0,
  duration = 1,
  className = "",
}: GSAPWrapperProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")

        gsap.registerPlugin(ScrollTrigger)

        if (elementRef.current) {
          let fromProps: any = {}
          let toProps: any = {}

          switch (animation) {
            case "fadeIn":
              fromProps = { opacity: 0 }
              toProps = { opacity: 1 }
              break
            case "slideUp":
              fromProps = { opacity: 0, y: 50 }
              toProps = { opacity: 1, y: 0 }
              break
            case "slideLeft":
              fromProps = { opacity: 0, x: 50 }
              toProps = { opacity: 1, x: 0 }
              break
            case "slideRight":
              fromProps = { opacity: 0, x: -50 }
              toProps = { opacity: 1, x: 0 }
              break
            case "scale":
              fromProps = { opacity: 0, scale: 0.8 }
              toProps = { opacity: 1, scale: 1 }
              break
          }

          gsap.fromTo(elementRef.current, fromProps, {
            ...toProps,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: elementRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          })
        }
      } catch (error) {
        console.warn("GSAP failed to load:", error)
      }
    }

    loadGSAP()
  }, [animation, delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}
