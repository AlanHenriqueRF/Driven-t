import Joi from 'joi';
import { CreateTicket } from '@/protocols';

export const createTicket = Joi.object<CreateTicket>({
  ticketTypeId: Joi.number().required(),
});
