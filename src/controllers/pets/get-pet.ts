import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { GetPetUseCase } from "../../use-cases/get-pet"
import { ResourceDoesNotExistsError } from "../../use-cases/errors/resource-does-not-exists"


export async function getPet(req: FastifyRequest, reply: FastifyReply) {
    const petsGetRouteSchema = z.object({
        id: z.string(),
    })

    const { id } = petsGetRouteSchema.parse(req.params)

    const prismaPetsRepository = new PrismaPetsRepository()
    const searchPetsUseCase = new GetPetUseCase(prismaPetsRepository)

    try {
        const { pet }  = await searchPetsUseCase.execute(id)
        return reply.status(200).send({ pet })
    } catch(err) {
        if (err instanceof ResourceDoesNotExistsError)
            return reply.status(400).send({msg: "Pet não foi encontrado"})
        throw err
    }

}