import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Hotel, Room } from '@prisma/client';

type createhotel = Omit<Hotel,"id">
type createRoom = Omit<Room,"id">



export async function creatHotel():Promise<createhotel> {
  return prisma.hotel.create({
    data: {
        name: faker.datatype.string(),
        image: 'https://'+faker.datatype.string(),
        createdAt: new Date(),
        updatedAt: new Date()
    },
  });
}

export async function creatRoom(hotelId: number):Promise<createRoom> {
    return prisma.room.create({
        data: {
            name: faker.datatype.string(),
            capacity: faker.datatype.number(),
            hotelId,
            createdAt: new Date(),
            updatedAt: new Date()
        },
      })
    
}