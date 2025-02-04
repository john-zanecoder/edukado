import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface AssignmentData {
  title: string;
  description: string;
  dueDate: Date;
  courseId: string;
  studentId: string;
  teacherId: string;
}

// Fetch functions
const getAssignmentById = async (id: string) => {
  return prisma.assignment.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createAssignment = async (data: AssignmentData) => {
  const { title, description, dueDate, courseId, studentId, teacherId } = data;

  return prisma.assignment.create({
    data: {
      title,
      description,
      dueDate,
      courseId,
      studentId,
      teacherId,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateAssignment = async (id: string, data: Partial<AssignmentData>) => {
  const { title, description, dueDate, courseId, studentId, teacherId } = data;

  return prisma.assignment.update({
    where: { id, deletedAt: null },
    data: {
      title,
      description,
      dueDate,
      courseId,
      studentId,
      teacherId,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteAssignment = async (id: string) => {
  return prisma.assignment.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};
