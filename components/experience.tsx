"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Cpu, CircuitBoardIcon as Circuit, Layers } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Experience {
  company: string
  role: string
  period: string
  description: string[]
  icon: React.ReactNode
  color: string
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const experiences: Experience[] = [
    {
      company: "Wiztech Automation Solutions",
      role: "Embedded Systems Engineering Intern",
      period: "March 2024",
      description: [
        "Implemented real-time embedded applications using advanced MCU architectures",
        "Developed firmware for peripheral interfaces including LCD drivers and ADC modules",
        "Optimized embedded C code for resource-constrained environments",
        "Utilized RTOS concepts for multi-threaded embedded applications",
      ],
      icon: <Cpu className="w-full h-full text-[#FDB7EA]" />,
      color: "#FDB7EA",
    },
    {
      company: "PHOENIX SOFTECH",
      role: "Embedded Systems Intern",
      period: "2024",
      description: [
        "Mastered embedded system architecture and firmware development",
        "Implemented interrupt-driven programming for real-time applications",
        "Developed efficient algorithms for embedded system optimization",
      ],
      icon: <Circuit className="w-full h-full text-[#B7B1F2]" />,
      color: "#B7B1F2",
    },
    {
      company: "TVS Training Center",
      role: "Hardware Design Intern",
      period: "September 2023",
      description: [
        "Designed and implemented PCB layouts using Proteus Design Suite",
        "Utilized advanced routing techniques for signal integrity optimization",
        "Implemented best practices for EMI/EMC compliance",
      ],
      icon: <Layers className="w-full h-full text-[#FFDCCC]" />,
      color: "#FFDCCC",
    },
  ]

  useEffect(() => {
    // Animate section title
    gsap.from(".experience-title", {
      scrollTrigger: {
        trigger: ".experience-title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animate timeline items
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item")

    timelineItems?.forEach((item, index) => {
      // Initial state
      gsap.set(item, {
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
      })

      // Scroll animation
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power3.out",
      })
    })

    // Animate timeline line
    gsap.from(".timeline-line", {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
      scaleY: 0,
      transformOrigin: "top center",
      ease: "none",
    })
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 bg-[#121212]">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="experience-title text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent">
          Professional Experience
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline center line */}
          <div className="timeline-line absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FDB7EA] to-[#B7B1F2] transform -translate-x-1/2"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`timeline-item relative flex mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-1/2 top-0 w-6 h-6 rounded-full transform -translate-x-1/2 z-10"
                style={{ backgroundColor: exp.color }}
              ></div>

              {/* Content */}
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                <div className="bg-[#1e1e1e] rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 p-2 rounded-full" style={{ backgroundColor: `${exp.color}20` }}>
                      {exp.icon}
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: exp.color }}>
                        {exp.role}
                      </h3>
                      <h4 className="text-lg font-medium text-white mb-1">{exp.company}</h4>
                      <p className="text-sm text-gray-400 mb-3">{exp.period}</p>
                      <ul className="text-gray-300 space-y-2">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empty space for the other side */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

