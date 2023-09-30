import faker from '@faker-js/faker';
import { prisma } from '@/config';
import { Hotel } from '@prisma/client';

type createhotel = Omit<Hotel,"id">

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