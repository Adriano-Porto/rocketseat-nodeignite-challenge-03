import { Pet, Prisma } from "@prisma/client"
import { PetsRepository, searchPetsOptParams } from "../pets-repository"
import { prisma } from "../../lib/prisma-client"

export class PrismaPetsRepository implements PetsRepository {
    async create(data: Prisma.PetUncheckedCreateInput) :Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }
    

    async search(city: string, args: searchPetsOptParams): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                ...args,
                org: {
                    address: city
                }
            },
            
        })    

        return pets
    }

    async findUniqueById(id: string) {
        const pet = await prisma.pet.findUnique({
            where: {
                id
            }, include: {
                org: true
            }
        })

        return pet
    }
}