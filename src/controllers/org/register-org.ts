import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository"
import { CreateOrgUsecase } from "../../use-cases/create-org-usecase"


export async function register(req: FastifyRequest, reply: FastifyReply) {
    const orgCreateBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        cep: z.string(),
        address: z.string(),
        phone: z.string(),
        password: z.string(),
    })

    const org = orgCreateBodySchema.parse(req.body)
    const prismaPetsRepository = new PrismaOrgsRepository()
    const createOrgUsecase = new CreateOrgUsecase(prismaPetsRepository)


    await createOrgUsecase.execute(org)

    return reply.status(200).send()
}