import { PrismaClient } from '@prisma/client';

interface CourseGradeData {
  studentId: string;
  courseId: string;
  grade: number;
}

const prisma = new PrismaClient();

// Fetch functions
const getCourseGradeById = async (id: string) => {
  return prisma.courseGrade.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createCourseGrade = async (data: CourseGradeData) => {
  const { studentId, courseId, grade } = data;

  return prisma.courseGrade.create({
    data: {
      studentId,
      courseId,
      grade,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateCourseGrade = async (id: string, data: Partial<CourseGradeData>) => {
  const { studentId, courseId, grade } = data;

  return prisma.courseGrade.update({
    where: { id, deletedAt: null },
    data: {
      studentId,
      courseId,
      grade,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteCourseGrade = async (id: string) => {
  return prisma.courseGrade.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getCourseGradeById,
  createCourseGrade,
  updateCourseGrade,
  deleteCourseGrade,
};
