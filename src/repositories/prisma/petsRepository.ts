import { Pet, Prisma } from "@prisma/client"
import { PetsRepository } from "../pets-repository"
import { prisma } from "../../lib/prisma-client"

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) :Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }
}