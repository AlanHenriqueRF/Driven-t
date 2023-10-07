import { forbiddenError, notFoundError } from '@/errors';
import { bookingRepository, roomsRepository } from '@/repositories';

async function getBooking(userId: number) {
    const booking = await bookingRepository.getBooking(userId);
    if (!booking) throw notFoundError();

    return booking;
}

async function createBooking(userId: number, roomId: number) {
    const roomExist = await roomsRepository.findRoom(roomId);
    if (!roomExist) throw notFoundError();

    const capacity = (await bookingRepository.findRoom(roomId));
    if (capacity.length >= roomExist.capacity) throw forbiddenError();

    const booking = { bookingId: (await bookingRepository.createBooking(userId, roomId)).id };

    return booking
}

async function updateBooking(bookingId: number, roomId: number) {
    const booking = { bookingId: (await bookingRepository.updateBooking(bookingId, roomId)).id };

    return booking
}



export const bookingService = {
    getBooking,
    createBooking,
    updateBooking
};