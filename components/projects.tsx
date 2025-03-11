"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { ExternalLink, Github, Radio, Cpu, Zap, Layers } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  description: string
  image: string
  icon: React.ReactNode
  tags: string[]
  period: string
  links?: {
    demo?: string
    github?: string
  }
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)

  const projects: Project[] = [
    {
      title: "Metasurface 5G Antenna Using Python and MATLAB",
      description:
        "Developing advanced antenna designs for 5G applications using computational electromagnetics. Implementing machine learning algorithms for antenna pattern optimization. Utilizing Python and MATLAB for electromagnetic field simulation and analysis.",
      image: "/placeholder.svg?height=600&width=800",
      icon: <Radio className="w-full h-full" />,
      tags: ["Python", "MATLAB", "Electromagnetics", "Machine Learning"],
      period: "Current",
      links: {
        github: "#",
      },
    },
    {
      title: "PocketQube Satellite for Smart Campus",
      description:
        "Engineered miniaturized satellite system with integrated IoT capabilities. Implemented power-efficient communication protocols. Developed embedded firmware for satellite control systems.",
      image: "/placeholder.svg?height=600&width=800",
      icon: <Zap className="w-full h-full" />,
      tags: ["Embedded Systems", "IoT", "Satellite", "Firmware"],
      period: "2024 - Present",
      links: {
        demo: "#",
        github: "#",
      },
    },
    {
      title: "Circuit Simulation and Analysis Platform",
      description:
        "Developed advanced circuit simulation software with real-time analysis capabilities. Implemented digital signal processing algorithms for circuit behavior analysis. Created intuitive user interface for circuit parameter modification.",
      image: "/placeholder.svg?height=600&width=800",
      icon: <Cpu className="w-full h-full" />,
      tags: ["Circuit Design", "DSP", "UI/UX", "Simulation"],
      period: "September 2023",
      links: {
        demo: "#",
        github: "#",
      },
    },
    {
      title: "Portfolio UI/UX Design Project",
      description:
        "Designed and developed a responsive portfolio website with modern UI/UX principles. Implemented animations and interactive elements to enhance user experience. Created a cohesive visual identity across all pages.",
      image: "/placeholder.svg?height=600&width=800",
      icon: <Layers className="w-full h-full" />,
      tags: ["UI/UX Design", "Figma", "Web Design", "Responsive Design"],
      period: "2023",
      links: {
        demo: "#",
      },
    },
  ]

  useEffect(() => {
    // Animate section title
    gsap.from(".projects-title", {
      scrollTrigger: {
        trigger: ".projects-title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animate project cards
    const projectCards = projectsRef.current?.querySelectorAll(".project-card")

    projectCards?.forEach((card, index) => {
      // Initial state
      gsap.set(card, { y: 100, opacity: 0 })

      // Scroll animation
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      })

      // Hover animation for project overlay
      const overlay = card.querySelector(".project-overlay")
      const image = card.querySelector(".project-image")

      card.addEventListener("mouseenter", () => {
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        })

        gsap.to(image, {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        })

        gsap.to(image, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        })
      })
    })

    return () => {
      projectCards?.forEach((card) => {
        card.removeEventListener("mouseenter", () => {})
        card.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-[#1a1a1a] to-[#121212]">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="projects-title text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent">
          Technical Projects
        </h2>

        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <div key={index} className="project-card relative rounded-xl overflow-hidden shadow-xl">
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="project-image w-full h-full object-cover transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm flex items-center justify-center text-[#FDB7EA] z-10">
                  {project.icon}
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm text-xs text-white z-10">
                  {project.period}
                </div>
                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-200 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.links?.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-[#FDB7EA] transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}

                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-[#B7B1F2] transition-colors"
                      >
                        <Github size={16} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

