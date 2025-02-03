import { PrismaClient } from '@prisma/client';
import {
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from './quiz';

interface MockQuiz {
  id: string;
  title: string;
  description: string;
  courseId: string;
  score: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  quiz: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    quiz: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient() as unknown as MockPrismaClient;

describe('Quiz Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getQuizById', () => {
    it('should fetch a quiz by id', async () => {
      const mockQuiz: MockQuiz = {
        id: '1',
        title: 'Test Quiz',
        description: 'Test Description',
        courseId: 'course1',
        score: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.quiz.findUnique.mockResolvedValue(mockQuiz);

      const result = await getQuizById('1');
      expect(result).toBeDefined();
      if (!result) throw new Error('Quiz not found');
      expect(result.id).toBe(mockQuiz.id);
      expect(result.title).toBe(mockQuiz.title);
    });
  });

  describe('createQuiz', () => {
    it('should create a new quiz', async () => {
      const mockQuiz: MockQuiz = {
        id: '1',
        title: 'New Quiz',
        description: 'New Description',
        courseId: 'course1',
        score: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.quiz.create.mockResolvedValue(mockQuiz);

      const quizData = {
        title: 'New Quiz',
        description: 'New Description',
        courseId: 'course1',
        score: 100,
      };

      const result = await createQuiz(quizData);
      expect(result).toBeDefined();
      expect(result.title).toBe(quizData.title);
      expect(result.score).toBe(quizData.score);
    });
  });

  describe('updateQuiz', () => {
    it('should update a quiz', async () => {
      const mockQuiz: MockQuiz = {
        id: '1',
        title: 'Updated Quiz',
        description: 'Updated Description',
        courseId: 'course1',
        score: 90,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.quiz.update.mockResolvedValue(mockQuiz);

      const updateData = {
        title: 'Updated Quiz',
        score: 90,
      };

      const result = await updateQuiz('1', updateData);
      expect(result).toBeDefined();
      expect(result.title).toBe(updateData.title);
      expect(result.score).toBe(updateData.score);
    });
  });

  describe('deleteQuiz', () => {
    it('should soft delete a quiz', async () => {
      const mockQuiz: MockQuiz = {
        id: '1',
        title: 'Test Quiz',
        description: 'Test Description',
        courseId: 'course1',
        score: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      };

      prisma.quiz.update.mockResolvedValue(mockQuiz);

      const result = await deleteQuiz('1');
      expect(result).toBeDefined();
      expect(result.deletedAt).toBeTruthy();
    });
  });
});
