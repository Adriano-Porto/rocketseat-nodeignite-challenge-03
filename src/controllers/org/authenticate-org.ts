import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository"
import { AuthenticateOrgUseCase } from "../../use-cases/authenticate-org"


export async function register(req: FastifyRequest, reply: FastifyReply) {
    const orgAuthenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const credentials = orgAuthenticateBodySchema.parse(req.body)
    const prismaPetsRepository = new PrismaOrgsRepository()
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(prismaPetsRepository)


    await authenticateOrgUseCase.execute(credentials)

    return reply.status(200).send()
}