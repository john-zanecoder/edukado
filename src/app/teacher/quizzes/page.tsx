'use client'

import { useState } from 'react';
import { 
  FileQuestion, 
  Plus,
  List,
  Trophy,
  Clock,
  Users,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

export default function QuizDashboard() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'create' | 'scores'

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-8">
          Manage Your
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Quizzes
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Create engaging quizzes, track student performance, and manage assessments
          with our comprehensive quiz management system.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-2 bg-gray-900/50 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Quizzes', icon: <List className="w-4 h-4" /> },
            { id: 'create', label: 'Create Quiz', icon: <Plus className="w-4 h-4" /> },
            { id: 'scores', label: 'Student Scores', icon: <Trophy className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-6 py-3 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { label: "Total Quizzes", value: "15", icon: <FileQuestion className="w-8 h-8" />, color: "purple" },
          { label: "Active Students", value: "124", icon: <Users className="w-8 h-8" />, color: "pink" },
          { label: "Avg. Score", value: "78%", icon: <Trophy className="w-8 h-8" />, color: "blue" },
          { label: "Completion Rate", value: "85%", icon: <CheckCircle2 className="w-8 h-8" />, color: "green" },
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

      {/* Content based on active tab */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "JavaScript Basics", questions: 10, course: "Web Development", avgScore: "82%" },
            { title: "React Fundamentals", questions: 15, course: "Frontend Dev", avgScore: "75%" },
            { title: "Database Design", questions: 12, course: "Backend Dev", avgScore: "79%" },
          ].map((quiz, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-purple-500 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-4">{quiz.title}</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span>{quiz.questions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span>{quiz.course}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Score:</span>
                  <span className="text-purple-500">{quiz.avgScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Create New Quiz</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Quiz Title</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Enter quiz title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                rows={4}
                placeholder="Enter quiz description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Course</label>
              <select className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500">
                <option>Select a course</option>
                <option>Web Development</option>
                <option>Frontend Dev</option>
                <option>Backend Dev</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              Create Quiz
            </button>
          </form>
        </div>
      )}

      {activeTab === 'scores' && (
        <div className="space-y-8">
          {[
            { course: "Web Development", quizzes: [
              { title: "JavaScript Basics", students: [
                { name: "John Doe", score: "85%", date: "2024-03-15" },
                { name: "Jane Smith", score: "92%", date: "2024-03-14" },
              ]},
              { title: "HTML Fundamentals", students: [
                { name: "John Doe", score: "78%", date: "2024-03-10" },
                { name: "Jane Smith", score: "88%", date: "2024-03-09" },
              ]},
            ]},
          ].map((course, index) => (
            <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-semibold flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-purple-500" />
                  {course.course}
                </h3>
              </div>
              <div className="p-6">
                {course.quizzes.map((quiz, quizIndex) => (
                  <div key={quizIndex} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-medium mb-4">{quiz.title}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-gray-400 text-sm">
                            <th className="text-left pb-4">Student</th>
                            <th className="text-left pb-4">Score</th>
                            <th className="text-left pb-4">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quiz.students.map((student, studentIndex) => (
                            <tr key={studentIndex} className="border-t border-gray-800">
                              <td className="py-4">{student.name}</td>
                              <td className="py-4 text-purple-500">{student.score}</td>
                              <td className="py-4 text-gray-400">{student.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
