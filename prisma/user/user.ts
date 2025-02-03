import { PrismaClient, Prisma, User, Role } from '@prisma/client';

interface UserData {
  username: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'TEACHER';
  roleId: string;
  name: string;
}

interface UserWithRole extends User {
  role: Role | null;
}

const prisma = new PrismaClient();

// Fetch functions
const getUserById = async (id: string): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { id, deletedAt: null },
    include: { role: true }
  });
};

const getUsersByRole = async (role: 'STUDENT' | 'TEACHER'): Promise<User[]> => {
  return prisma.user.findMany({
    where: {
      role: { name: role },
      deletedAt: null
    },
    include: { role: true }
  });
};

const getAllUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    where: { deletedAt: null },
    include: { role: true }
  });
};

const getUserRole = async (email: string): Promise<string> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email, deletedAt: null },
      include: { role: true }
    }) as UserWithRole | null;

    if (!user?.role) throw new Error('User or role not found');
    return user.role.name;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
};

// Create functions
const createUser = async (data: UserData): Promise<User> => {
  const { username, email, password, role, roleId, name } = data;

  const createData: Prisma.UserCreateInput = {
    username,
    email,
    password,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: { connect: { id: roleId } },
    ...(role === 'STUDENT' && {
      student: { create: { name } }
    }),
    ...(role === 'TEACHER' && {
      teacher: { create: { name } }
    })
  };

  return prisma.user.create({ data: createData });
};

// Update functions
const updateUser = async (id: string, data: Partial<UserData>): Promise<User> => {
  const { username, email, password, role, roleId, name } = data;

  const updateData: Prisma.UserUpdateInput = {
    updatedAt: new Date(),
    ...(username && { username }),
    ...(email && { email }),
    ...(password && { password }),
    ...(roleId && { role: { connect: { id: roleId } } }),
    ...(role === 'STUDENT' && name && {
      student: { update: { data: { name } } }
    }),
    ...(role === 'TEACHER' && name && {
      teacher: { update: { data: { name } } }
    })
  };

  return prisma.user.update({
    where: { id, deletedAt: null },
    data: updateData
  });
};

// Delete functions
const deleteUser = async (id: string): Promise<User> => {
  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

export {
  getUserById,
  getUsersByRole,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserRole
};
