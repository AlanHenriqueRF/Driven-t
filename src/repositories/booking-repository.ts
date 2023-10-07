import { prisma } from '@/config';

async function getBooking(userId: number){
  return prisma.booking.findFirst(
    {
        where:{
            userId
        },
        select:{
            id:true,
            Room:{
                select:{
                    id:true,
                    name: true,
                    capacity: true,
                    hotelId:true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        },
}
  );
}

export const bookingRepository = {
    getBooking,
};
