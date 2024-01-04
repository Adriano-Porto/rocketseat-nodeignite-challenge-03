import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"
import { app } from "../../app"
import { createAndAuthenticateOrg } from "../../utils/test/create-and-authenticate-org"
import { prisma } from "../../lib/prisma-client"


describe("Get Pet E2E", () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it("should be able to get pet by id", async () => {
        const org = await createAndAuthenticateOrg(app)

        const { id } = await prisma.pet.create({
            data:
                {
                    name: "seth",
                    about: "um belo gato",
                    adoption_requisites: [],
                    age: "ADULT",
                    energy_level: "LOW",
                    environment: "OPEN",
                    independence_level: "HIGH",
                    org_id: org.id,
                    photos: [],
                    size: "MEDIUM" 
                }
        })

        const getPetResponse = await request(app.server)
            .get(`/pet/${id}`)
            // Set city as a body param and the res as query params
    
        expect(getPetResponse.statusCode).toEqual(200)
        expect(getPetResponse.body.pet).toEqual(expect.objectContaining({
            name: "seth"
        }))
    })
})