import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "../../app"


describe("Authenticate E2E", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to authenticate", async () => {
        const authResponse = await request(app.server)
            .post("/org/register")
            .send({
                password: "123456",
                address: "rua nove",
                cep: "580921",
                email: "test@test.com",
                name: "testorg",
                phone: "838383838383"
            })
    
        expect(authResponse.statusCode).toEqual(201)
    })
})