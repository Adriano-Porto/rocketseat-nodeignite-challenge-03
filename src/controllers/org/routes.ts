import { FastifyInstance } from "fastify"
import { authenticateOrg } from "./authenticate-org"
import { registerOrg } from "./register-org"

export async function OrgRoutes(app: FastifyInstance) {
    app.post("/org/login", authenticateOrg)
    app.post("/org/register", registerOrg)
}