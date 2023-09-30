import { hotelsService } from '@/services';
import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';

export async function getAllHotels(req:AuthenticatedRequest,res: Response) {
    const result = await hotelsService.getAllHotels()
    res.status(200).send(result)
}

export async function getHotelByHotelid(req:AuthenticatedRequest,res: Response) {
    console.log(req.params)
    const result = await hotelsService.getHotelByHotelid(1);
    res.status(200).send(result)
}
