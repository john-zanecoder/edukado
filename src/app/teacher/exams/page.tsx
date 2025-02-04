'use client'

import { useState } from 'react';
import { 
  BookOpen, 
  Plus,
  List,
  Trophy,
  Clock,
  Users,
  FileText,
  CheckCircle2,
  PlusCircle,
  Trash2,
  Edit
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  type: string;
  options: { id: number; text: string; isCorrect: boolean; }[];
}

export default function ExamDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      text: '',
      type: 'multiple-choice',
      options: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
      ]
    }
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: questions.length + 1,
      text: '',
      type: 'multiple-choice',
      options: [
        { id: 1, text: '', isCorrect: false },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false }
      ]
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestionText = (questionId: number, text: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId ? { ...q, text } : q
    ));
  };

  const updateOptionText = (questionId: number, optionId: number, text: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map(o => 
            o.id === optionId ? { ...o, text } : o
          )}
        : q
    ));
  };

  const setCorrectOption = (questionId: number, optionId: number) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, options: q.options.map(o => 
            ({ ...o, isCorrect: o.id === optionId })
          )}
        : q
    ));
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-8">
          Manage Your
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Exams
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Create comprehensive exams, manage questions, and track student performance
          with our advanced exam management system.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-2 bg-gray-900/50 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Exams', icon: <List className="w-4 h-4" /> },
            { id: 'create', label: 'Create Exam', icon: <Plus className="w-4 h-4" /> },
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
          { label: "Total Exams", value: "8", icon: <FileText className="w-8 h-8" />, color: "purple" },
          { label: "Active Students", value: "156", icon: <Users className="w-8 h-8" />, color: "pink" },
          { label: "Avg. Score", value: "76%", icon: <Trophy className="w-8 h-8" />, color: "blue" },
          { label: "Completion Rate", value: "89%", icon: <CheckCircle2 className="w-8 h-8" />, color: "green" },
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

      {activeTab === 'create' && (
        <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Create New Exam</h2>
          <form className="space-y-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Exam Title</label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter exam title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                <textarea
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  rows={4}
                  placeholder="Enter exam description"
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
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Questions</h3>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="flex items-center text-purple-500 hover:text-purple-400"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Add Question
                </button>
              </div>

              {questions.map((question, qIndex) => (
                <div key={question.id} className="p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium">Question {qIndex + 1}</h4>
                    <button type="button" className="text-red-500 hover:text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => updateQuestionText(question.id, e.target.value)}
                      className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                      placeholder="Enter question text"
                    />
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <div key={option.id} className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name={`question-${question.id}-correct`}
                            checked={option.isCorrect}
                            onChange={() => setCorrectOption(question.id, option.id)}
                            className="text-purple-500 focus:ring-purple-500"
                          />
                          <input
                            type="text"
                            value={option.text}
                            onChange={(e) => updateOptionText(question.id, option.id, e.target.value)}
                            className="flex-1 p-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                            placeholder={`Option ${option.id}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              Create Exam
            </button>
          </form>
        </div>
      )}

      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Final JavaScript Exam", course: "Web Development", questions: 15, avgScore: "78%" },
            { title: "React Advanced Concepts", course: "Frontend Dev", questions: 20, avgScore: "82%" },
            { title: "Database Design Principles", course: "Backend Dev", questions: 18, avgScore: "75%" },
          ].map((exam, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-purple-500 transition-all duration-300"
            >
              <h3 className="text-lg font-semibold mb-4">{exam.title}</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Course:</span>
                  <span>{exam.course}</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span>{exam.questions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Score:</span>
                  <span className="text-purple-500">{exam.avgScore}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex items-center text-purple-500 hover:text-purple-400">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button className="flex items-center text-red-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'scores' && (
        <div className="space-y-8">
          {[
            { course: "Web Development", exams: [
              { title: "Final JavaScript Exam", students: [
                { name: "John Doe", score: "85/100", date: "2024-03-15", time: "45 min" },
                { name: "Jane Smith", score: "92/100", date: "2024-03-15", time: "38 min" },
              ]},
              { title: "DOM Manipulation", students: [
                { name: "John Doe", score: "78/100", date: "2024-03-10", time: "52 min" },
                { name: "Jane Smith", score: "88/100", date: "2024-03-10", time: "47 min" },
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
                {course.exams.map((exam, examIndex) => (
                  <div key={examIndex} className="mb-6 last:mb-0">
                    <h4 className="text-lg font-medium mb-4">{exam.title}</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="text-gray-400 text-sm">
                            <th className="text-left pb-4">Student</th>
                            <th className="text-left pb-4">Score</th>
                            <th className="text-left pb-4">Date</th>
                            <th className="text-left pb-4">Time Taken</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exam.students.map((student, studentIndex) => (
                            <tr key={studentIndex} className="border-t border-gray-800">
                              <td className="py-4">{student.name}</td>
                              <td className="py-4 text-purple-500">{student.score}</td>
                              <td className="py-4 text-gray-400">{student.date}</td>
                              <td className="py-4 text-gray-400">{student.time}</td>
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
