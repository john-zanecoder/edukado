'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacher?: {
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface Teacher {
  id: string;
  name: string;
  user: {
    email: string;
  };
}

const CourseManagement = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    teacherId: '',
  });

  // Fetch teachers when component mounts
  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  const fetchTeachers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/admin', {
        params: { type: 'teachers' }
      });
      
      if (Array.isArray(response.data)) {
        setTeachers(response.data);
      } else {
        console.error('Invalid teachers data format:', response.data);
        toast.error('Failed to load teachers: Invalid data format');
      }
    } catch (error: any) {
      console.error('Error fetching teachers:', error);
      toast.error(error.response?.data?.message || 'Failed to load teachers');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/admin', {
        params: { type: 'courses' }
      });
      setCourses(response.data);
    } catch (error: any) {
      console.error('Error fetching courses:', error);
      toast.error(error.response?.data?.message || 'Failed to load courses');
    }
  };

  const handleAddCourse = async () => {
    try {
      setIsLoading(true);
      
      if (!newCourse.title || !newCourse.description || !newCourse.teacherId) {
        toast.error("Please fill in all fields");
        return;
      }

      await axios.post("/api/admin", {
        type: 'course',
        ...newCourse
      });
      
      await fetchCourses();
      setShowModal(false);
      setNewCourse({ title: '', description: '', teacherId: '' });
      toast.success("Course created successfully!");
      
    } catch (error: any) {
      console.error('Error adding course:', error);
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await axios.delete(`/api/admin?type=course&id=${courseId}`);
      await fetchCourses();
      toast.success("Course deleted successfully");
    } catch (error: any) {
      console.error('Error deleting course:', error);
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  };

  return (
    <>
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-semibold text-white">Courses</h2>
          <Button 
            onClick={() => setShowModal(true)}
            className="bg-white/10 hover:bg-white/20 text-white"
            disabled={teachers.length === 0}
          >
            {teachers.length === 0 ? "No Teachers Available" : "Add New Course"}
          </Button>
        </div>
        <table className="w-full">
          <thead className="bg-zinc-900/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm text-zinc-400">Title</th>
              <th className="px-4 py-3 text-left text-sm text-zinc-400">Description</th>
              <th className="px-4 py-3 text-left text-sm text-zinc-400">Teacher</th>
              <th className="px-4 py-3 text-left text-sm text-zinc-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t border-zinc-800">
                <td className="px-4 py-3 text-sm text-zinc-300">{course.title}</td>
                <td className="px-4 py-3 text-sm text-zinc-300">{course.description}</td>
                <td className="px-4 py-3 text-sm text-zinc-300">
                  {course.teacher?.name || 'Unknown Teacher'}
                </td>
                <td className="px-4 py-3">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-500"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Screen Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full min-h-screen bg-zinc-900/90 overflow-y-auto">
            <div className="max-w-6xl mx-auto p-20">
              <h2 className="text-3xl font-semibold text-white mb-8">Add New Course</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Course Title</label>
                  <Input
                    placeholder="Enter course title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-400"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Description</label>
                  <textarea
                    placeholder="Enter course description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    className="w-full rounded-md bg-zinc-800/50 border border-zinc-700 px-3 py-2 text-white placeholder:text-zinc-400"
                    rows={4}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Assign Teacher</label>
                  <select
                    value={newCourse.teacherId}
                    onChange={(e) => setNewCourse({ ...newCourse, teacherId: e.target.value })}
                    className="w-full rounded-md bg-zinc-800/50 border border-zinc-700 px-3 py-2 text-white"
                    disabled={isLoading || teachers.length === 0}
                  >
                    <option value="" className="bg-zinc-800">
                      {teachers.length === 0 ? "No teachers available" : "Select teacher"}
                    </option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id} className="bg-zinc-800">
                        {teacher.name} ({teacher.user.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <Button
                  onClick={() => setShowModal(false)}
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCourse}
                  className="bg-white/10 hover:bg-white/20 text-white"
                  disabled={isLoading || teachers.length === 0}
                >
                  {isLoading ? "Creating..." : "Add Course"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseManagement;
