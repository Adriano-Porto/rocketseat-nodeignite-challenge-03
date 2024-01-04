import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "../../app"
import { prisma } from "../../lib/prisma-client"
import { hash } from "bcrypt"


describe("Authenticate E2E", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to authenticate", async () => {
        await prisma.oRG.create({
            data: {
                address: "rua nove",
                cep: "580921",
                email: "test@test.com",
                name: "testorg",
                password_hash: await hash("123456", 6),
                phone: "838383838383"
            }
        })
    
        const authResponse = await request(app.server)
            .post("/org/login")
            .send({
                email: "test@test.com",
                password: "123456"
            })
    
        expect(authResponse.statusCode).toEqual(200)

        expect(authResponse.body).toEqual(expect.objectContaining({
            token: expect.any(String)
        }))
    })
})