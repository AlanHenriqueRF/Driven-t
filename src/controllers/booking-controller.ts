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
    return res.status(httpStatus.OK).send(await bookingService.createBooking(userId,roomId))

  /* return res.sendStatus(httpStatus.OK); */
}
/* 
export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const { cep } = req.query as CEP;

  const address = await enrollmentsService.getAddressFromCEP(cep);
  res.status(httpStatus.OK).send(address);
} */
