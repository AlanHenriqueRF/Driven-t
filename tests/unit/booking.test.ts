import { notFoundError } from "@/errors";
import { bookingRepository, roomsRepository } from "@/repositories";
import { bookingService } from "@/services";
import faker from "@faker-js/faker";
import { any } from "joi";

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
  /* it("Should throw an error forbidden",async ()=>{
    jest.spyOn(roomsRepository, "findRoom").mockResolvedValueOnce({id:1,name:'quartinho',capacity:2, createdAt: new Date, updatedAt:new Date});

  }) */
});