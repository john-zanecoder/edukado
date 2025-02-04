'use client'

import { 
  BookOpen, 
  FileText, 
  Video, 
  PenTool, 
  Clock, 
  PlayCircle,
  Plus,
  ListChecks
} from 'lucide-react';

export default function LessonDashboard() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-8">
          Create Engaging
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Lesson Content
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Design interactive lessons, add multimedia content, and track student engagement
          with our comprehensive lesson management tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {[
          { title: "New Lesson", icon: <Plus className="w-10 h-10" />, color: "purple" },
          { title: "Add Video", icon: <Video className="w-10 h-10" />, color: "pink" },
          { title: "View All", icon: <FileText className="w-10 h-10" />, color: "blue" },
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { label: "Total Lessons", value: "24", icon: <BookOpen className="w-8 h-8" />, color: "purple" },
          { label: "Video Content", value: "12", icon: <PlayCircle className="w-8 h-8" />, color: "pink" },
          { label: "Avg. Duration", value: "45m", icon: <Clock className="w-8 h-8" />, color: "blue" },
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

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Recent Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Introduction to React", duration: "45 min", type: "Video", progress: "80%" },
            { title: "JavaScript Basics", duration: "30 min", type: "Text", progress: "100%" },
            { title: "CSS Fundamentals", duration: "60 min", type: "Interactive", progress: "60%" },
          ].map((lesson, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-purple-500 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
              <div className="flex items-center justify-between text-gray-400 mb-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {lesson.duration}
                </span>
                <span>{lesson.type}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: lesson.progress }}
                ></div>
              </div>
              <div className="text-right mt-2 text-sm text-gray-400">
                {lesson.progress} Complete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
