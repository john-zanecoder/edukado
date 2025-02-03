import { PrismaClient } from '@prisma/client';
import {
  getExamById,
  createExam,
  updateExam,
  deleteExam,
} from './exam';

interface MockCourse {
  id: string;
  name: string;
}

interface MockTeacher {
  id: string;
  name: string;
}

interface MockQuestion {
  id: string;
  text: string;
  options: { id: string; text: string; }[];
}

interface MockExam {
  id: string;
  title: string;
  description: string;
  courseId: string;
  score: number;
  teacherId: string;
  deletedAt: Date | null;
  course?: MockCourse;
  teacher?: MockTeacher;
  questions?: MockQuestion[];
}

interface MockPrismaClient {
  exam: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    exam: {
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

describe('Exam Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getExamById', () => {
    it('should fetch an exam with all relations', async () => {
      const mockExam: MockExam = {
        id: '1',
        title: 'Test Exam',
        description: 'Test Description',
        courseId: 'course1',
        score: 100,
        teacherId: 'teacher1',
        deletedAt: null,
        course: { id: 'course1', name: 'Test Course' },
        teacher: { id: 'teacher1', name: 'Test Teacher' },
        questions: [
          {
            id: 'q1',
            text: 'Test Question',
            options: [
              { id: 'o1', text: 'Option 1' },
              { id: 'o2', text: 'Option 2' },
            ],
          },
        ],
      };

      prisma.exam.findUnique.mockResolvedValue(mockExam);

      const result = await getExamById('1');
      expect(result).toBeDefined();
      if (!result) throw new Error('Exam not found');
      expect(result.id).toBe(mockExam.id);
      expect(result.course).toBeDefined();
      expect(result.teacher).toBeDefined();
      expect(result.questions).toBeDefined();
      expect(result.questions[0].options).toBeDefined();
    });
  });

  describe('createExam', () => {
    it('should create a new exam', async () => {
      const mockExam: MockExam = {
        id: '1',
        title: 'New Exam',
        description: 'New Description',
        courseId: 'course1',
        score: 100,
        teacherId: 'teacher1',
        deletedAt: null,
      };

      prisma.exam.create.mockResolvedValue(mockExam);

      const examData = {
        title: 'New Exam',
        description: 'New Description',
        courseId: 'course1',
        score: 100,
        teacherId: 'teacher1',
      };

      const result = await createExam(examData);
      expect(result).toBeDefined();
      expect(result.title).toBe(examData.title);
      expect(result.score).toBe(examData.score);
    });
  });

  describe('updateExam', () => {
    it('should update an exam', async () => {
      const mockExam: MockExam = {
        id: '1',
        title: 'Updated Exam',
        description: 'Updated Description',
        courseId: 'course1',
        score: 90,
        teacherId: 'teacher1',
        deletedAt: null,
      };

      prisma.exam.update.mockResolvedValue(mockExam);

      const updateData = {
        title: 'Updated Exam',
        score: 90,
      };

      const result = await updateExam('1', updateData);
      expect(result).toBeDefined();
      expect(result.title).toBe(updateData.title);
      expect(result.score).toBe(updateData.score);
    });
  });

  describe('deleteExam', () => {
    it('should soft delete an exam', async () => {
      const mockExam: MockExam = {
        id: '1',
        title: 'Test Exam',
        description: 'Test Description',
        courseId: 'course1',
        score: 100,
        teacherId: 'teacher1',
        deletedAt: new Date(),
      };

      prisma.exam.update.mockResolvedValue(mockExam);

      const result = await deleteExam('1');
      expect(result).toBeDefined();
      expect(result.deletedAt).toBeTruthy();
    });
  });
});
