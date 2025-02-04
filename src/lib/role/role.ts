import { PrismaClient } from '@prisma/client';

interface RoleData {
  name: string;
  description: string;
}

const prisma = new PrismaClient();

// Fetch functions
const getRoleById = async (id: string) => {
  return prisma.role.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createRole = async (data: RoleData) => {
  const { name, description } = data;

  return prisma.role.create({
    data: {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateRole = async (id: string, data: Partial<RoleData>) => {
  const { name, description } = data;

  return prisma.role.update({
    where: { id, deletedAt: null },
    data: {
      name,
      description,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteRole = async (id: string) => {
  return prisma.role.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
