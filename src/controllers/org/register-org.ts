import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository"
import { CreateOrgUsecase } from "../../use-cases/create-org-usecase"
import { ResourceAlreadyExistsError } from "../../use-cases/errors/resource-already-exists"


export async function registerOrg(req: FastifyRequest, reply: FastifyReply) {
    const orgCreateBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        cep: z.string(),
        address: z.string(),
        phone: z.string(),
        password: z.string(),
    })

    const org = orgCreateBodySchema.parse(req.body)
    const prismaOrgsRepository = new PrismaOrgsRepository()
    const createOrgUsecase = new CreateOrgUsecase(prismaOrgsRepository)

    try {
        await createOrgUsecase.execute(org)
        return reply.status(201).send()
    } catch (err) {
        if (err instanceof ResourceAlreadyExistsError) {
            return reply.status(400).send({msg: "Email já em uso"})
        } 
        throw err
    }
}