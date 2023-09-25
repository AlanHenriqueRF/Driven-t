import { GetAllTypesTickets, getTicketsByuser, postTicket } from "@/controllers/tickets-controller";
import { authenticateToken, validateBody } from "@/middlewares";
import { createTicket } from "@/schemas";
import { Router } from "express";


const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', GetAllTypesTickets)
    .get('/', getTicketsByuser)
    .post('/', validateBody(createTicket), postTicket)

export { ticketsRouter }