'use client'

import { useState, useEffect } from 'react'
import { 
  BookOpen, Users, MoreVertical, Edit, Trash, Plus, 
  BookOpenCheck, // For lessons
  BrainCircuit, // For quizzes
  GraduationCap, // For exams
  ClipboardList, // For assignments
  UserPlus, // For enrollments
  Medal, // For grades
} from 'lucide-react'
import { toast } from 'sonner'

interface Course {
  id: string
  title: string
  description: string
  teacherId: string | null
  createdAt: string
  lessons: any[]
  quizzes: any[]
  exams: any[]
  assignments: any[]
  enrollments: any[]
  courseGrades: any[]
  students: any[]
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/teacher/courses')
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fetch courses')
      }
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  // Create course with error handling
  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/teacher/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create course')
      }

      await fetchCourses()
      setIsModalOpen(false)
      setFormData({ title: '', description: '' })
      toast.success('Course created successfully')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to create course')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-6xl font-bold mb-4">
          Manage Your <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Courses</span>
        </h1>
        <p className="text-gray-400 text-xl">
          Create comprehensive courses with lessons, quizzes, exams, and assignments while tracking student progress.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-8 flex gap-4">
        <button className="bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 px-6 py-3 rounded-lg flex items-center gap-2 flex-1 justify-center font-medium transition-colors">
          <BookOpen className="w-5 h-5" />
          All Courses
        </button>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 text-white hover:bg-purple-600 px-6 py-3 rounded-lg flex items-center gap-2 flex-1 justify-center font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Course
        </button>
        <button className="bg-gray-800/50 text-gray-300 hover:bg-gray-800 px-6 py-3 rounded-lg flex items-center gap-2 flex-1 justify-center font-medium transition-colors">
          <Medal className="w-5 h-5" />
          Course Grades
        </button>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{course.title}</h2>
                <p className="text-gray-400">{course.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>{course.enrollments.length} students</span>
                </div>
                <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-300">
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <BookOpenCheck className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <span className="text-sm text-gray-400">Lessons</span>
                <p className="text-lg font-semibold text-white">{course.lessons.length}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <BrainCircuit className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <span className="text-sm text-gray-400">Quizzes</span>
                <p className="text-lg font-semibold text-white">{course.quizzes.length}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <GraduationCap className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <span className="text-sm text-gray-400">Exams</span>
                <p className="text-lg font-semibold text-white">{course.exams.length}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <ClipboardList className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                <span className="text-sm text-gray-400">Assignments</span>
                <p className="text-lg font-semibold text-white">{course.assignments.length}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <UserPlus className="w-5 h-5 text-pink-400 mx-auto mb-1" />
                <span className="text-sm text-gray-400">Enrolled</span>
                <p className="text-lg font-semibold text-white">{course.enrollments.length}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded-lg text-center">
                <Medal className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <span className="text-sm text-gray-400">Grades</span>
                <p className="text-lg font-semibold text-white">{course.courseGrades.length}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Add Lesson
              </button>
              <button className="flex-1 bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Create Quiz
              </button>
              <button className="flex-1 bg-green-500/10 hover:bg-green-500/20 text-green-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                New Exam
              </button>
              <button className="flex-1 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Assignment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Updated Modal with matching design */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl w-full max-w-md backdrop-blur-sm">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
              Create New Course
            </h2>
            <form onSubmit={handleCreateCourse} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  placeholder="Enter course title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                  rows={4}
                  placeholder="Enter course description"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⚪</span>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create Course
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
