"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Text animation on scroll
    const textElements = textRef.current?.querySelectorAll(".animate-text")

    textElements?.forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      })
    })

    // Animate the gradient background
    gsap.to(".about-gradient", {
      backgroundPosition: "100% 0%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-[#121212] to-[#1a1a1a] overflow-hidden relative"
    >
      {/* Animated gradient background */}
      <div className="about-gradient absolute inset-0 opacity-10 bg-gradient-to-br from-[#FDB7EA] via-[#B7B1F2] to-[#FFDCCC] bg-[length:200%_200%] bg-[position:0%_0%]"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent">
          About Me
        </h2>

        <div ref={textRef} className="max-w-4xl mx-auto">
          <h3 className="animate-text text-2xl md:text-3xl font-semibold mb-6 text-[#FFDCCC]">
            ECE Student & Embedded Systems Enthusiast
          </h3>

          <p className="animate-text text-lg mb-6 text-gray-300 leading-relaxed">
            ECE student at DR.MGR Educational and Research Institution, Chennai, seeking an internship as an Embedded
            Systems Engineer. Eager to apply theoretical knowledge in circuit theory and electronic circuits, along with
            practical skills in Embedded systems, to contribute effectively to innovative electronic system development.
          </p>

          <div className="animate-text mt-10">
            <h4 className="text-xl font-semibold mb-4 text-[#B7B1F2]">Skills</h4>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 rounded-full bg-[#B7B1F2]/20 text-[#B7B1F2] text-sm">Python</span>
              <span className="px-4 py-2 rounded-full bg-[#FDB7EA]/20 text-[#FDB7EA] text-sm">C Programming</span>
              <span className="px-4 py-2 rounded-full bg-[#FFDCCC]/20 text-[#FFDCCC] text-sm">MS Office</span>
              <span className="px-4 py-2 rounded-full bg-[#FBF3B9]/20 text-[#FBF3B9] text-sm">Designing</span>
              <span className="px-4 py-2 rounded-full bg-[#B7B1F2]/20 text-[#B7B1F2] text-sm">Figma Design</span>
              <span className="px-4 py-2 rounded-full bg-[#FDB7EA]/20 text-[#FDB7EA] text-sm">Canva</span>
              <span className="px-4 py-2 rounded-full bg-[#FFDCCC]/20 text-[#FFDCCC] text-sm">UI/UX Design</span>
              <span className="px-4 py-2 rounded-full bg-[#FBF3B9]/20 text-[#FBF3B9] text-sm">PCB Designs</span>
              <span className="px-4 py-2 rounded-full bg-[#B7B1F2]/20 text-[#B7B1F2] text-sm">SQL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

