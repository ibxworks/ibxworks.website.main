"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  const [isOnDarkSection, setIsOnDarkSection] = useState(false)
  const [isBottomOnDarkSection, setIsBottomOnDarkSection] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Reset scroll position to top on page load
    window.scrollTo(0, 0)

    const handleScroll = () => {
      const darkSections = document.querySelectorAll(".bg-black")
      let navOnDark = false
      let bottomOnDark = false

      // Check if the navigation bar (top of viewport) is over a dark section
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        // Check if the top of the viewport (where nav bar is) intersects with a dark section
        if (rect.top <= 64 && rect.bottom >= 64) {
          navOnDark = true
        }
        // Check if the bottom buttons area (bottom of viewport) intersects with a dark section
        if (rect.top <= window.innerHeight - 60 && rect.bottom >= window.innerHeight - 60) {
          bottomOnDark = true
        }
      })

      setIsOnDarkSection(navOnDark)
      setIsBottomOnDarkSection(bottomOnDark)

      // Calculate scroll progress for home section animation
      const homeSection = document.getElementById("home")
      if (homeSection) {
        const rect = homeSection.getBoundingClientRect()
        const sectionHeight = homeSection.offsetHeight
        const viewportHeight = window.innerHeight

        // Calculate how much we've scrolled through the home section
        const scrolled = Math.max(0, -rect.top)
        const maxScroll = sectionHeight - viewportHeight
        const progress = Math.min(1, scrolled / (maxScroll * 0.3)) // Reduced from 0.5 to 0.3 for faster animation

        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      // No offset - scroll to the exact top of the section
      const elementPosition = element.offsetTop

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  // Calculate transforms based on scroll progress - adjusted for simultaneous visibility
  const mainContentTransform =
    scrollProgress <= 0.7
      ? `translateY(-${scrollProgress * 10}vh)` // Reduced movement to keep content visible
      : `translateY(-20vh)` // Changed from -15vh to -20vh

  const quoteTransform =
    scrollProgress > 0.2 // Quote appears much earlier (was 0.5)
      ? `translateY(${(1 - scrollProgress) * 20}vh - 10vh)` // Adjusted positioning for simultaneous visibility
      : `translateY(15vh)` // Start position closer to main content

  const quoteOpacity = scrollProgress > 0.2 ? (scrollProgress - 0.2) * 1.25 : 0 // Faster fade-in

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white/5 backdrop-blur-md">
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection("home")}
            className={`text-xl font-bold font-rca hover:opacity-80 ${isOnDarkSection ? "text-white" : "text-custom-blue"}`}
          >
            IBX
          </button>
        </div>
        <div className={`flex items-center gap-4 text-xs ${isOnDarkSection ? "text-white" : "text-custom-blue"}`}>
          <button onClick={() => scrollToSection("projects")} className="hover:underline">
            PROJECTS
          </button>
          <button onClick={() => scrollToSection("team")} className="hover:underline">
            TEAM
          </button>
          <button onClick={() => scrollToSection("idea-bank")} className="hover:underline">
            IDEA BANK
          </button>
          <button onClick={() => scrollToSection("ask-bar")} className="hover:underline">
            ASK BAR
          </button>
        </div>
      </nav>

      {/* Fixed Login Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className={`text-xs rounded-full px-6 ${isBottomOnDarkSection ? "text-white border-white hover:bg-white hover:text-black bg-transparent" : "text-custom-blue border-custom-blue hover:bg-custom-blue hover:text-white bg-transparent"}`}
        >
          LOGIN
        </Button>
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToSection("idea-bank")}
            className="rounded-full text-xs px-4 text-idea-red border-idea-red hover:bg-idea-red hover:text-white bg-transparent"
          >
            IDEA THROW
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToSection("ask-bar")}
            className={`rounded-full text-xs px-4 ${
              isBottomOnDarkSection
                ? "text-white border-white hover:bg-white hover:text-black bg-transparent"
                : "text-black border-black hover:bg-black hover:text-white bg-transparent"
            }`}
          >
            ASK
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`rounded-full text-xs px-4 ${
              isBottomOnDarkSection
                ? "text-white border-white hover:bg-white hover:text-black bg-transparent"
                : "text-black border-black hover:bg-black hover:text-white bg-transparent"
            }`}
          >
            APPLY
          </Button>
        </div>
      </div>

      {/* Home Section - Light */}
      <section id="home" className="relative bg-white text-center overflow-hidden" style={{ height: "120vh" }}>
        {/* Main Content - Positioned 30vh from top */}
        <div
          className="absolute inset-0 flex flex-col items-center p-6 transition-transform duration-300 ease-out"
          style={{
            transform: mainContentTransform,
            paddingTop: "30vh", // Positioned 30vh from the top
            justifyContent: "flex-start",
          }}
        >
          <div className="max-w-5xl mx-auto">
            {/* I BUILD X with mixed styling - larger and more prominent */}
            <h1 className="text-8xl font-bold mb-8 tracking-wider font-rca flex items-center justify-center gap-6">
              <span className="text-custom-blue">I</span>
              <span className="text-custom-blue">
                <span className="text-custom-blue">B</span>
                <span
                  style={{
                    WebkitTextStroke: "3px #1D4BA9",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  UILD
                </span>
              </span>
              <span className="text-custom-blue">X</span>
            </h1>
            <p className="text-2xl uppercase tracking-wider mb-16 text-custom-blue font-light max-w-5xl mx-auto leading-relaxed">
              A GROUP OF ENGINEERS AND SCIENTISTS WHO BUILD STUFF,
              <br />
              OFTEN COOL OR FUNNY
            </p>
            <button
              onClick={() => scrollToSection("about-us")}
              className="text-lg hover:underline text-custom-blue font-medium"
            >
              ABOUT US
            </button>
          </div>
        </div>

        {/* Quote Text */}
        <div
          className="absolute inset-0 flex items-center justify-center p-2 transition-all duration-300 ease-out"
          style={{
            transform: quoteTransform,
            opacity: quoteOpacity,
          }}
        >
          <div className="max-w-5xl mx-auto">
            <p className="text-3xl text-custom-blue font-medium text-center">
              The COOLEST thing happens when the smartest people do DUMB thing
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section - Dark */}
      <section
        id="projects"
        className="min-h-screen flex flex-col bg-black text-white p-6 pt-16"
        style={{ minHeight: "150vh" }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-6xl font-bold mb-20 text-center">PROJECTS</h2>

          <div className="space-y-16">
            {/* PullUP - Left aligned */}
            <div className="flex justify-start">
              <div className="w-full max-w-2xl">
                <div className="flex gap-8 items-start">
                  <div className="w-40 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=160&width=160"
                      alt="PullUP Logo"
                      width={160}
                      height={160}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="border-l-2 border-white pl-8 flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h4 className="text-3xl font-bold">PullUP</h4>
                      <span className="text-sm text-gray-400">AUG 2025</span>
                    </div>
                    <p className="text-lg mb-2">Social Media of What people WILL DO</p>
                    <p className="text-lg mb-8"></p>
                    <Link href="#" className="hover:underline text-lg" style={{ color: "#1D4BA9" }}>
                      Go to Website
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Lorentz Propulsion - Right aligned */}
            <div className="flex justify-end">
              <div className="w-full max-w-2xl">
                <div className="flex gap-8 items-start flex-row-reverse">
                  <div className="w-40 h-40 bg-gray-600 flex-shrink-0"></div>
                  <div className="border-r-2 border-white pr-8 flex-1 text-right">
                    <div className="flex items-center gap-4 mb-4 justify-end">
                      <span className="text-sm text-gray-400">Coming Soon</span>
                      <h4 className="text-3xl font-bold">Lorentz Propulsion</h4>
                    </div>
                    <p className="text-lg mb-2">Highly Efficient & Genius Propulsion System</p>
                    <p className="text-lg mb-8">Utilizing Geomagnetic Field</p>
                    <Link href="#" className="hover:underline text-lg" style={{ color: "#1D4BA9" }}>
                      Go to Website
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* inkedin - Left aligned */}
            <div className="flex justify-start">
              <div className="w-full max-w-2xl">
                <div className="flex gap-8 items-start">
                  <div className="w-40 h-40 bg-gray-600 flex-shrink-0"></div>
                  <div className="border-l-2 border-white pl-8 flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h4 className="text-3xl font-bold">inkedin</h4>
                      <span className="text-sm text-gray-400">Coming Soon</span>
                    </div>
                    <p className="text-lg mb-2">Failure is the mother of Success</p>
                    <p className="text-lg mb-8">You record only career failures here, not success</p>
                    <Link href="#" className="hover:underline text-lg" style={{ color: "#1D4BA9" }}>
                      Go to Website
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add more spacing to make section longer */}
          <div className="h-32"></div>
        </div>
      </section>

      {/* Team Section - Light */}
      <section id="team" className="min-h-screen flex flex-col bg-white p-6 pt-16" style={{ minHeight: "150vh" }}>
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-6xl font-bold mb-20 text-center text-custom-blue">TEAM</h2>

          <div className="space-y-16">
            {/* First Row - Jun Kang and Saejoon Park */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex gap-8 items-start">
                <div className="w-40 h-40 bg-gray-300 flex-shrink-0"></div>
                <div className="flex flex-col justify-start pt-2">
                  <h3 className="text-3xl font-bold mb-2 text-black">Jun Kang</h3>
                  <p className="text-lg text-gray-600 mb-4">Chief Executive Officer</p>
                  <Link href="#" className="text-custom-blue hover:underline">
                    User Guide
                  </Link>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="w-40 h-40 bg-gray-300 flex-shrink-0"></div>
                <div className="flex flex-col justify-start pt-2">
                  <h3 className="text-3xl font-bold mb-2 text-black">Saejoon Park</h3>
                  <p className="text-lg text-gray-600 mb-4">Chief Technology Officer</p>
                  <Link href="#" className="text-custom-blue hover:underline">
                    User Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Second Row - Tony Park and Davis Rattanavijit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex gap-8 items-start">
                <div className="w-40 h-40 bg-gray-300 flex-shrink-0"></div>
                <div className="flex flex-col justify-start pt-2">
                  <h3 className="text-3xl font-bold mb-2 text-black">Tony Park</h3>
                  <p className="text-lg text-gray-600 mb-4">Chief Information Officer</p>
                  <Link href="#" className="text-custom-blue hover:underline">
                    User Guide
                  </Link>
                </div>
              </div>

              <div className="flex gap-8 items-start">
                <div className="w-40 h-40 bg-gray-300 flex-shrink-0"></div>
                <div className="flex flex-col justify-start pt-2">
                  <h3 className="text-3xl font-bold mb-2 text-black">Davis Rattanavijit</h3>
                  <p className="text-lg text-gray-600 mb-4">Chief Financial Officer</p>
                  <Link href="#" className="text-custom-blue hover:underline">
                    User Guide
                  </Link>
                </div>
              </div>
            </div>

            {/* Third Row - Yongwook Kim (single, left-aligned) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="flex gap-8 items-start">
                <div className="w-40 h-40 bg-gray-300 flex-shrink-0"></div>
                <div className="flex flex-col justify-start pt-2">
                  <h3 className="text-3xl font-bold mb-2 text-black">Yongwook Kim</h3>
                  <p className="text-lg text-gray-600 mb-4">Some kind of Researcher</p>
                  <Link href="#" className="text-custom-blue hover:underline">
                    User Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Add more spacing to make section longer */}
          <div className="h-96"></div>
        </div>
      </section>

      {/* Idea Bank Section - Dark */}
      <section id="idea-bank" className="min-h-screen flex flex-col bg-black text-white p-6 pt-16">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-6xl font-bold mb-16 text-center">IDEA BANK</h2>

          <p className="text-center mb-12 text-lg">
            Everyone has dumb ideas that they came up when they shower or poop
          </p>

          <div className="flex items-center gap-4 mb-16 max-w-4xl mx-auto">
            <Input
              placeholder="Throw Us Any Ideas"
              className="flex-1 text-lg p-4 h-14 rounded-lg border-2 border-white focus:border-white bg-transparent text-white placeholder:text-gray-400"
            />
            <Button
              variant="outline"
              className="px-8 py-4 h-14 text-white border-white hover:bg-white hover:text-black rounded-lg bg-transparent"
            >
              SUBMIT
            </Button>
          </div>

          <div className="space-y-6 mb-20 max-w-3xl mx-auto">
            <p className="text-lg" style={{ color: "#1D4BA9" }}>
              Step 1 : Throw Us Any Ideas! [ We like Dumb ideas but accept practical ideas too ]
            </p>
            <p className="text-lg" style={{ color: "#1D4BA9" }}>
              Step 2 : Talk about your idea with Jun & Saejoon
            </p>
            <p className="text-lg" style={{ color: "#1D4BA9" }}>
              Step 3 : Connect to your idea with right IBX builders [ since right ideas need right builders ]
            </p>
            <p className="text-lg" style={{ color: "#1D4BA9" }}>
              Step 4 : Make your idea real within 2~4 week with the team!
            </p>
          </div>
        </div>
      </section>

      {/* Ask Bar Section - Light */}
      <section id="ask-bar" className="min-h-screen flex flex-col bg-white p-6 pt-16" style={{ minHeight: "150vh" }}>
        <div className="max-w-6xl mx-auto w-full relative">
          <h2 className="text-6xl font-bold mb-20 text-center text-custom-blue">ASK BAR</h2>

          {/* Sample question at the top */}
          <div className="mb-16">
            <p className="text-lg text-gray-700 max-w-2xl">Q - Name is kinda cringy tbh</p>
          </div>

          {/* Main input section */}
          <div className="flex items-center gap-4 mb-20 max-w-4xl mx-auto">
            <Input
              placeholder="Ask Anything"
              className="flex-1 text-lg p-4 h-14 rounded-lg border-2 border-gray-300 focus:border-custom-blue"
            />
            <Button
              variant="outline"
              className="px-8 py-4 h-14 text-custom-blue border-custom-blue hover:bg-custom-blue hover:text-white rounded-lg bg-transparent"
            >
              SUBMIT
            </Button>
          </div>

          {/* Scattered questions */}
          <div className="relative">
            {/* Question 1 - Left side */}
            <div className="absolute left-0 top-0">
              <p className="text-lg text-gray-700">Q - How do u make money with this?</p>
            </div>

            {/* Question 2 - Right side */}
            <div className="absolute right-0 top-16">
              <p className="text-lg text-gray-700">Q - Why do u do this?</p>
            </div>

            {/* Question 3 - Center bottom */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-32">
              <p className="text-lg text-gray-700">Q - When did IBX founded?</p>
            </div>
          </div>

          {/* Add spacing for the scattered questions */}
          <div className="h-64"></div>
        </div>
      </section>

      {/* Footer Section - Light */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6 pb-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 tracking-wider font-rca">I BUILD X</h1>
          <h2 className="text-4xl font-bold mb-12 text-custom-blue font-rca">IBX</h2>

          <div className="mb-16">
            <p className="text-sm text-gray-600">IBX LLC.</p>
            <p className="text-xs text-gray-400">Copyright 2023</p>
          </div>
        </div>
      </section>
    </main>
  )
}
