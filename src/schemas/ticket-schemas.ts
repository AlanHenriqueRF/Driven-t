import { CreateTicket } from "@/protocols";
import Joi from "joi";

export const createTicket = Joi.object<CreateTicket>({
    ticketTypeId: Joi.number().required()
})