"use client"

import { createContext, useContext, type ReactNode } from "react"

interface ScrollContextType {
  scrollToSection: (sectionId: string) => void
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for nav height
        behavior: "smooth",
      })
    }
  }

  return <ScrollContext.Provider value={{ scrollToSection }}>{children}</ScrollContext.Provider>
}

export function useScrollContext() {
  const context = useContext(ScrollContext)
  if (context === undefined) {
    throw new Error("useScrollContext must be used within a ScrollProvider")
  }
  return context
}

