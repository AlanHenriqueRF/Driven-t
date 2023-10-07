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

async function createBooking(roomId:number,userId:number) {
    return prisma.booking.create({
        data:{
            userId,
            roomId,
        }
    })
}

async function findRoom(roomId:number) {
    return prisma.booking.findMany({
        where:{roomId}
    })    
}

export const bookingRepository = {
    getBooking,
    createBooking,
    findRoom
};
