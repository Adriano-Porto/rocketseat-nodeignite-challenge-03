import fastify from "fastify"
import { register } from "./controllers/pets/register"
import { errorHandler } from "./middlewares/ErrorHandler"

export const app = fastify()

app.setErrorHandler(errorHandler)

app.post("/pets", register)
