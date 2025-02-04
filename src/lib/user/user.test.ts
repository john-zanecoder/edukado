import { PrismaClient, User, Role, Prisma } from '@prisma/client';
import {
  getUserById,
  getUsersByRole,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserRole,
} from './user';

// Define complete interfaces matching Prisma schema
interface MockRole extends Role {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MockStudent {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MockTeacher {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface MockUser extends Omit<User, 'role'> {
  id: string;
  username: string;
  email: string;
  password: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  role?: MockRole;
  student?: MockStudent;
  teacher?: MockTeacher;
}

interface MockPrismaClient {
  user: {
    create: jest.Mock<Promise<MockUser>, [{ data: Prisma.UserCreateInput }]>;
    findUnique: jest.Mock<Promise<MockUser | null>, [{ where: Prisma.UserWhereUniqueInput, include?: Prisma.UserInclude }]>;
    findMany: jest.Mock<Promise<MockUser[]>, [{ where: Prisma.UserWhereInput, include?: Prisma.UserInclude }]>;
    update: jest.Mock<Promise<MockUser>, [{ where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput }]>;
  };
  $disconnect: jest.Mock;
}

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const prisma = new PrismaClient() as unknown as MockPrismaClient;

describe('User Operations', () => {
  const mockDate = new Date();
  
  const mockRole: MockRole = {
    id: 'role1',
    name: 'STUDENT',
    description: 'Student Role',
    createdAt: mockDate,
    updatedAt: mockDate,
    deletedAt: null,
  };

  const mockUser: MockUser = {
    id: '1',
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
    roleId: 'role1',
    createdAt: mockDate,
    updatedAt: mockDate,
    deletedAt: null,
    role: mockRole,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('getUserById', () => {
    it('should fetch a user by id', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getUserById('1');
      
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: '1', deletedAt: null },
        include: { role: true }
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null for non-existent user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await getUserById('999');
      expect(result).toBeNull();
    });
  });

  describe('getUsersByRole', () => {
    it('should fetch users by role', async () => {
      prisma.user.findMany.mockResolvedValue([mockUser]);

      const result = await getUsersByRole('STUDENT');
      
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          role: { name: 'STUDENT' },
          deletedAt: null
        },
        include: { role: true }
      });
      expect(result).toEqual([mockUser]);
    });
  });

  describe('getAllUsers', () => {
    it('should fetch all active users', async () => {
      prisma.user.findMany.mockResolvedValue([mockUser]);

      const result = await getAllUsers();
      
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        include: { role: true }
      });
      expect(result).toEqual([mockUser]);
    });
  });

  describe('getUserRole', () => {
    it('should get user role by email', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await getUserRole('test@example.com');
      
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com', deletedAt: null },
        include: { role: true }
      });
      expect(result).toBe('STUDENT');
    });

    it('should throw error for non-existent user', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(getUserRole('nonexistent@example.com'))
        .rejects
        .toThrow('User or role not found');
    });
  });

  describe('createUser', () => {
    it('should create a student user', async () => {
      const studentUser = {
        ...mockUser,
        student: { 
          id: 'student1',
          name: 'Test Student',
          userId: '1',
          createdAt: mockDate,
          updatedAt: mockDate,
          deletedAt: null
        }
      };
      prisma.user.create.mockResolvedValue(studentUser);

      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'STUDENT' as const,
        roleId: 'role1',
        name: 'Test Student',
      };

      const result = await createUser(userData);
      
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result).toEqual(studentUser);
    });

    it('should create a teacher user', async () => {
      const teacherUser = {
        ...mockUser,
        role: { ...mockRole, name: 'TEACHER' },
        teacher: {
          id: 'teacher1',
          name: 'Test Teacher',
          userId: '1',
          createdAt: mockDate,
          updatedAt: mockDate,
          deletedAt: null
        }
      };
      prisma.user.create.mockResolvedValue(teacherUser);

      const userData = {
        username: 'teacheruser',
        email: 'teacher@example.com',
        password: 'password123',
        role: 'TEACHER' as const,
        roleId: 'role1',
        name: 'Test Teacher',
      };

      const result = await createUser(userData);
      
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result).toEqual(teacherUser);
    });
  });

  describe('updateUser', () => {
    it('should update user details', async () => {
      const updatedUser = {
        ...mockUser,
        username: 'updateduser',
        email: 'updated@example.com'
      };
      prisma.user.update.mockResolvedValue(updatedUser);

      const updateData = {
        username: 'updateduser',
        email: 'updated@example.com'
      };

      const result = await updateUser('1', updateData);
      
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '1', deletedAt: null },
        data: expect.objectContaining({
          username: 'updateduser',
          email: 'updated@example.com',
          updatedAt: expect.any(Date)
        })
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should soft delete a user', async () => {
      const deletedUser = {
        ...mockUser,
        deletedAt: mockDate
      };
      prisma.user.update.mockResolvedValue(deletedUser);

      const result = await deleteUser('1');
      
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { deletedAt: expect.any(Date) }
      });
      expect(result.deletedAt).toBeTruthy();
    });
  });
});
