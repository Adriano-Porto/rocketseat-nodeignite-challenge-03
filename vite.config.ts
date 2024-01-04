import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        environmentMatchGlobs: [
            ["src/controller/**", "prisma-rocketseat-challenge"]
        ],
        dir: "src"
    }
})