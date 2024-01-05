import { FastifyInstance } from "fastify"
import { registerPet } from "./register-pet"
import { ensureOrg } from "../../middlewares/ensure-org"
import { searchPets } from "./search-pets"
import { getPet } from "./get-pet"
import {  getInContact } from "./get-in-contact"

export async function PetRoutes(app: FastifyInstance) {
    app.post("/pet/register", {
        onRequest: ensureOrg
    }, registerPet)

    app.get("/pet/search/:city", searchPets)
    app.get("/pet/:id", getPet)
    app.get("/pet/:id/contact", getInContact)
}