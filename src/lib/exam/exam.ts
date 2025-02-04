import { PrismaClient } from '@prisma/client';

interface ExamData {
  title: string;
  description: string;
  courseId: string;
  score: number;
  teacherId: string;
}

const prisma = new PrismaClient();

// Fetch functions
const getExamById = async (id: string) => {
  return prisma.exam.findUnique({
    where: { id, deletedAt: null },
    include: {
      course: true,
      teacher: true,
      questions: {
        include: {
          options: true,
        },
      },
    },
  });
};

// Create functions
const createExam = async (data: ExamData) => {
  const { title, description, courseId, score, teacherId } = data;

  return prisma.exam.create({
    data: {
      title,
      description,
      courseId,
      score,
      teacherId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateExam = async (id: string, data: Partial<ExamData>) => {
  const { title, description, courseId, score, teacherId } = data;

  return prisma.exam.update({
    where: { id, deletedAt: null },
    data: {
      title,
      description,
      courseId,
      score,
      teacherId,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteExam = async (id: string) => {
  return prisma.exam.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getExamById,
  createExam,
  updateExam,
  deleteExam,
};
