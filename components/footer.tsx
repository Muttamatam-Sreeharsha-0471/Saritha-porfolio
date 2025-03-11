"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useScrollContext } from "./scroll-context"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const { scrollToSection } = useScrollContext()

  useEffect(() => {
    // Animate footer elements
    gsap.from(footerRef.current?.querySelector(".footer-logo"), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
    })

    const footerLinks = footerRef.current?.querySelectorAll(".footer-link")
    footerLinks?.forEach((link, index) => {
      gsap.from(link, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: 0.1 * index,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      })
    })

    gsap.from(footerRef.current?.querySelector(".footer-copyright"), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      },
    })
  }, [])

  return (
    <footer ref={footerRef} className="py-12 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="footer-logo text-2xl font-bold bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent mb-6 md:mb-0">
            Saritha Yadav
          </div>

          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button
              onClick={() => scrollToSection("hero")}
              className="footer-link text-gray-400 hover:text-[#FDB7EA] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="footer-link text-gray-400 hover:text-[#FDB7EA] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="footer-link text-gray-400 hover:text-[#FDB7EA] transition-colors"
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="footer-link text-gray-400 hover:text-[#FDB7EA] transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className="footer-link text-gray-400 hover:text-[#FDB7EA] transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="footer-link text-gray-400 hover:text-[#FDB7EA] transition-colors"
            >
              Contact
            </button>
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="footer-copyright text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Saritha Yadav. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

