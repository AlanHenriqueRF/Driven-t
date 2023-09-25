import { enrollmentNotFoundError, notFoundError } from "@/errors";
import { enrollmentRepository, ticketsRepository } from "@/repositories";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";


async function GetAllTypesTickets(): Promise<TicketType[]> {
    const typetickets = await ticketsRepository.GetAllTypesTickets();
    if (!typetickets) throw notFoundError();

    return typetickets
}

async function GetAllbyid(userId: number): Promise<getTicketById> {//Promise<getTicketById> {
    const ticketbyid = await ticketsRepository.GetAllbyid(userId);
    const checkEnrrolment = await enrollmentRepository.findWithAddressByUserId(userId);

    if (!ticketbyid || !ticketbyid.enrollmentId || !checkEnrrolment) throw notFoundError();

    return ticketbyid
}

export type getTicketById = { id: number; status: TicketStatus; enrollmentId: number; TicketType: { id: number; createdAt: Date; updatedAt: Date; name: string; price: number; isRemote: boolean; includesHotel: boolean; }; createdAt: Date; updatedAt: Date; }


export const ticketsservice = {
    GetAllTypesTickets,
    GetAllbyid
};