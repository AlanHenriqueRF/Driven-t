import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "./authentication-middleware";
import { enrollmentRepository, hotelsRepository, ticketsRepository } from "@/repositories";
import { notFoundError, paymentRequired } from "@/errors";

export async function CheckEnrollmentId(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { userId } = req;
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
    if (!ticket ) throw notFoundError();
    
    const hotels = await hotelsRepository.getAllHotels();

    if (hotels.length === 0) throw notFoundError() 

    if (ticket.status != 'PAID' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel ) throw paymentRequired()

    next()
}

