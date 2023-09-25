import { prisma } from '@/config';

async function GetAllTypesTickets() {
  return prisma.ticketType.findMany();
}

export const ticketsRepository = {
    GetAllTypesTickets,
};
