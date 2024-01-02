import { PetsRepository } from "../repositories/pets-repository"

interface SearchPetsArgumentsInterface {
    name?: string
    age?: "PUPPY" | "ADULT" | "OLD"
    size?: "SMALL"| "MEDIUM" | "LARGE"
    energy_level?: "LOW" | "MEDIUM" | "HIGH"
    independence_level?:  "LOW" | "MEDIUM" | "HIGH"
    environment?: "OPEN" | "CLOSED"
}

export class SearchPetsUseCase {
    constructor(
        private petsRepository: PetsRepository
    ){}

    async execute(
        city: string, 
        {
            name,
            age,
            size,
            energy_level,
            independence_level,
            environment,
        }: SearchPetsArgumentsInterface = {}) {
        const pets = await this.petsRepository.search(
            city, {
                name,
                age,
                size,
                energy_level,
                independence_level,
                environment,
            }
        )

        return {
            pets
        }
    }
}