import { saveUser, loadUser } from '../src/helpers/user.helper'

import request from 'supertest'
import app from '../index'
import prisma from '../src/utils/prisma'

describe('User Registration ', () => {
    beforeAll(async () => {
        await prisma.user.deleteMany({})
        await prisma.organisation.deleteMany({})
        await prisma.userOrganisation.deleteMany({})
    })
    afterAll(async () => {
        await prisma.$disconnect()
    })
    it('should register user successfully  with default organisation ', async () => {
        const res = await request(app).post('/auth/register').send({
            firstname: 'John',
            lastname: 'Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            phone: '1234567890',
        })
        expect(res.status).toBe(201);
        expect(res.body.status).toBe('success')
        expect(res.body.message).toBe('Registration successfull')
        expect(res.body.data.user.firstname).toBe('John')
        expect(res.body.data.user.lastname).toBe('Doe')
        expect(res.body.data.user.email).toBe('johndoe@example.com')
        expect(res.body.data.user.phone).toBe('1234567890')
        expect(res.body.data.accessToken).toBeDefined()
        const org = await prisma.organisation.findFirst({
            where: {
                name: "John's Organisation"
            },
        })
        expect(org).toBeTruthy()



    });

    it('should fail if required fields are missing', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                lastName: 'Doe',
                email: 'jane@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(400);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0].path[0]).toBe('firstname');
    });

    it('should fail if email is duplicate', async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                firstname: 'Jane',
                lastname: 'Doe',
                email: 'johndoe@example.com', // Duplicate email
                password: 'password123',
                phone: '0987654321',
            });

        expect(res.status).toBe(400);
        
        expect(res.body.message).toBe('Registration unsuccessfull!');

    });
});

describe('User Login', () => {
    it('should log the user in successfully', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'johndoe@example.com',
                password: 'password123',
            });

        expect(res.status).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.data.accessToken).toBeDefined();
    });

    it('should fail if credentials are invalid', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                email: 'johndoe@example.com',
                password: 'wrongpassword',
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Invalid credentials")
    });
});
