import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaOrgsRepository } from "../../repositories/prisma/prisma-orgs-repository"
import { AuthenticateOrgUseCase } from "../../use-cases/authenticate-org"
import { InvalidCredentialsError } from "../../use-cases/errors/invalid-credentiais"


export async function authenticateOrg(req: FastifyRequest, reply: FastifyReply) {
    const orgAuthenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string(),
    })

    const { password, email} = orgAuthenticateBodySchema.parse(req.body)
    const prismaPetsRepository = new PrismaOrgsRepository()
    const authenticateOrgUseCase = new AuthenticateOrgUseCase(prismaPetsRepository)


    try {
        const { org } = await authenticateOrgUseCase.execute({email, password})
        const sendProperties = {...org, password_hash: undefined}

        const token = await reply.jwtSign({}, {
            sign: {
                sub: org.id
            }
        })
        

        return reply
            .status(200).send({token, org: {sendProperties}})
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send()
        }
        return reply.status(500).send()
    }
}