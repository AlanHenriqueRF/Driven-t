import { notFoundError } from "@/errors";
import { ticketsRepository } from "@/repositories";
import { TicketType } from "@prisma/client";


async function GetAllTypesTickets(): Promise<TicketType[]> {
    const typetickets = await ticketsRepository.GetAllTypesTickets();
    if (!typetickets) throw notFoundError();
  
    return typetickets
  }
  
  
  export const ticketsservice = {
    GetAllTypesTickets,
  };