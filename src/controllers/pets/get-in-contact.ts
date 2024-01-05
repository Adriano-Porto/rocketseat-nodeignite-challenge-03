import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaPetsRepository } from "../../repositories/prisma/prisma-pets-repository"
import { GetPetUseCase } from "../../use-cases/get-pet"
import { ResourceDoesNotExistsError } from "../../use-cases/errors/resource-does-not-exists"


export async function getInContact(req: FastifyRequest, reply: FastifyReply) {
    const getInContactRouteSchema = z.object({
        id: z.string(),
    })

    const { id } = getInContactRouteSchema.parse(req.params)

    const prismaPetsRepository = new PrismaPetsRepository()
    const getPetUseCase = new GetPetUseCase(prismaPetsRepository)

    try {
        const { pet }  = await getPetUseCase.execute(id)
        const whatsappUrl = `https://wa.me/${pet.org.phone}`
        return reply.redirect(whatsappUrl)

    } catch(err) {
        if (err instanceof ResourceDoesNotExistsError)
            return reply.status(400).send({msg: "Pet não encontrado"})
        throw err    
    }


}