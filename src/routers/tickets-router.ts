import { GetAllTypesTickets } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', GetAllTypesTickets) 
    /* .get('/',)
       .post('/',)*/

export {ticketsRouter}