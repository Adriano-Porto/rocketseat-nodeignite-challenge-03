import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "../../app"
import { createAndAuthenticateOrg } from "../../utils/test/create-and-authenticate-org"
import { prisma } from "../../lib/prisma-client"


describe("Search Pet E2E", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to search pets", async () => {
        const { id } = await createAndAuthenticateOrg(app)

        await prisma.pet.createMany({
            data: [
                {
                    name: "seth",
                    about: "um belo gato",
                    adoption_requisites: [],
                    age: "ADULT",
                    energy_level: "LOW",
                    environment: "OPEN",
                    independence_level: "HIGH",
                    org_id: id,
                    photos: [],
                    size: "MEDIUM" 
                }, 
                {
                    name: "oito",
                    about: "um belo gato",
                    adoption_requisites: [],
                    age: "ADULT",
                    energy_level: "MEDIUM",
                    environment: "OPEN",
                    independence_level: "LOW",
                    org_id: id,
                    photos: [],
                    size: "MEDIUM" 
                },
                {
                    name: "oito",
                    about: "um belo gato",
                    adoption_requisites: [],
                    age: "PUPPY",
                    energy_level: "MEDIUM",
                    environment: "CLOSED",
                    independence_level: "HIGH",
                    org_id: id,
                    photos: [],
                    size: "MEDIUM" 
                }
            ]
        })

        const searchPetsResponse = await request(app.server)
            .get("/pet/search/campina_grande")
            .query({ age: "ADULT", independence_level:"HIGH"})
            // Set city as a body param and the res as query params
    
        expect(searchPetsResponse.statusCode).toEqual(200)
        expect(searchPetsResponse.body).toEqual(expect.objectContaining({
            pets: expect.arrayContaining([
                expect.objectContaining({name: "seth"})
            ])
        }))
    })
})