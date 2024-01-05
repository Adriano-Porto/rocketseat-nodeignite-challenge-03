import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { RegisterPetUseCase } from "../../use-cases/register-pet-usecase"
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { ResourceDoesNotExistsError } from "../../use-cases/errors/resource-does-not-exists"


export async function registerPet(req: FastifyRequest, reply: FastifyReply) {
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
    })

    const pet = petsCreateBodySchema.parse(req.body)
    const org_id = req.user.sub

    const prismaPetsRepository = new PrismaPetsRepository()
    const registerPetUseCase = new RegisterPetUseCase(prismaPetsRepository)

    

    try {
        await registerPetUseCase.execute({...pet, org_id})
        return reply.status(201).send()
        
    } catch(err) {
        if (err instanceof ResourceDoesNotExistsError) {
            return reply.status(400).send({msg: "Org does not exists"})
        }
        throw err
    }

}