import { notFoundError } from '@/errors';
import { bookingRepository, eventRepository } from '@/repositories';
import { exclude } from '@/utils/prisma-utils';
import { Booking } from '@prisma/client';

async function getBooking(userId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

/* export type getBooking = Omit<Booking, 'createdAt' | 'updatedAt'>; */
/*
async function isCurrentEventActive(): Promise<boolean> {
  const event = await eventRepository.findFirst();
  if (!event) return false;

  const now = dayjs();
  const eventStartsAt = dayjs(event.startsAt);
  const eventEndsAt = dayjs(event.endsAt);

  return now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
} */

export const bookingService = {
    getBooking
};