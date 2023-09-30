import { getAllHotels, getHotelByHotelid } from "@/controllers";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const hotelsRouters = Router();

hotelsRouters
    .all('/*',authenticateToken)
    .get('/',getAllHotels)
    .get('/:hotelId',getHotelByHotelid)

export {hotelsRouters};