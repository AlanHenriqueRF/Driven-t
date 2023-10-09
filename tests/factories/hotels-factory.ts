import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number, capacity=2) {
  return prisma.room.create({
    data: {
      name: `${faker.name}`,
      capacity: capacity,
      hotelId: hotelId,
    },
  });
}
