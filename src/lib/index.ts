import { PrismaClient } from '@prisma/client';

// Import all functions from their respective modules
import {
  getUserById,
  getUsersByRole,
  getAllUsers,
  getUserRole,
} from './user/user';

import {
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  createStudentCourse,
  updateStudentCourse,
  deleteStudentCourse,
} from './studentCourse/studentCourse';

import {
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from './quiz/quiz';

import {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from './lesson/lesson';

import {
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from './role/role';

import {
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from './course/course';

const prisma = new PrismaClient();

async function main() {
  // Initialize or seed database if needed
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {
  // User operations
  getUserById,
  getUsersByRole,
  getAllUsers,
  getUserRole,
  
  // StudentCourse operations
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  createStudentCourse,
  updateStudentCourse,
  deleteStudentCourse,
  
  // Quiz operations
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  
  // Lesson operations
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  
  // Role operations
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
  
  // Course operations
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
