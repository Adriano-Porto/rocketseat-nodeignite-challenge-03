import { FastifyInstance } from "fastify"
import { registerPet } from "./register-pet"
import { ensureOrg } from "../../middlewares/ensure-org"

export async function PetRoutes(app: FastifyInstance) {
    app.post("/pet/register", {
        onRequest: ensureOrg
    }, registerPet)
}