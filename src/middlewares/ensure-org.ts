import { FastifyReply, FastifyRequest } from "fastify"

export async function ensureOrg(req: FastifyRequest, reply: FastifyReply) {
    try {
        await req.jwtVerify()
    } catch (err) {
        return reply.status(401).send({message: "Unathorized"})
    }
}