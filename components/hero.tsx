"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { useScrollContext } from "./scroll-context"
import { ArrowRight, Cpu, Layers, Code } from "lucide-react"

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const { scrollToSection } = useScrollContext()

  useEffect(() => {
    const tl = gsap.timeline()

    // Animate the gradient background
    gsap.to(".gradient-bg", {
      backgroundPosition: "200% 0%",
      duration: 15,
      repeat: -1,
      ease: "linear",
    })

    // Animate text elements
    tl.from(".hero-title", {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        ".hero-subtitle",
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".hero-description",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6",
      )
      .from(
        ".hero-buttons button",
        {
          y: 20,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4",
      )
      .from(
        ".floating-icon",
        {
          scale: 0,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.8",
      )

    // Floating animation for icons
    gsap.to(".floating-icon", {
      y: -15,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.3,
        from: "random",
      },
    })

    // Button hover animations
    const buttons = document.querySelectorAll(".hero-button")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", () => {})
        button.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="gradient-bg absolute inset-0 bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] bg-[length:200%_200%] z-0"></div>

      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#B7B1F2]/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-[#FDB7EA]/20 via-transparent to-transparent"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="floating-icon absolute top-[15%] left-[10%] p-3 rounded-full bg-[#B7B1F2]/10 backdrop-blur-sm">
          <Layers className="w-6 h-6 text-[#B7B1F2]" />
        </div>
        <div className="floating-icon absolute top-[25%] right-[15%] p-3 rounded-full bg-[#FDB7EA]/10 backdrop-blur-sm">
          <Cpu className="w-6 h-6 text-[#FDB7EA]" />
        </div>
        <div className="floating-icon absolute bottom-[30%] left-[20%] p-3 rounded-full bg-[#FFDCCC]/10 backdrop-blur-sm">
          <Code className="w-6 h-6 text-[#FFDCCC]" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6">
            <span className="block">Hi, I'm</span>
            <span className="bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent">
              Saritha Yadav
            </span>
          </h1>

          <h2 className="hero-subtitle text-2xl md:text-3xl font-medium mb-6 text-[#FFDCCC]">
            Graphic Designer || UI/UX Designer
          </h2>

          <div className="hero-description text-lg md:text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
            <p className="mb-4">
              <span className="text-xl font-semibold text-white">CAREER OBJECTIVE</span>
            </p>
            <p>
              Creative and detail-oriented{" "}
              <span className="text-[#FDB7EA] font-medium">Graphic Designer & UI/UX Designer</span> with a strong
              passion for visual storytelling, branding, and user experience design. Proficient in{" "}
              <span className="text-[#B7B1F2] font-medium">Figma, Canva, Adobe Photoshop, and Illustrator</span>, with
              hands-on experience in designing engaging digital and print media. Seeking a challenging role at{" "}
              <span className="text-[#FFDCCC] font-medium">APM Company</span> to create impactful designs and enhance
              brand identity.
            </p>
          </div>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="hero-button group px-8 py-4 rounded-full bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] text-gray-900 font-medium hover:shadow-lg transition-all flex items-center justify-center"
            >
              View My Portfolio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hero-button px-8 py-4 rounded-full bg-transparent border-2 border-[#B7B1F2] text-white font-medium hover:bg-[#B7B1F2]/10 transition-all"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}

