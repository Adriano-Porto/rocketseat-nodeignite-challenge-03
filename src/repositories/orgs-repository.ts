import { ORG, Prisma } from "@prisma/client"

export interface OrgsRepository {
    create(data: Prisma.ORGCreateInput): Promise<ORG>
    findUniqueByEmail(email: string): Promise<ORG | null>
    findUniqueById(id: string): Promise<ORG | null>
}