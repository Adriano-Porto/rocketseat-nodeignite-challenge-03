import { Prisma } from "@prisma/client"
import { OrgsRepository } from "../orgs-repository"
import { prisma } from "../../lib/prisma-client"

export class orgsRepository implements OrgsRepository {
    async create(data: Prisma.ORGCreateInput) {
        const org = await prisma.oRG.create({
            data
        })

        return org
    }

    async findUniqueByEmail(email: string) {
        const org = await prisma.oRG.findUnique({
            where: {
                email
            }
        })

        if (!org) return null
        return org
    }
}