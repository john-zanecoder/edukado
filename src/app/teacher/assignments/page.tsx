'use client'

import { useState } from 'react';
import { 
  BookOpen, 
  Plus,
  List,
  Trophy,
  Calendar,
  Users,
  FileText,
  CheckCircle2,
  Upload
} from 'lucide-react';

export default function AssignmentDashboard() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'create' | 'submissions' | 'scores'

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-8">
          Manage Your
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Assignments
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Create assignments, track submissions, and evaluate student performance
          with our comprehensive assignment management system.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-2 bg-gray-900/50 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Assignments', icon: <List className="w-4 h-4" /> },
            { id: 'create', label: 'Create Assignment', icon: <Plus className="w-4 h-4" /> },
            { id: 'submissions', label: 'Submissions', icon: <Upload className="w-4 h-4" /> },
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
          { label: "Total Assignments", value: "18", icon: <FileText className="w-8 h-8" />, color: "purple" },
          { label: "Pending Submissions", value: "45", icon: <Upload className="w-8 h-8" />, color: "pink" },
          { label: "Due This Week", value: "7", icon: <Calendar className="w-8 h-8" />, color: "blue" },
          { label: "Completion Rate", value: "82%", icon: <CheckCircle2 className="w-8 h-8" />, color: "green" },
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
            { title: "React Project", course: "Web Development", dueDate: "2024-03-25", submissions: "15/20" },
            { title: "Database Design", course: "Backend Dev", dueDate: "2024-03-28", submissions: "18/22" },
            { title: "UI/UX Case Study", course: "Frontend Dev", dueDate: "2024-03-30", submissions: "12/18" },
          ].map((assignment, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-purple-500 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-4">{assignment.title}</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span>{assignment.course}</span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date:</span>
                  <span>{assignment.dueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Submissions:</span>
                  <span className="text-purple-500">{assignment.submissions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'create' && (
        <div className="max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Create New Assignment</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Enter assignment title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                rows={4}
                placeholder="Enter assignment description"
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
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Due Date</label>
              <input
                type="datetime-local"
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              Create Assignment
            </button>
          </form>
        </div>
      )}

      {activeTab === 'submissions' && (
        <div className="space-y-8">
          {[
            { course: "Web Development", assignments: [
              { title: "React Project", submissions: [
                { student: "John Doe", status: "Submitted", date: "2024-03-15", file: "project.zip" },
                { student: "Jane Smith", status: "Late", date: "2024-03-16", file: "project-final.zip" },
              ]},
              { title: "API Integration", submissions: [
                { student: "John Doe", status: "Pending", date: "-", file: "-" },
                { student: "Jane Smith", status: "Submitted", date: "2024-03-14", file: "api-task.zip" },
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
                {course.assignments.map((assignment, assignmentIndex) => (
                  <div key={assignmentIndex} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-medium mb-4">{assignment.title}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-gray-400 text-sm">
                            <th className="text-left pb-4">Student</th>
                            <th className="text-left pb-4">Status</th>
                            <th className="text-left pb-4">Date</th>
                            <th className="text-left pb-4">File</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignment.submissions.map((submission, submissionIndex) => (
                            <tr key={submissionIndex} className="border-t border-gray-800">
                              <td className="py-4">{submission.student}</td>
                              <td className={`py-4 ${
                                submission.status === 'Submitted' ? 'text-green-500' :
                                submission.status === 'Late' ? 'text-yellow-500' :
                                'text-red-500'
                              }`}>{submission.status}</td>
                              <td className="py-4 text-gray-400">{submission.date}</td>
                              <td className="py-4">
                                {submission.file !== '-' && (
                                  <button className="text-purple-500 hover:text-purple-400">
                                    Download
                                  </button>
                                )}
                              </td>
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

      {activeTab === 'scores' && (
        <div className="space-y-8">
          {[
            { course: "Web Development", assignments: [
              { title: "React Project", students: [
                { name: "John Doe", score: "92/100", feedback: "Excellent work!", date: "2024-03-15" },
                { name: "Jane Smith", score: "88/100", feedback: "Good effort", date: "2024-03-16" },
              ]},
              { title: "API Integration", students: [
                { name: "John Doe", score: "Pending", feedback: "-", date: "-" },
                { name: "Jane Smith", score: "95/100", feedback: "Outstanding!", date: "2024-03-14" },
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
                {course.assignments.map((assignment, assignmentIndex) => (
                  <div key={assignmentIndex} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-medium mb-4">{assignment.title}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-gray-400 text-sm">
                            <th className="text-left pb-4">Student</th>
                            <th className="text-left pb-4">Score</th>
                            <th className="text-left pb-4">Feedback</th>
                            <th className="text-left pb-4">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignment.students.map((student, studentIndex) => (
                            <tr key={studentIndex} className="border-t border-gray-800">
                              <td className="py-4">{student.name}</td>
                              <td className="py-4 text-purple-500">{student.score}</td>
                              <td className="py-4 text-gray-400">{student.feedback}</td>
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
