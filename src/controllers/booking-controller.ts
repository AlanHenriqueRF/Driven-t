import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { bookingService } from '@/services';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const bookingWithUserId = await bookingService.getBooking(userId);

  return res.status(httpStatus.OK).send(bookingWithUserId);
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  return res.status(httpStatus.OK).send(await bookingService.createBooking(userId, roomId))

}

export async function updateBooking(req: AuthenticatedRequest, res: Response) {
  const {bookingId}  = req.params;
  const { roomId } = req.body;
  return res.status(httpStatus.OK).send(await bookingService.updateBooking(Number(bookingId), roomId))

}
