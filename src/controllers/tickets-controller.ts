import { AuthenticatedRequest } from "@/middlewares";
import { ticketsservice } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";

export async function GetAllTypesTickets(req: AuthenticatedRequest, res: Response) {

    const typeAlltickets = await ticketsservice.GetAllTypesTickets();

    return res.status(httpStatus.OK).send(typeAlltickets);
}

export async function getTicketsByuser(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    const ticketbyuser = await ticketsservice.GetAllbyid(userId);

    

    return res.status(httpStatus.OK).send(ticketbyuser);
}