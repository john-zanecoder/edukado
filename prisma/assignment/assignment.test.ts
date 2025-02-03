import { PrismaClient } from '@prisma/client';
import {
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from './assignment';

interface MockAssignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: Date;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  assignment: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    assignment: {
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

describe('Prisma Client - Assignment', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Fetching Logics', () => {
    test('getAssignmentById', async () => {
      const mockAssignment: MockAssignment = {
        id: '1',
        title: 'Test Assignment',
        description: 'Test Description',
        courseId: 'courseId',
        dueDate: new Date(),
        deletedAt: null
      };
      prisma.assignment.findUnique.mockResolvedValue(mockAssignment);

      const fetchedAssignment = await getAssignmentById('1');
      expect(fetchedAssignment).toBeDefined();
      if (!fetchedAssignment) throw new Error('Assignment not found');
      expect(fetchedAssignment.id).toBe(mockAssignment.id);
    });
  });

  describe('Creating Logics', () => {
    test('createAssignment', async () => {
      const mockAssignment: MockAssignment = {
        id: '1',
        title: 'New Assignment',
        description: 'Assignment Description',
        courseId: 'courseId',
        dueDate: new Date(),
        deletedAt: null
      };
      prisma.assignment.create.mockResolvedValue(mockAssignment);

      const assignmentData = {
        title: 'New Assignment',
        description: 'Assignment Description',
        courseId: 'courseId',
        dueDate: new Date(),
        studentId: 'studentId',
        teacherId: 'teacherId'
      };

      const assignment = await createAssignment(assignmentData);
      expect(assignment).toBeDefined();
      expect(assignment.title).toBe(assignmentData.title);
    });
  });

  describe('Updating Logics', () => {
    test('updateAssignment', async () => {
      const mockAssignment: MockAssignment = {
        id: '1',
        title: 'Updated Assignment',
        description: 'Updated Description',
        courseId: 'courseId',
        dueDate: new Date(),
        deletedAt: null
      };
      prisma.assignment.update.mockResolvedValue(mockAssignment);

      const updatedAssignmentData = {
        title: 'Updated Assignment',
        description: 'Updated Description',
        courseId: 'courseId',
        dueDate: new Date(),
      };

      const updatedAssignment = await updateAssignment('1', updatedAssignmentData);
      expect(updatedAssignment).toBeDefined();
      expect(updatedAssignment.title).toBe(updatedAssignmentData.title);
    });
  });

  describe('Deleting Logics', () => {
    test('deleteAssignment', async () => {
      const mockAssignment: MockAssignment = {
        id: '1',
        title: 'Delete Assignment',
        description: 'Assignment Description',
        courseId: 'courseId',
        dueDate: new Date(),
        deletedAt: new Date()
      };
      prisma.assignment.update.mockResolvedValue(mockAssignment);

      const deletedAssignment = await deleteAssignment('1');
      expect(deletedAssignment).toBeDefined();
      expect(deletedAssignment.id).toBe(mockAssignment.id);
    });
  });
});
