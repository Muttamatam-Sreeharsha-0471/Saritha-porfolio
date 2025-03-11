import Hero from "@/components/hero"
import Navigation from "@/components/navigation"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Experience from "@/components/experience"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { ScrollProvider } from "@/components/scroll-context"

export default function Home() {
  return (
    <ScrollProvider>
      <main className="relative overflow-hidden">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </ScrollProvider>
  )
}

