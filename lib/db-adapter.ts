import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma

export const db = {
  event: {
    create: async (data: any) => {
      return prisma.event.create({ data })
    },
    findUnique: async (where: { id: string }) => {
      return prisma.event.findUnique({ where })
    },
    findMany: async (options?: any) => {
      return prisma.event.findMany({
        orderBy: { createdAt: 'desc' },
        ...options
      })
    },
    update: async (params: { where: { id: string }; data: any }) => {
      return prisma.event.update({
        where: params.where,
        data: params.data,
      })
    },
    findUniqueWithClaims: async (where: { id: string }) => {
      return prisma.event.findUnique({
        where,
        include: { claimedSeats: true },
      })
    },
    findManyWithClaims: async () => {
      return prisma.event.findMany({
        include: { claimedSeats: true },
        orderBy: { createdAt: 'desc' },
      })
    },
  },
  claimedSeat: {
    create: async (data: any) => {
      return prisma.claimedSeat.create({ data })
    },
    findFirst: async (where: any) => {
      return prisma.claimedSeat.findFirst({ where })
    },
  },
}
