"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Mail, Phone, MapPin, Linkedin, Github, Twitter } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  useEffect(() => {
    // Animate section title
    gsap.from(".contact-title", {
      scrollTrigger: {
        trigger: ".contact-title",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animate form and info sections
    gsap.from(".contact-form", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    gsap.from(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })

    // Animate social icons
    const socialIcons = document.querySelectorAll(".social-icon")

    socialIcons.forEach((icon, index) => {
      gsap.from(icon, {
        scrollTrigger: {
          trigger: icon,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        delay: index * 0.1,
        ease: "power3.out",
      })

      // Hover animation
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          y: -5,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    // Input field animations
    const inputFields = formRef.current?.querySelectorAll("input, textarea")

    inputFields?.forEach((field) => {
      field.addEventListener("focus", () => {
        gsap.to(field, {
          boxShadow: "0 0 0 2px #FDB7EA",
          duration: 0.3,
        })
      })

      field.addEventListener("blur", () => {
        gsap.to(field, {
          boxShadow: "none",
          duration: 0.3,
        })
      })
    })

    return () => {
      socialIcons.forEach((icon) => {
        icon.removeEventListener("mouseenter", () => {})
        icon.removeEventListener("mouseleave", () => {})
      })

      inputFields?.forEach((field) => {
        field.removeEventListener("focus", () => {})
        field.removeEventListener("blur", () => {})
      })
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="contact-title text-3xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="contact-form lg:w-1/2">
            <div className="bg-[#1a1a1a] rounded-xl p-8 shadow-xl">
              <h3 className="text-2xl font-semibold mb-6 text-[#FFDCCC]">Send Me a Message</h3>

              {isSubmitted ? (
                <div className="bg-[#B7B1F2]/20 border border-[#B7B1F2] rounded-lg p-4 text-center">
                  <p className="text-white">Thank you for your message! I'll get back to you soon.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-[#232323] border border-gray-700 rounded-lg focus:outline-none text-white resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-[#FDB7EA] to-[#B7B1F2] text-gray-900 font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-info lg:w-1/2">
            <div className="bg-[#1a1a1a] rounded-xl p-8 shadow-xl h-full">
              <h3 className="text-2xl font-semibold mb-6 text-[#FFDCCC]">Contact Information</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[#FDB7EA]/20">
                    <Mail className="text-[#FDB7EA]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Email</h4>
                    <a href="mailto:saritha@example.com" className="text-white hover:text-[#FDB7EA] transition-colors">
                      saritha@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[#B7B1F2]/20">
                    <Phone className="text-[#B7B1F2]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Phone</h4>
                    <a href="tel:+1234567890" className="text-white hover:text-[#B7B1F2] transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-[#FFDCCC]/20">
                    <MapPin className="text-[#FFDCCC]" size={20} />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium">Location</h4>
                    <p className="text-white">San Francisco, California</p>
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-semibold mb-4 text-white">Connect With Me</h4>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="social-icon p-3 rounded-full bg-[#FDB7EA]/20 text-[#FDB7EA] hover:bg-[#FDB7EA]/30 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="social-icon p-3 rounded-full bg-[#B7B1F2]/20 text-[#B7B1F2] hover:bg-[#B7B1F2]/30 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="social-icon p-3 rounded-full bg-[#FFDCCC]/20 text-[#FFDCCC] hover:bg-[#FFDCCC]/30 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

