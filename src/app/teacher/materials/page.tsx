'use client'

import { useState } from 'react';
import { 
  FileText, 
  Video,
  File,
  Upload,
  Book,
  Image as ImageIcon,
  Link,
  Plus,
  List,
  Download,
  Trash2,
  Edit,
  Eye
} from 'lucide-react';

export default function MaterialsDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [uploadType, setUploadType] = useState('document');

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="text-center mb-20">
        <h1 className="text-6xl font-bold mb-8">
          Course
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Materials
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
          Upload and manage your teaching materials, including documents, videos,
          and other resources for your courses.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-2 bg-gray-900/50 p-1 rounded-xl">
          {[
            { id: 'all', label: 'All Materials', icon: <List className="w-4 h-4" /> },
            { id: 'upload', label: 'Upload Material', icon: <Upload className="w-4 h-4" /> },
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
          { label: "Total Materials", value: "45", icon: <File className="w-8 h-8" />, color: "purple" },
          { label: "Documents", value: "28", icon: <FileText className="w-8 h-8" />, color: "pink" },
          { label: "Videos", value: "12", icon: <Video className="w-8 h-8" />, color: "blue" },
          { label: "Other Files", value: "5", icon: <Book className="w-8 h-8" />, color: "green" },
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

      {activeTab === 'upload' && (
        <div className="max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-800">
          <h2 className="text-2xl font-bold mb-6">Upload Material</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Material Type</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: 'document', label: 'Document', icon: <FileText className="w-6 h-6" /> },
                  { type: 'video', label: 'Video', icon: <Video className="w-6 h-6" /> },
                  { type: 'image', label: 'Image', icon: <ImageIcon className="w-6 h-6" /> },
                  { type: 'link', label: 'Link', icon: <Link className="w-6 h-6" /> },
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setUploadType(item.type)}
                    className={`p-4 rounded-lg border ${
                      uploadType === item.type
                        ? 'border-purple-500 bg-purple-500/10 text-purple-500'
                        : 'border-gray-700 hover:border-purple-500'
                    } flex flex-col items-center justify-center gap-2`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="Enter material title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                rows={4}
                placeholder="Enter material description"
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

            {uploadType !== 'link' ? (
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Upload className="w-12 h-12 text-gray-500" />
                  <p className="text-gray-400 text-center">
                    Drag and drop your file here, or{" "}
                    <button type="button" className="text-purple-500 hover:text-purple-400">
                      browse
                    </button>
                  </p>
                  <p className="text-sm text-gray-500">
                    Maximum file size: 100MB
                  </p>
                </div>
                <input type="file" className="hidden" />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">URL</label>
                <input
                  type="url"
                  className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="Enter resource URL"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-3 px-6 rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              Upload Material
            </button>
          </form>
        </div>
      )}

      {activeTab === 'all' && (
        <div className="space-y-8">
          {[
            { 
              course: "Web Development",
              materials: [
                { 
                  title: "JavaScript Basics PDF", 
                  type: "document",
                  size: "2.4 MB",
                  uploadedAt: "2024-03-15",
                  downloads: 45
                },
                { 
                  title: "React Tutorial Video", 
                  type: "video",
                  size: "156 MB",
                  uploadedAt: "2024-03-14",
                  downloads: 32
                },
                { 
                  title: "CSS Cheat Sheet", 
                  type: "document",
                  size: "1.2 MB",
                  uploadedAt: "2024-03-13",
                  downloads: 78
                },
              ]
            },
            {
              course: "Frontend Dev",
              materials: [
                { 
                  title: "UI Design Principles", 
                  type: "document",
                  size: "5.7 MB",
                  uploadedAt: "2024-03-12",
                  downloads: 56
                },
                { 
                  title: "Responsive Design Workshop", 
                  type: "video",
                  size: "234 MB",
                  uploadedAt: "2024-03-11",
                  downloads: 28
                },
              ]
            }
          ].map((course, index) => (
            <div key={index} className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-semibold flex items-center">
                  <Book className="w-5 h-5 mr-2 text-purple-500" />
                  {course.course}
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-gray-400 text-sm">
                        <th className="text-left pb-4">Material</th>
                        <th className="text-left pb-4">Type</th>
                        <th className="text-left pb-4">Size</th>
                        <th className="text-left pb-4">Uploaded</th>
                        <th className="text-left pb-4">Downloads</th>
                        <th className="text-left pb-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.materials.map((material, materialIndex) => (
                        <tr key={materialIndex} className="border-t border-gray-800">
                          <td className="py-4">
                            <div className="flex items-center">
                              {material.type === 'document' && <FileText className="w-5 h-5 mr-2 text-blue-500" />}
                              {material.type === 'video' && <Video className="w-5 h-5 mr-2 text-green-500" />}
                              {material.title}
                            </div>
                          </td>
                          <td className="py-4 capitalize">{material.type}</td>
                          <td className="py-4">{material.size}</td>
                          <td className="py-4">{material.uploadedAt}</td>
                          <td className="py-4">{material.downloads}</td>
                          <td className="py-4">
                            <div className="flex space-x-3">
                              <button className="text-purple-500 hover:text-purple-400">
                                <Download className="w-5 h-5" />
                              </button>
                              <button className="text-blue-500 hover:text-blue-400">
                                <Eye className="w-5 h-5" />
                              </button>
                              <button className="text-yellow-500 hover:text-yellow-400">
                                <Edit className="w-5 h-5" />
                              </button>
                              <button className="text-red-500 hover:text-red-400">
                                <Trash2 className="w-5 h-5" />
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
      )}
    </div>
  );
}
