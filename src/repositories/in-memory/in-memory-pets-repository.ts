import { ORG, Pet } from "@prisma/client"
import { PetCreateInput, PetsRepository, searchPetsOptParams } from "../pets-repository"
import { randomUUID } from "crypto"
import { OrgsRepository } from "../orgs-repository"
import { ResourceDoesNotExists } from "../../use-cases/errors/resource-does-not-exists"

interface inMemoryPets extends Pet{
    org: ORG
}



export class InMemoryPetsRepository implements PetsRepository {
    public items: inMemoryPets[] = []

    constructor(private orgsRepository: OrgsRepository){}

    async create(data: PetCreateInput) {
        
        const org = await this.orgsRepository.findUniqueById(data.org_id)
        if (!org) throw new ResourceDoesNotExists()


        const pet = {
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
            org
        }

        this.items.push(pet)

        return pet
    }

    async search(city: string, args: searchPetsOptParams) {
        const pets = await this.items.filter(pet => {
            
            if (pet.org.address !== city) return false // Not proud, but using Object.entries has even worse readability and might cause problems
            // Any Ideas? Reach Out
            if (args.name !== undefined && ! pet.name.includes(args.name)) return false

            if (args.energy_level !== undefined && pet.energy_level !== args.energy_level) return false

            if (args.age !== undefined && pet.age !== args.age) return false

            if (args.environment !== undefined && pet.environment !== args.environment) return false

            if (args.independence_level !== undefined && pet.independence_level !== args.independence_level) return false

            if (args.size !== undefined && pet.size !== args.size) return false

            return true
        })
        

    

        return pets
    }
}