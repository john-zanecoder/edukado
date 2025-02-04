'use client'

import { 
  BookOpen, 
  FileText, 
  FileQuestion, 
  PenTool, 
  GraduationCap, 
  Users 
} from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-8">
          Empower Learning in
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Modern Education
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Create engaging courses, manage students, and track progress with our
          comprehensive teaching tools designed for modern educators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {[
          { title: "Create Course", icon: <BookOpen className="w-10 h-10" />, color: "purple" },
          { title: "Add Quiz", icon: <FileQuestion className="w-10 h-10" />, color: "pink" },
          { title: "Assign Task", icon: <PenTool className="w-10 h-10" />, color: "blue" },
          { title: "View Reports", icon: <FileText className="w-10 h-10" />, color: "green" },
        ].map((action, index) => (
          <button
            key={index}
            className={`p-8 rounded-xl border border-gray-800 hover:border-${action.color}-500 
              transition-all duration-300 bg-gray-900/50 hover:bg-gray-900`}
          >
            <div className={`text-${action.color}-500 mb-4`}>{action.icon}</div>
            <h3 className="text-lg font-semibold">{action.title}</h3>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: "Active Courses", value: "12", icon: <BookOpen className="w-8 h-8" />, color: "purple" },
          { label: "Total Students", value: "248", icon: <Users className="w-8 h-8" />, color: "pink" },
          { label: "Pending Tasks", value: "8", icon: <PenTool className="w-8 h-8" />, color: "blue" },
          { label: "Course Rating", value: "4.8", icon: <GraduationCap className="w-8 h-8" />, color: "green" },
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
    </div>
  );
}
