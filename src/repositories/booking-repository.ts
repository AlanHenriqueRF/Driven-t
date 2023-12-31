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

async function getWithBookingId(bookingId:number) {
    return prisma.booking.findFirst({
        where: {id:bookingId}
    })
    
}

async function createBooking(userId:number,roomId:number) {
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

async function updateBooking(bookingId:number, roomId: number) {
    return prisma.booking.update({
        where:{id:bookingId},
        data:{
            roomId
        }
    })
}

export const bookingRepository = {
    getBooking,
    createBooking,
    findRoom,
    updateBooking,
    getWithBookingId
};
