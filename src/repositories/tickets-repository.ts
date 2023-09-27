import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function GetAllTypesTickets() {
  return prisma.ticketType.findMany();
}

async function GetAllbyid(userId: number) {
  return prisma.ticket.findUnique({
    select: {
      id: true,
      status: true,
      ticketTypeId: true,
      enrollmentId: true,
      createdAt: true,
      updatedAt: true,
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
    },
    where: { enrollmentId: userId },
  });
}

async function postTicket(ticket: createTicket) {
  return prisma.ticket.create({
    data: ticket,
  });
}

export type createTicket = {
  id?: number;
  ticketTypeId: number;
  enrollmentId: number;
  status: TicketStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};
export const ticketsRepository = {
  GetAllTypesTickets,
  GetAllbyid,
  postTicket,
};
