import { PrismaClient } from '@prisma/client';
import {
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from './enrollment';

interface MockEnrollment {
  id: string;
  courseId: string;
  studentId: string;
  teacherId: string;
  date: Date;
  status: string;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  enrollment: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    enrollment: {
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

describe('Enrollment Operations', () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getEnrollmentById', () => {
    it('should fetch an enrollment by id', async () => {
      const mockEnrollment: MockEnrollment = {
        id: '1',
        courseId: 'course1',
        studentId: 'student1',
        teacherId: 'teacher1',
        date: new Date(),
        status: 'ACTIVE',
        deletedAt: null
      };

      prisma.enrollment.findUnique.mockResolvedValue(mockEnrollment);

      const result = await getEnrollmentById('1');
      expect(result).toBeDefined();
      if (!result) throw new Error('Enrollment not found');
      expect(result.id).toBe(mockEnrollment.id);
    });
  });

  describe('createEnrollment', () => {
    it('should create a new enrollment', async () => {
      const mockEnrollment: MockEnrollment = {
        id: '1',
        courseId: 'course1',
        studentId: 'student1',
        teacherId: 'teacher1',
        date: new Date(),
        status: 'ACTIVE',
        deletedAt: null
      };

      prisma.enrollment.create.mockResolvedValue(mockEnrollment);

      const enrollmentData = {
        courseId: 'course1',
        studentId: 'student1',
        teacherId: 'teacher1',
        date: new Date(),
        status: 'ACTIVE'
      };

      const result = await createEnrollment(enrollmentData);
      expect(result).toBeDefined();
      expect(result.status).toBe(enrollmentData.status);
    });
  });

  describe('updateEnrollment', () => {
    it('should update an enrollment', async () => {
      const mockEnrollment: MockEnrollment = {
        id: '1',
        courseId: 'course1',
        studentId: 'student1',
        teacherId: 'teacher1',
        date: new Date(),
        status: 'INACTIVE',
        deletedAt: null
      };

      prisma.enrollment.update.mockResolvedValue(mockEnrollment);

      const updateData = {
        status: 'INACTIVE'
      };

      const result = await updateEnrollment('1', updateData);
      expect(result).toBeDefined();
      expect(result.status).toBe(updateData.status);
    });
  });

  describe('deleteEnrollment', () => {
    it('should soft delete an enrollment', async () => {
      const mockEnrollment: MockEnrollment = {
        id: '1',
        courseId: 'course1',
        studentId: 'student1',
        teacherId: 'teacher1',
        date: new Date(),
        status: 'ACTIVE',
        deletedAt: new Date()
      };

      prisma.enrollment.update.mockResolvedValue(mockEnrollment);

      const result = await deleteEnrollment('1');
      expect(result).toBeDefined();
      expect(result.deletedAt).toBeTruthy();
    });
  });
});
