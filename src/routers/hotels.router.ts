import { getAllHotels, getHotelByHotelid } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { CheckEnrollmentId } from "@/middlewares/checkEnrollment-middleware";
import { Router } from "express";

const hotelsRouters = Router();

hotelsRouters
    .all('/*',authenticateToken)
    .all('/*', CheckEnrollmentId)
    .get('/',getAllHotels)
    .get('/:hotelId',getHotelByHotelid)

export {hotelsRouters};