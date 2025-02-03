import { PrismaClient } from '@prisma/client';

interface EnrollmentData {
  courseId: string;
  studentId: string;
  teacherId: string;
  date: Date;
  status: string;
}

const prisma = new PrismaClient();

// Fetch functions
const getEnrollmentById = async (id: string) => {
  return prisma.enrollment.findUnique({ where: { id, deletedAt: null } });
};

// Create functions
const createEnrollment = async (data: EnrollmentData) => {
  const { courseId, studentId, teacherId, date, status } = data;

  return prisma.enrollment.create({
    data: {
      courseId,
      studentId,
      teacherId,
      date,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};

// Update functions
const updateEnrollment = async (id: string, data: Partial<EnrollmentData>) => {
  const { courseId, studentId, teacherId, date, status } = data;

  return prisma.enrollment.update({
    where: { id, deletedAt: null },
    data: {
      courseId,
      studentId,
      teacherId,
      date,
      status,
      updatedAt: new Date(),
    },
  });
};

// Delete functions
const deleteEnrollment = async (id: string) => {
  return prisma.enrollment.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export {
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
};
