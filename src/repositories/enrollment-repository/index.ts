import { Enrollment } from '@prisma/client';
import { prisma } from '@/config';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  
  return prisma.enrollment.upsert({
    where: {
      userId: userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

async function getEnrollmentById(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId
    }
  })
}

async function getById(id: number) {
  return prisma.enrollment.findFirst({
    where: {
      id
    }
  })
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  getEnrollmentById,
  getById
};

export default enrollmentRepository;
