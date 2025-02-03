"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, Book } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import type React from "react"
import { RegisterModal } from "./register-modal"
import { LoginModal } from "./login-modal"

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
      >
        <Link href="/" className="flex items-center space-x-2">
          <Book className="w-8 h-8 text-purple-500" />
          <span className="text-white font-medium text-xl">edukado</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/courses">Courses</NavLink>
          <NavLink href="/feedback">Feedback</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-purple-400" onClick={() => setIsLoginOpen(true)}>
            Sign In
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setIsRegisterOpen(true)}>
            Get Started
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden text-white">
          <Menu className="w-6 h-6" />
        </Button>
      </motion.nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onRegisterClick={() => setIsRegisterOpen(true)}
      />

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={() => setIsLoginOpen(true)}
      />
    </>
  )
}

export default Navbar

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}

