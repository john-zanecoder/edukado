import { PrismaClient } from '@prisma/client';

interface LessonData {
  title: string;
  content: string;
  courseId: string;
}

const prisma = new PrismaClient();

// Fetch functions
const getLessonById = async (id: string) => {
  return prisma.lesson.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createLesson = async (data: LessonData) => {
  const { title, content, courseId } = data;

  return prisma.lesson.create({
    data: {
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
    },
  });
};

// Update functions
const updateLesson = async (id: string, data: Partial<LessonData>) => {
  const { title, content, courseId } = data;

  return prisma.lesson.update({
    where: { id, deletedAt: null },
    data: {
      title,
      content,
      updatedAt: new Date(),
      courseId,
    },
  });
};

// Delete functions
const deleteLesson = async (id: string) => {
  return prisma.lesson.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
