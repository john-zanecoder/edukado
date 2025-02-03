import { PrismaClient } from '@prisma/client';

interface StudentCourseData {
  studentId: string;
  courseId: string;
}

const prisma = new PrismaClient();

// Fetch functions
const getStudentCourseById = async (id: string) => {
  return prisma.studentCourse.findUnique({ where: { id, deletedAt: null } });
};

const getStudentCourseByStudentId = async (studentId: string) => {
  return prisma.studentCourse.findMany({ where: { studentId, deletedAt: null } });
};

const getStudentCourseByCourseId = async (courseId: string) => {
  return prisma.studentCourse.findMany({ where: { courseId, deletedAt: null } });
};

// Create functions
const createStudentCourse = async (data: StudentCourseData) => {
  const { studentId, courseId } = data;

  return prisma.studentCourse.create({
    data: {
      studentId,
      courseId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateStudentCourse = async (id: string, data: Partial<StudentCourseData>) => {
  const { studentId, courseId } = data;

  return prisma.studentCourse.update({
    where: { id, deletedAt: null },
    data: {
      studentId,
      courseId,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteStudentCourse = async (id: string) => {
  return prisma.studentCourse.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  createStudentCourse,
  updateStudentCourse,
  deleteStudentCourse,
};
