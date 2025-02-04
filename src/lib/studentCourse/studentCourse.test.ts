import { PrismaClient } from '@prisma/client';
import {
  getStudentCourseById,
  getStudentCourseByStudentId,
  getStudentCourseByCourseId,
  createStudentCourse,
  updateStudentCourse,
  deleteStudentCourse,
} from './studentCourse';

interface MockStudentCourse {
  id: string;
  studentId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  studentCourse: {
    create: jest.Mock;
    findUnique: jest.Mock;
    findMany: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    studentCourse: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient() as unknown as MockPrismaClient;

describe('StudentCourse Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetch Operations', () => {
    const mockStudentCourse: MockStudentCourse = {
      id: '1',
      studentId: 'student1',
      courseId: 'course1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null
    };

    it('should fetch a student course by id', async () => {
      prisma.studentCourse.findUnique.mockResolvedValue(mockStudentCourse);

      const result = await getStudentCourseById('1');
      expect(result).toBeDefined();
      if (!result) throw new Error('StudentCourse not found');
      expect(result.id).toBe(mockStudentCourse.id);
    });

    it('should fetch student courses by student id', async () => {
      prisma.studentCourse.findMany.mockResolvedValue([mockStudentCourse]);

      const result = await getStudentCourseByStudentId('student1');
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].studentId).toBe(mockStudentCourse.studentId);
    });

    it('should fetch student courses by course id', async () => {
      prisma.studentCourse.findMany.mockResolvedValue([mockStudentCourse]);

      const result = await getStudentCourseByCourseId('course1');
      expect(result).toBeDefined();
      expect(result).toHaveLength(1);
      expect(result[0].courseId).toBe(mockStudentCourse.courseId);
    });
  });

  describe('createStudentCourse', () => {
    it('should create a new student course', async () => {
      const mockStudentCourse: MockStudentCourse = {
        id: '1',
        studentId: 'student1',
        courseId: 'course1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.studentCourse.create.mockResolvedValue(mockStudentCourse);

      const studentCourseData = {
        studentId: 'student1',
        courseId: 'course1',
      };

      const result = await createStudentCourse(studentCourseData);
      expect(result).toBeDefined();
      expect(result.studentId).toBe(studentCourseData.studentId);
      expect(result.courseId).toBe(studentCourseData.courseId);
    });
  });

  describe('updateStudentCourse', () => {
    it('should update a student course', async () => {
      const mockStudentCourse: MockStudentCourse = {
        id: '1',
        studentId: 'student2',
        courseId: 'course2',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.studentCourse.update.mockResolvedValue(mockStudentCourse);

      const updateData = {
        studentId: 'student2',
        courseId: 'course2',
      };

      const result = await updateStudentCourse('1', updateData);
      expect(result).toBeDefined();
      expect(result.studentId).toBe(updateData.studentId);
      expect(result.courseId).toBe(updateData.courseId);
    });
  });

  describe('deleteStudentCourse', () => {
    it('should soft delete a student course', async () => {
      const mockStudentCourse: MockStudentCourse = {
        id: '1',
        studentId: 'student1',
        courseId: 'course1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      };

      prisma.studentCourse.update.mockResolvedValue(mockStudentCourse);

      const result = await deleteStudentCourse('1');
      expect(result).toBeDefined();
      expect(result.deletedAt).toBeTruthy();
    });
  });
});
