import { GetAllTypesTickets, getTicketsByuser } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', GetAllTypesTickets) 
    .get('/',getTicketsByuser)
       /*.post('/',)*/

export {ticketsRouter}