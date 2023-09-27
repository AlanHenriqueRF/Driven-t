import { TicketStatus, TicketType } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { enrollmentRepository, ticketsRepository } from '@/repositories';

async function GetAllTypesTickets(): Promise<TicketType[]> {
  const typetickets = await ticketsRepository.GetAllTypesTickets();

  return typetickets;
}

async function GetAllbyid(userId: number): Promise<getTicketById> {
  const checkEnrrolment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!checkEnrrolment) throw notFoundError();

  const ticketbyid = await ticketsRepository.GetAllbyid(checkEnrrolment.id);

  if (!ticketbyid) throw notFoundError();

  return ticketbyid;
}

export type getTicketById = {
  id: number;
  status: TicketStatus;
  ticketTypeId: number;
  enrollmentId: number;
  createdAt: Date;
  updatedAt: Date;
  TicketType: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    price: number;
    isRemote: boolean;
    includesHotel: boolean;
  };
};

async function postTicket(ticketTypeId: number, userId: number) {
  const checkEnrrolment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!checkEnrrolment) throw notFoundError();

  const Ticket = {
    ticketTypeId,
    enrollmentId: checkEnrrolment.id,
    status: TicketStatus.RESERVED,
    updatedAt: new Date().toISOString(),
  };

  const result = await ticketsRepository.postTicket(Ticket);
  return await ticketsRepository.GetAllbyid(result.enrollmentId);
}

export const ticketsservice = {
  GetAllTypesTickets,
  GetAllbyid,
  postTicket,
};
