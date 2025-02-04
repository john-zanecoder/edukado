'use client'

import { useState } from 'react';
import { 
  Users,
  GraduationCap,
  Trophy,
  Clock,
  BookOpen,
  BarChart3,
  Search,
  ChevronDown,
  FileText,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function StudentsDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-8">
          Student
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Performance
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Track student progress, analyze performance metrics, and identify areas for improvement
          across all your courses.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { label: "Total Students", value: "248", icon: <Users className="w-8 h-8" />, color: "purple" },
          { label: "Average Grade", value: "82%", icon: <Trophy className="w-8 h-8" />, color: "pink" },
          { label: "Course Completion", value: "76%", icon: <CheckCircle2 className="w-8 h-8" />, color: "blue" },
          { label: "Active Courses", value: "12", icon: <BookOpen className="w-8 h-8" />, color: "green" },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-xl border border-gray-800 bg-gray-900/50"
          >
            <div className={`text-${stat.color}-500 mb-2`}>{stat.icon}</div>
            <h4 className="text-3xl font-bold mb-1">{stat.value}</h4>
            <p className="text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="relative">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="appearance-none w-full md:w-48 p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          >
            <option value="all">All Courses</option>
            <option value="web-dev">Web Development</option>
            <option value="frontend">Frontend Dev</option>
            <option value="backend">Backend Dev</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Students List */}
      <div className="space-y-6">
        {[
          {
            name: "John Doe",
            email: "john.doe@example.com",
            course: "Web Development",
            progress: {
              overall: 85,
              assignments: 90,
              quizzes: 82,
              exams: 84
            },
            status: "active",
            lastActive: "2024-03-15"
          },
          {
            name: "Jane Smith",
            email: "jane.smith@example.com",
            course: "Frontend Dev",
            progress: {
              overall: 92,
              assignments: 95,
              quizzes: 88,
              exams: 93
            },
            status: "active",
            lastActive: "2024-03-15"
          },
          // Add more students as needed
        ].map((student, index) => (
          <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    {student.name}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      student.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'
                    }`}>
                      {student.status}
                    </span>
                  </h3>
                  <p className="text-gray-400">{student.email}</p>
                </div>
                <div className="text-sm text-gray-400">
                  Last active: {student.lastActive}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="text-purple-500 font-semibold">{student.progress.overall}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${student.progress.overall}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Assignments</span>
                    <span className="text-blue-500 font-semibold">{student.progress.assignments}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${student.progress.assignments}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Quizzes</span>
                    <span className="text-pink-500 font-semibold">{student.progress.quizzes}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{ width: `${student.progress.quizzes}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Exams</span>
                    <span className="text-green-500 font-semibold">{student.progress.exams}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${student.progress.exams}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="flex items-center gap-2 text-purple-500 hover:text-purple-400">
                  <BarChart3 className="w-4 h-4" />
                  Detailed Analytics
                </button>
                <button className="flex items-center gap-2 text-blue-500 hover:text-blue-400">
                  <FileText className="w-4 h-4" />
                  View Report
                </button>
                <button className="flex items-center gap-2 text-pink-500 hover:text-pink-400">
                  <AlertCircle className="w-4 h-4" />
                  Flag Issues
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
