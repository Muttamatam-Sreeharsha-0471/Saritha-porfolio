"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Player } from "@lottiefiles/react-lottie-player"

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  icon: string
  color: string
  level: number
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const skills: Skill[] = [
    { name: "Python", color: "#FFDCCC", level: 85 },
    { name: "C Programming", color: "#FBF3B9", level: 90 },
    { name: "MS Office", color: "#B7B1F2", level: 95 },
    { name: "Designing", color: "#B7B1F2", level: 85 },
    { name: "Figma desing", color: "#FFDCCC", level: 80 },
    { name: "Canva", color: "#FDB7EA", level: 75 },
    { name: "UI/UX design", color: "#FDB7EA", level: 90 },
    { name: "PCB Desings", color: "#B7B1F2", level: 95 },
    { name: "sql", color: "#FFDCCC", level: 85 },
  ]

  useEffect(() => {
    // Animate section title
    gsap.from(".skills-title", {
      scrollTrigger: {
        trigger: ".skills-title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animate skill cards
    const skillCards = gridRef.current?.querySelectorAll(".skill-card")

    skillCards?.forEach((card, index) => {
      // Initial state
      gsap.set(card, { y: 50, opacity: 0 })

      // Scroll animation
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out",
      })

      // Hover animation
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          scale: 1.05,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    return () => {
      skillCards?.forEach((card) => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 bg-[#1a1a1a]">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="skills-title text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent">
          My Skills
        </h2>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card bg-[#232323] rounded-xl p-6 shadow-lg transition-all duration-300">
              <div className="h-20 w-20 mx-auto mb-4">
                <Player autoplay loop src={skill.icon} style={{ height: "100%", width: "100%" }} />
              </div>

              <h3 className="text-xl font-semibold text-center mb-3" style={{ color: skill.color }}>
                {skill.name}
              </h3>

              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full"
                  style={{
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

