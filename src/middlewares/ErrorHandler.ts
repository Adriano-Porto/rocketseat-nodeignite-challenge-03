import { FastifyReply, FastifyRequest } from "fastify"
import { ZodError } from "zod"

export function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
    if (error instanceof ZodError) {
        return reply.status(400).send({message: "Validation Error", issues: error})
    }

    console.log(error)

    return reply.status(500).send({message: "Internal Server Error"})
}