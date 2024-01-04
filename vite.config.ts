import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        environmentMatchGlobs: [
            ["src/controllers/**", "prisma-rocketseat-challenge"]
        ],
        dir: "src"
    }
})