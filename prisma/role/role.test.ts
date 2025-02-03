import { PrismaClient } from '@prisma/client';
import {
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from './role';

interface MockRole {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MockPrismaClient {
  role: {
    create: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    role: {
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

describe('Role Operations', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getRoleById', () => {
    it('should fetch a role by id', async () => {
      const mockRole: MockRole = {
        id: '1',
        name: 'Test Role',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.role.findUnique.mockResolvedValue(mockRole);

      const result = await getRoleById('1');
      expect(result).toBeDefined();
      if (!result) throw new Error('Role not found');
      expect(result.id).toBe(mockRole.id);
      expect(result.name).toBe(mockRole.name);
    });
  });

  describe('createRole', () => {
    it('should create a new role', async () => {
      const mockRole: MockRole = {
        id: '1',
        name: 'New Role',
        description: 'New Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.role.create.mockResolvedValue(mockRole);

      const roleData = {
        name: 'New Role',
        description: 'New Description',
      };

      const result = await createRole(roleData);
      expect(result).toBeDefined();
      expect(result.name).toBe(roleData.name);
      expect(result.description).toBe(roleData.description);
    });
  });

  describe('updateRole', () => {
    it('should update a role', async () => {
      const mockRole: MockRole = {
        id: '1',
        name: 'Updated Role',
        description: 'Updated Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      prisma.role.update.mockResolvedValue(mockRole);

      const updateData = {
        name: 'Updated Role',
        description: 'Updated Description',
      };

      const result = await updateRole('1', updateData);
      expect(result).toBeDefined();
      expect(result.name).toBe(updateData.name);
      expect(result.description).toBe(updateData.description);
    });
  });

  describe('deleteRole', () => {
    it('should soft delete a role', async () => {
      const mockRole: MockRole = {
        id: '1',
        name: 'Test Role',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date()
      };

      prisma.role.update.mockResolvedValue(mockRole);

      const result = await deleteRole('1');
      expect(result).toBeDefined();
      expect(result.deletedAt).toBeTruthy();
    });
  });
});
