import { ORG, Prisma } from "@prisma/client"
import { OrgsRepository } from "../orgs-repository"
import { randomUUID } from "node:crypto"

export class InMemoryOrgsRepository implements OrgsRepository {

    public items: ORG[] = [] 

    async create({
        address,
        cep,
        email,
        password_hash,
        phone,
    }: Prisma.ORGCreateInput) {
        const org = {
            id: randomUUID(),
            address,
            cep,
            email,
            password_hash,
            phone,
        }

        this.items.push(org)

        return org
    }

    async findUniqueByEmail(email: string) {
        const org = this.items.find(item => item.email === email)
        
        if (!org) return null
        
        return org
    }
}