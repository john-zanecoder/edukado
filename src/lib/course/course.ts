import { PrismaClient } from '@prisma/client';

interface CourseData {
  title: string;
  description: string;
  teacherId: string;
}

const prisma = new PrismaClient();

// Fetch functions
const getCourseById = async (id: string) => {
  return prisma.course.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createCourse = async (data: CourseData) => {
  const { title, description, teacherId } = data;

  return prisma.course.create({
    data: {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      teacherId,
    },
  });
};

// Update functions
const updateCourse = async (id: string, data: Partial<CourseData>) => {
  const { title, description, teacherId } = data;

  return prisma.course.update({
    where: { id, deletedAt: null },
    data: {
      title,
      description,
      updatedAt: new Date(),
      teacherId,
    },
  });
};

// Delete functions
const deleteCourse = async (id: string) => {
  return prisma.course.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
