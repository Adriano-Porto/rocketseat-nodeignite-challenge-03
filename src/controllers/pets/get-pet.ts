import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { GetPetUseCase } from "../../use-cases/get-pet"


export async function getPet(req: FastifyRequest, reply: FastifyReply) {
    const petsGetRouteSchema = z.object({
        id: z.string(),
    })

    const { id } = petsGetRouteSchema.parse(req.params)

    const prismaPetsRepository = new PrismaPetsRepository()
    const searchPetsUseCase = new GetPetUseCase(prismaPetsRepository)

    const { pet }  = await searchPetsUseCase.execute(id)

    return reply.status(200).send({ pet })
}