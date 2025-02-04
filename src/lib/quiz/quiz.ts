import { PrismaClient } from '@prisma/client';

interface QuizData {
  title: string;
  description: string;
  courseId: string;
  score: number;
}

const prisma = new PrismaClient();

// Fetch functions
const getQuizById = async (id: string) => {
  return prisma.quiz.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createQuiz = async (data: QuizData) => {
  const { title, description, courseId, score } = data;

  return prisma.quiz.create({
    data: {
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      courseId,
      score,
    },
  });
};

// Update functions
const updateQuiz = async (id: string, data: Partial<QuizData>) => {
  const { title, description, courseId, score } = data;

  return prisma.quiz.update({
    where: { id, deletedAt: null },
    data: {
      title,
      description,
      updatedAt: new Date(),
      courseId,
      score,
    },
  });
};

// Delete functions
const deleteQuiz = async (id: string) => {
  return prisma.quiz.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
