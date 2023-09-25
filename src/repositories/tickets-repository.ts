import { prisma } from '@/config';

async function GetAllTypesTickets() {
  return prisma.ticketType.findMany();
}

async function GetAllbyid(userId:number) {
  return prisma.ticket.findFirst({
    select:{
      id: true,
      status:true,
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
    where:{ enrollmentId:userId} 
  })
}

export const ticketsRepository = {
    GetAllTypesTickets,
    GetAllbyid
};
