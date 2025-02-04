import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Define interfaces based on your Prisma schema
interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string | null;
  teacherId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  courseId: string | null;
  teacherId: string | null;
  score: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  courseId: string | null;
  studentId: string | null;
  teacherId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface Exam {
  id: string;
  title: string;
  description: string;
  courseId: string | null;
  teacherId: string | null;
  score: number | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface Student {
  id: string;
  name: string;
  userId: string;
  teacherId: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

// Define the store state interface
interface TeacherState {
  // Data
  courses: Course[];
  lessons: Lesson[];
  quizzes: Quiz[];
  assignments: Assignment[];
  exams: Exam[];
  students: Student[];
  
  // Selected items
  selectedCourse: Course | null;
  selectedLesson: Lesson | null;
  selectedQuiz: Quiz | null;
  selectedAssignment: Assignment | null;
  
  // UI States
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCourses: (courses: Course[]) => void;
  setLessons: (lessons: Lesson[]) => void;
  setQuizzes: (quizzes: Quiz[]) => void;
  setAssignments: (assignments: Assignment[]) => void;
  setExams: (exams: Exam[]) => void;
  setStudents: (students: Student[]) => void;
  
  setSelectedCourse: (course: Course | null) => void;
  setSelectedLesson: (lesson: Lesson | null) => void;
  setSelectedQuiz: (quiz: Quiz | null) => void;
  setSelectedAssignment: (assignment: Assignment | null) => void;
  
  // API Actions
  fetchCourses: () => Promise<void>;
  createCourse: (courseData: Partial<Course>) => Promise<void>;
  updateCourse: (id: string, courseData: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  
  // Student Management
  approveStudent: (studentId: string, courseId: string) => Promise<void>;
  declineStudent: (studentId: string, courseId: string) => Promise<void>;
  updateStudentGrade: (studentId: string, courseId: string, grade: number) => Promise<void>;
  
  // Error Handling
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useTeacherStore = create<TeacherState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        courses: [],
        lessons: [],
        quizzes: [],
        assignments: [],
        exams: [],
        students: [],
        selectedCourse: null,
        selectedLesson: null,
        selectedQuiz: null,
        selectedAssignment: null,
        isLoading: false,
        error: null,

        // Basic State Setters
        setCourses: (courses) => set({ courses }),
        setLessons: (lessons) => set({ lessons }),
        setQuizzes: (quizzes) => set({ quizzes }),
        setAssignments: (assignments) => set({ assignments }),
        setExams: (exams) => set({ exams }),
        setStudents: (students) => set({ students }),
        
        setSelectedCourse: (course) => set({ selectedCourse: course }),
        setSelectedLesson: (lesson) => set({ selectedLesson: lesson }),
        setSelectedQuiz: (quiz) => set({ selectedQuiz: quiz }),
        setSelectedAssignment: (assignment) => set({ selectedAssignment: assignment }),
        
        setError: (error) => set({ error }),
        setLoading: (isLoading) => set({ isLoading }),

        // API Actions
        fetchCourses: async () => {
          try {
            set({ isLoading: true, error: null });
            const response = await fetch('/api/teacher/courses');
            if (!response.ok) throw new Error('Failed to fetch courses');
            const courses = await response.json();
            set({ courses, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'An error occurred', 
              isLoading: false 
            });
          }
        },

        createCourse: async (courseData) => {
          try {
            set({ isLoading: true, error: null });
            const response = await fetch('/api/teacher/courses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(courseData),
            });
            if (!response.ok) throw new Error('Failed to create course');
            const newCourse = await response.json();
            set((state) => ({ 
              courses: [...state.courses, newCourse],
              isLoading: false 
            }));
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'An error occurred', 
              isLoading: false 
            });
          }
        },

        updateCourse: async (id, courseData) => {
          try {
            set({ isLoading: true, error: null });
            const response = await fetch(`/api/teacher/courses/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(courseData),
            });
            if (!response.ok) throw new Error('Failed to update course');
            const updatedCourse = await response.json();
            set((state) => ({
              courses: state.courses.map((course) => 
                course.id === id ? updatedCourse : course
              ),
              isLoading: false
            }));
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'An error occurred', 
              isLoading: false 
            });
          }
        },

        deleteCourse: async (id) => {
          try {
            set({ isLoading: true, error: null });
            const response = await fetch(`/api/teacher/courses/${id}`, {
              method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete course');
            set((state) => ({
              courses: state.courses.filter((course) => course.id !== id),
              isLoading: false
            }));
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'An error occurred', 
              isLoading: false 
            });
          }
        },

        // Student Management
        approveStudent: async (studentId, courseId) => {
          try {
            set({ isLoading: true, error: null });
            const response = await fetch(`/api/teacher/students/${studentId}/approve`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ courseId }),
            });
            if (!response.ok) throw new Error('Failed to approve student');
            // Update local state as needed
            set({ isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'An error occurred', 
              isLoading: false 
            });
          }
        },

        declineStudent: async (studentId, courseId) => {
          try {
            set({ isLoading: true, error: null });
            const response = await fetch(`/api/teacher/students/${studentId}/decline`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ courseId }),
            });
            if (!response.ok) throw new Error('Failed to decline student');
            // Update local state as needed
            set({ isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'An error occurred', 
              isLoading: false 
            });
          }
        },

        updateStudentGrade: async (studentId, courseId, grade) => {
          try {
            set({ isLoading: true, error: null });
            const response = await fetch(`/api/teacher/students/${studentId}/grade`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ courseId, grade }),
            });
            if (!response.ok) throw new Error('Failed to update grade');
            // Update local state as needed
            set({ isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : 'An error occurred', 
              isLoading: false 
            });
          }
        },
      }),
      {
        name: 'teacher-storage',
        partialize: (state) => ({
          courses: state.courses,
          lessons: state.lessons,
          quizzes: state.quizzes,
          assignments: state.assignments,
          exams: state.exams,
        }),
      }
    )
  )
);
