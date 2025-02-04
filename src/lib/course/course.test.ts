import { PrismaClient } from '@prisma/client';
import {
  createCourse,
  updateCourse,
  deleteCourse,
} from './course';

interface MockCourse {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  course: {
    create: jest.Mock;
    update: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    course: {
      create: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient() as unknown as MockPrismaClient;

describe('Course Model', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Creating Logics', () => {
    test('createCourse', async () => {
      const mockCourse: MockCourse = {
        id: '1',
        title: 'New Course',
        description: 'Course Description',
        teacherId: 'teacherId',
        deletedAt: null
      };
      prisma.course.create.mockResolvedValue(mockCourse);

      const courseData = {
        title: 'New Course',
        description: 'Course Description',
        teacherId: 'teacherId',
      };

      const course = await createCourse(courseData);
      expect(course).toBeDefined();
      expect(course.title).toBe(courseData.title);
    });
  });

  describe('Updating Logics', () => {
    test('updateCourse', async () => {
      const mockCourse: MockCourse = {
        id: '1',
        title: 'Updated Course',
        description: 'Updated Description',
        teacherId: 'teacherId',
        deletedAt: null
      };
      prisma.course.update.mockResolvedValue(mockCourse);

      const updatedCourseData = {
        title: 'Updated Course',
        description: 'Updated Description',
        teacherId: 'teacherId',
      };

      const updatedCourse = await updateCourse('1', updatedCourseData);
      expect(updatedCourse).toBeDefined();
      expect(updatedCourse.title).toBe(updatedCourseData.title);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteCourse', async () => {
      const mockCourse: MockCourse = {
        id: '1',
        title: 'Delete Course',
        description: 'Course Description',
        teacherId: 'teacherId',
        deletedAt: new Date()
      };
      prisma.course.update.mockResolvedValue(mockCourse);

      const deletedCourse = await deleteCourse('1');
      expect(deletedCourse).toBeDefined();
      expect(deletedCourse.id).toBe(mockCourse.id);
    });
  });
});
