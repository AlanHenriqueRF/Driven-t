import { prisma } from '@/config';

async function getAllHotels() {
    const result = await prisma.hotel.findMany();
    return result
}

async function getHotelByHotelid(hotelId: number) {
    const result = await prisma.hotel.findUnique({
        where: { id: hotelId },
        include: { Rooms: true }
    })
    return result
}

export const hotelsRepository = { 
    getAllHotels, 
    getHotelByHotelid 
}