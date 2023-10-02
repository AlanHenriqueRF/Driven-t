import { hotelsRepository } from '@/repositories';

async function getAllHotels() {
  const result = await hotelsRepository.getAllHotels();
  return result;
}

async function getHotelByHotelid(hotelId: number) {
  const result = await hotelsRepository.getHotelByHotelid(hotelId);
  return result;
}

export const hotelsService = {
  getAllHotels,
  getHotelByHotelid,
};
