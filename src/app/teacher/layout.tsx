'use client'

import { Sidebar } from './components/TeacheSidebar'
import { Header } from './components/TeacherHeader'
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  FileQuestion, 
  PenTool, 
  GraduationCap, 
  FolderOpen, 
  Users 
} from 'lucide-react'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { label: 'Dashboard', href: '/teacher', icon: <LayoutDashboard className="w-5 h-5" /> },
    { label: 'Courses', href: '/teacher/courses', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Lessons', href: '/teacher/lessons', icon: <FileText className="w-5 h-5" /> },
    { label: 'Quizzes', href: '/teacher/quizzes', icon: <FileQuestion className="w-5 h-5" /> },
    { label: 'Assignments', href: '/teacher/assignments', icon: <PenTool className="w-5 h-5" /> },
    { label: 'Exams', href: '/teacher/exams', icon: <GraduationCap className="w-5 h-5" /> },
    { label: 'Materials', href: '/teacher/materials', icon: <FolderOpen className="w-5 h-5" /> },
    { label: 'Students', href: '/teacher/students', icon: <Users className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        <Sidebar items={menuItems} />
        <div className="flex-1">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
