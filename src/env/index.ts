import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.coerce.number(),
    JWT_SECRET: z.string(),
    DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env)
if (!_env.success) {
    throw new Error("Invalid Environment Variables" + _env.error.format())
}

export const env = _env.data