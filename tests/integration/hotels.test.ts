import httpStatus from 'http-status';
import supertest from 'supertest';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import faker from '@faker-js/faker';
import { creatHotel, creatRoom, createEnrollmentWithAddress, createTicket, createTicketType, createUser } from '../factories';
import * as jwt from 'jsonwebtoken';
import { hotelsRepository } from '@/repositories';
import { prisma } from '@/config';

beforeAll(async () => {
    await init();
    await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
  });


const server = supertest(app);

describe('Get /hotels', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/hotels');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe('When token is authorizad', () => {
        it('Should respond with status 404 when no enrrolment', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })

        it('Should respond with status 404 when no exist tickt', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
    
            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)
    
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })

        it('Should respond with status 404 when no exist hotels', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType()
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')

            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })

        it('Should respond with status 402 when ticket no PAID', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType()
            const ticket = await createTicket(enrollment.id,typeTicket.id,'RESERVED')
            const hotel = await creatHotel();
            const hotels = await hotelsRepository.getAllHotels();

            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        });

        it('Should respond with status 402 when ticket isremote', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType(true)
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')
            const hotel = await creatHotel();
            const hotels = await hotelsRepository.getAllHotels();
            
            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        })

        it('Should respond with status 402 when no includesHotel', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType(false,false)
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')
            const hotel = await creatHotel();
            const hotels = await hotelsRepository.getAllHotels();
            
            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        })

        it('Should responde with status 200 and a specific array', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType(false,true)
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')
            const hotel = await creatHotel();
            const hotels = await hotelsRepository.getAllHotels();
            
            const {status,body} = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(status).toEqual(httpStatus.OK);
            expect(body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        image: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    })
                ]))
        })
    })


})

describe('Get /hotels:id', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/hotels/1');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });


    describe('When token is authorizad', () => {
        it('Should respond with status 404 when no enrrolment', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);

            const response = await server
                .get('/hotels/1')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })

        it('Should respond with status 404 when no exist tickt', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);

            const response = await server
                .get('/hotels/1')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })

        it('Should respond with status 404 when no exist hotels', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType()
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')

            const response = await server
                .get('/hotels/1')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })
        
        it('Should respond with status 402 when ticket no PAID', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType()
            const ticket = await createTicket(enrollment.id,typeTicket.id,'RESERVED')
            const hotel = await creatHotel();
            
            const response = await server
                .get('/hotels/1')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        })

        it('Should respond with status 402 when ticket isremote', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType(true)
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')
            const hotel = await creatHotel();
            const hotels = await hotelsRepository.getAllHotels();
            
            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        })

        it('Should respond with status 402 when no includesHotel', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType(false,false)
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')
            const hotel = await creatHotel();
            const hotels = await hotelsRepository.getAllHotels();
            
            const response = await server
                .get('/hotels')
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        })

        it('Should responde with status 200 and a specific array', async()=>{
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const typeTicket = await createTicketType(false,true)
            const ticket = await createTicket(enrollment.id,typeTicket.id,'PAID')
            const hotel = await creatHotel();
            const hotels = await hotelsRepository.getAllHotels();
            const room = await creatRoom(hotels[0].id)
            
            const {status,body} = await server
                .get(`/hotels/${hotels[0].id}`)
                .set('Authorization', `Bearer ${token}`)

            expect(status).toEqual(httpStatus.OK);
            expect(body).toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                        image: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        Rooms: expect.arrayContaining([
                            expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String),
                                capacity: expect.any(Number),
                                hotelId: expect.any(Number),
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String)
                            })
                        ])
                    })
                )
        })

    })


})