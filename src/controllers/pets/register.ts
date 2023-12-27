import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterPetUseCase } from "../../use-cases/register-pet-usecase"
import { PrismaPetsRepository } from "../../repositories/prisma/petsRepository"


export async function register(req: FastifyRequest, reply: FastifyReply) {
    const petsCreateBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.enum(["PUPPY", "ADULT", "OLD"]),
        size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
        energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
        independence_level: z.enum(["LOW", "MEDIUM", "HIGH"]),
        environment: z.enum(["OPEN", "CLOSED"]),
        photos: z.array(z.string()),
        adoption_requisites: z.array(z.string()),
        org_id: z.string()
    })

    const pet = petsCreateBodySchema.parse(req.body)
    const prismaPetsRepository = new PrismaPetsRepository()
    const registerPetUseCase = new RegisterPetUseCase(prismaPetsRepository)


    await registerPetUseCase.execute(pet)

    return reply.status(200).send()
}