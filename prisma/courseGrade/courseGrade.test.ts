import { PrismaClient } from '@prisma/client';
import {
  getCourseGradeById,
  createCourseGrade,
  updateCourseGrade,
  deleteCourseGrade,
} from './courseGrade';

interface MockCourseGrade {
  id: string;
  studentId: string;
  courseId: string;
  grade: number;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  courseGrade: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    courseGrade: {
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

describe('Prisma Client - CourseGrade', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getCourseGradeById', async () => {
      const mockCourseGrade: MockCourseGrade = {
        id: '1',
        studentId: 'studentId',
        courseId: 'courseId',
        grade: 90,
        deletedAt: null
      };
      prisma.courseGrade.findUnique.mockResolvedValue(mockCourseGrade);

      const fetchedCourseGrade = await getCourseGradeById('1');
      expect(fetchedCourseGrade).toBeDefined();
      if (!fetchedCourseGrade) throw new Error('CourseGrade not found');
      expect(fetchedCourseGrade.id).toBe(mockCourseGrade.id);
    });
  });

  describe('Creating Logics', () => {
    test('createCourseGrade', async () => {
      const mockCourseGrade: MockCourseGrade = {
        id: '1',
        studentId: 'studentId',
        courseId: 'courseId',
        grade: 90,
        deletedAt: null
      };
      prisma.courseGrade.create.mockResolvedValue(mockCourseGrade);

      const courseGradeData = {
        studentId: 'studentId',
        courseId: 'courseId',
        grade: 90,
      };

      const courseGrade = await createCourseGrade(courseGradeData);
      expect(courseGrade).toBeDefined();
      expect(courseGrade.grade).toBe(courseGradeData.grade);
    });
  });

  describe('Updating Logics', () => {
    test('updateCourseGrade', async () => {
      const mockCourseGrade: MockCourseGrade = {
        id: '1',
        studentId: 'studentId',
        courseId: 'courseId',
        grade: 95,
        deletedAt: null
      };
      prisma.courseGrade.update.mockResolvedValue(mockCourseGrade);

      const updatedCourseGradeData = {
        studentId: 'studentId',
        courseId: 'courseId',
        grade: 95,
      };

      const updatedCourseGrade = await updateCourseGrade('1', updatedCourseGradeData);
      expect(updatedCourseGrade).toBeDefined();
      expect(updatedCourseGrade.grade).toBe(updatedCourseGradeData.grade);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteCourseGrade', async () => {
      const mockCourseGrade: MockCourseGrade = {
        id: '1',
        studentId: 'studentId',
        courseId: 'courseId',
        grade: 90,
        deletedAt: new Date()
      };
      prisma.courseGrade.update.mockResolvedValue(mockCourseGrade);

      const deletedCourseGrade = await deleteCourseGrade('1');
      expect(deletedCourseGrade).toBeDefined();
      expect(deletedCourseGrade.id).toBe(mockCourseGrade.id);
    });
  });
});
