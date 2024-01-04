import { PetsRepository } from "../repositories/pets-repository"

interface RegisterPetsArgumentsInterface {
    name: string
    about: string
    age: "PUPPY" | "ADULT" | "OLD"
    size: "SMALL"| "MEDIUM" | "LARGE"
    energy_level: "LOW" | "MEDIUM" | "HIGH"
    independence_level:  "LOW" | "MEDIUM" | "HIGH"
    environment: "OPEN" | "CLOSED"
    photos: string[]
    adoption_requisites: string[]
    org_id: string
}

export class RegisterPetUseCase {
    constructor(
        private petsRepository: PetsRepository,
    ){}

    async execute({
        name,
        about,
        age,
        size,
        energy_level,
        independence_level,
        environment,
        photos,
        adoption_requisites,
        org_id
    }: RegisterPetsArgumentsInterface) {
        const pet = this.petsRepository.create({
            name,
            about,
            age,
            size,
            energy_level,
            independence_level,
            environment,
            photos,
            adoption_requisites,
            org_id
        }
        )

        return pet
    }
}