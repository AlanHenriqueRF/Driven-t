import { notFoundError } from "@/errors";
import { bookingRepository, roomsRepository } from "@/repositories";
import { bookingService } from "@/services";
import faker from "@faker-js/faker";
import { any, forbidden } from "joi";
import { createHotel, createRoomWithHotelId } from "../factories/hotels-factory";
import { createBooking } from "../factories/booking-factory";

describe('Get booking', () => {
  jest.spyOn(bookingRepository, "getBooking").mockResolvedValueOnce(null);

  const booking = {
    userId: 1,
  }
  const promise = bookingService.getBooking(booking.userId)
  expect(promise).rejects.toEqual(notFoundError())
})


describe("Create booking", () => {
  it("Should throw an erro when id room  no exist", async () => {
    jest.spyOn(roomsRepository, "findRoom").mockResolvedValueOnce(null);

    const booking = {
      userId: 1,
      roomId: 1
    }

    const promise = bookingService.createBooking(booking.userId, booking.roomId)
    expect(promise).rejects.toEqual(notFoundError())
  });
});