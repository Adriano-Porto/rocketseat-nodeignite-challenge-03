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
        await request(app.server)
            .post("/org/register")
            .send({
                password: "123456",
                address: "rua nove",
                cep: "580921",
                email: "test@test.com",
                name: "testorg",
                phone: "838383838383"
            })

        const loginOrgResponse = await request(app.server)
            .post("/org/login")
            .send({
                email: "test@test.com",
                password: "123456",
            })

        const { token } = loginOrgResponse.body

        const createPetResponse = await request(app.server)
            .post("/pet/register")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "seth",
                about: "um belo gato",
                adoption_requisites: [],
                age: "ADULT",
                energy_level: "LOW",
                environment: "OPEN",
                independence_level: "HIGH",
                photos: [],
                size: "MEDIUM"
            })
    
        expect(createPetResponse.statusCode).toEqual(201)
    })
})