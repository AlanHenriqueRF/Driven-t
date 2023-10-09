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
    const hasBooking = await bookingRepository.getWithBookingId(bookingId);
    const hasRoom = await roomsRepository.findRoom(roomId);
    if (!hasBooking || !hasRoom) throw notFoundError();
    const reserva = await bookingRepository.findRoom(roomId);

    if ( reserva.length === 0 || hasRoom.capacity <= reserva.length) throw forbiddenError();
    
    const booking = { bookingId: (await bookingRepository.updateBooking(bookingId, roomId)).id };

    return booking
}



export const bookingService = {
    getBooking,
    createBooking,
    updateBooking
};