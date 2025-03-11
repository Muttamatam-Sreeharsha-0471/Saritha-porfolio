"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollContext } from "./scroll-context"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const { scrollToSection } = useScrollContext()

  const navItems = [
    { name: "Home", section: "hero" },
    { name: "About", section: "about" },
    { name: "Skills", section: "skills" },
    { name: "Projects", section: "projects" },
    { name: "Experience", section: "experience" },
    { name: "Contact", section: "contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    // Initialize GSAP animations for nav items
    const navLinks = navRef.current?.querySelectorAll(".nav-link")

    navLinks?.forEach((link) => {
      gsap.to(link, {
        scrollTrigger: {
          trigger: link,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      })

      // Hover animation
      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          scale: 1.1,
          color: "#FDB7EA",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          scale: 1,
          color: "white",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-12",
        isScrolled ? "bg-[#B7B1F2]/90 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent">
          Saritha Yadav
        </div>

        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.section}
              onClick={() => scrollToSection(item.section)}
              className="nav-link opacity-0 translate-y-4 text-white hover:text-[#FDB7EA] transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <button className="md:hidden text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  )
}

