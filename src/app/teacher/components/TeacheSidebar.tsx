import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  GraduationCap,
  PenTool,
  FileQuestion,
  FolderOpen,
  Users
} from 'lucide-react'
import { ReactNode } from 'react'

interface MenuItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface SidebarProps {
  items: Array<{
    icon: ReactNode;
    label: string;
    href: string;
  }>
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', href: '/teacher', icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: 'Courses', href: '/teacher/courses', icon: <BookOpen className="w-5 h-5" /> },
  { label: 'Lessons', href: '/teacher/lessons', icon: <FileText className="w-5 h-5" /> },
  { label: 'Quizzes', href: '/teacher/quizzes', icon: <FileQuestion className="w-5 h-5" /> },
  { label: 'Assignments', href: '/teacher/assignments', icon: <PenTool className="w-5 h-5" /> },
  { label: 'Exams', href: '/teacher/exams', icon: <GraduationCap className="w-5 h-5" /> },
  { label: 'Materials', href: '/teacher/materials', icon: <FolderOpen className="w-5 h-5" /> },
  { label: 'Students', href: '/teacher/students', icon: <Users className="w-5 h-5" /> },
]

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="hidden lg:flex flex-col w-64 bg-black border-r border-gray-800">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <span className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Teacher Portal
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
