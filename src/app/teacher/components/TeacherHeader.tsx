import { useState } from 'react'
import { Menu, Bell, User, LogOut } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-black border-b border-gray-800 h-16">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Mobile menu button */}
        <button className="lg:hidden p-2 rounded-md text-gray-400 hover:bg-gray-800">
          <Menu className="w-6 h-6" />
        </button>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-6">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 
              text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 
              focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="p-2 rounded-full text-gray-400 hover:bg-gray-800 transition-colors duration-300">
            <Bell className="w-6 h-6" />
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 rounded-full text-gray-400 hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                <User className="w-5 h-5" />
              </div>
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg py-1 border border-gray-800">
                <Link
                  href="/teacher/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-300"
                >
                  <User className="w-4 h-4" />
                  Profile
                </Link>
                <button
                  onClick={() => {/* Add logout logic */}}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors duration-300 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
