import { prisma } from '@/config';
import { TicketStatus } from '@prisma/client';

async function GetAllTypesTickets() {
  return prisma.ticketType.findMany();
}

async function GetAllbyid(userId: number) {
  return prisma.ticket.findFirst({
    select: {
      id: true,
      status: true,
      enrollmentId: true,
      TicketType: {
        select: {
          id: true,
          name: true,
          price: true,
          isRemote: true,
          includesHotel: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
    where: { enrollmentId: userId }
  })
}

async function postTicket(ticket:createTicket) {
  return prisma.ticket.create({
    data: ticket
  })
}

export type createTicket = {
    id?: number
    ticketTypeId: number
    enrollmentId: number
    status: TicketStatus
    createdAt?: Date | string
    updatedAt?: Date | string
}
export const ticketsRepository = {
  GetAllTypesTickets,
  GetAllbyid,
  postTicket
};
