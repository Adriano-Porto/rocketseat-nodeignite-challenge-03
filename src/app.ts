import fastify from "fastify"
import { errorHandler } from "./middlewares/ErrorHandler"
import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import { env } from "./env"
import { OrgRoutes } from "./controllers/org/routes"
import { PetRoutes } from "./controllers/pets/routes"

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})
app.register(fastifyCookie)
app.setErrorHandler(errorHandler)

app.register(OrgRoutes)
app.register(PetRoutes)
