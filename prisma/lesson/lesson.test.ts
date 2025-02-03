import { PrismaClient } from '@prisma/client';
import {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} from './lesson';

interface MockLesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  lesson: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    lesson: {
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

describe('Lesson Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getLessonById', () => {
    it('should fetch a lesson by id', async () => {
      const mockLesson: MockLesson = {
        id: '1',
        title: 'Test Lesson',
        content: 'Test Content',
        courseId: 'course1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.lesson.findUnique.mockResolvedValue(mockLesson);

      const result = await getLessonById('1');
      expect(result).toBeDefined();
      if (!result) throw new Error('Lesson not found');
      expect(result.id).toBe(mockLesson.id);
      expect(result.title).toBe(mockLesson.title);
    });
  });

  describe('createLesson', () => {
    it('should create a new lesson', async () => {
      const mockLesson: MockLesson = {
        id: '1',
        title: 'New Lesson',
        content: 'New Content',
        courseId: 'course1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.lesson.create.mockResolvedValue(mockLesson);

      const lessonData = {
        title: 'New Lesson',
        content: 'New Content',
        courseId: 'course1',
      };

      const result = await createLesson(lessonData);
      expect(result).toBeDefined();
      expect(result.title).toBe(lessonData.title);
      expect(result.content).toBe(lessonData.content);
    });
  });

  describe('updateLesson', () => {
    it('should update a lesson', async () => {
      const mockLesson: MockLesson = {
        id: '1',
        title: 'Updated Lesson',
        content: 'Updated Content',
        courseId: 'course1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.lesson.update.mockResolvedValue(mockLesson);

      const updateData = {
        title: 'Updated Lesson',
        content: 'Updated Content',
      };

      const result = await updateLesson('1', updateData);
      expect(result).toBeDefined();
      expect(result.title).toBe(updateData.title);
      expect(result.content).toBe(updateData.content);
    });
  });

  describe('deleteLesson', () => {
    it('should soft delete a lesson', async () => {
      const mockLesson: MockLesson = {
        id: '1',
        title: 'Test Lesson',
        content: 'Test Content',
        courseId: 'course1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      };

      prisma.lesson.update.mockResolvedValue(mockLesson);

      const result = await deleteLesson('1');
      expect(result).toBeDefined();
      expect(result.deletedAt).toBeTruthy();
    });
  });
});
