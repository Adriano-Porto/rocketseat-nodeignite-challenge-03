import { FastifyInstance } from "fastify"
import { prisma } from "../../lib/prisma-client"
import { hash } from "bcrypt"
import request from "supertest"

export async function createAndAuthenticateOrg (
    app: FastifyInstance
) {
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
        .post("/login")
        .send({
            email: "test@test.com",
            password: "123456"
        })

    const { token } = authResponse.body

    return {
        token
    }
}