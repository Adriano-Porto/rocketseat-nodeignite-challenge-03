//             city, {
// name,
// age,
// size,
// energy_level,
// independence_level,
// environment,


import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { SearchPetsUseCase } from "../../use-cases/search-pet-usecase"


export async function searchPets(req: FastifyRequest, reply: FastifyReply) {
    const petsSearchRouteSchema = z.object({
        city: z.string(),
    })
    const petsSearchQuerySchema = z.object({
        name: z.string().optional(),
        age: z.enum(["PUPPY", "ADULT", "OLD"]).optional(),
        size: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
        energy_level: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
        independence_level: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
        environment: z.enum(["OPEN", "CLOSED"]).optional(),
    })

    const args = petsSearchQuerySchema.parse(req.query) // Update to receive args as query params and city as body params

    const { city } = petsSearchRouteSchema.parse(req.params)

    const prismaPetsRepository = new PrismaPetsRepository()
    const searchPetsUseCase = new SearchPetsUseCase(prismaPetsRepository)

    const { pets } = await searchPetsUseCase.execute(city, args)

    return reply.status(200).send({ pets })

}