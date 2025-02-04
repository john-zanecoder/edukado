"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Mail, Lock, User } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginClick: () => void
}

export function RegisterModal({ isOpen, onClose, onLoginClick }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your registration logic here
    console.log("Register attempt:", formData)
  }

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Create Account
          </DialogTitle>
          <DialogDescription className="text-gray-400">Join our learning platform today</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="username"
                placeholder="johndoe"
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                value={formData.username}
                onChange={handleChange("username")}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                value={formData.email}
                onChange={handleChange("email")}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                value={formData.password}
                onChange={handleChange("password")}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="confirmPassword"
                type="password"
                className="pl-10 bg-gray-800/50 border-gray-700 text-white"
                value={formData.confirmPassword}
                onChange={handleChange("confirmPassword")}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}>
              <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Create Account
          </Button>
          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                onClose()
                onLoginClick()
              }}
              className="text-purple-400 hover:underline"
            >
              Sign In
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

