import { createBooking, getBooking, updateBooking } from "@/controllers";
import { authenticateToken, validateBody } from "@/middlewares";
import { bookingSchema } from "@/schemas/booking-schemas";
import { Router } from "express";

const bookingRouter = Router();

bookingRouter
    .all('/*', authenticateToken)
    .get('/', getBooking)
    .post('/',validateBody(bookingSchema), createBooking)
    .put('/:bookingId', validateBody(bookingSchema),updateBooking)

export {bookingRouter};