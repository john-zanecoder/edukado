'use client'

import { useState } from 'react'
import { 
  BookOpen, 
  Users, 
  MoreVertical, 
  Edit, 
  Trash, 
  Plus,
  Clock,
  CheckCircle,
} from 'lucide-react'

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Example data - replace with actual data from your API
  const courses = [
    {
      id: 1,
      title: "Web Development Fundamentals",
      description: "Learn the basics of web development including HTML, CSS, and JavaScript",
      enrolledStudents: 24,
      status: "active",
      students: [
        { id: 1, name: "John Doe", email: "john@example.com", status: "enrolled" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "pending" },
      ]
    },
    // Add more courses as needed
  ]

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Manage Courses
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300">
          <Plus className="w-5 h-5" />
          Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            {/* Course content */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{course.title}</h2>
                <p className="text-gray-400">{course.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>{course.enrolledStudents} students</span>
                </div>
                <div className="relative">
                  <button className="p-2 hover:bg-gray-800 rounded-full transition-colors duration-300">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Students List */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Enrolled Students</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {course.students.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-800/30">
                        <td className="px-4 py-3 text-sm text-gray-300">{student.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-300">{student.email}</td>
                        <td className="px-4 py-3 text-sm">
                          {student.status === 'enrolled' ? (
                            <span className="inline-flex items-center gap-1 text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              Enrolled
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-yellow-400">
                              <Clock className="w-4 h-4" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors duration-300">
                              <Edit className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-700 rounded transition-colors duration-300">
                              <Trash className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
