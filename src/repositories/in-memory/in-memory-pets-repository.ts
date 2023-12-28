import { Pet } from "@prisma/client"
import { PetCreateInput, PetsRepository } from "../pets-repository"
import { randomUUID } from "crypto"



export class InMemoryPetsRepository implements PetsRepository {
    public items: Pet[] = []

    async create(data: PetCreateInput) {
        const pet: Pet = {
            id: randomUUID(),
            org_id: data.org_id,
            about: data.about,
            age: data.age,
            energy_level: data.energy_level,
            environment: data.environment,
            independence_level: data.independence_level,
            name: data.name,
            size: data.size,
            photos: data.photos,
            adoption_requisites: data.adoption_requisites,
        }

        this.items.push(pet)

        return pet
    }
}