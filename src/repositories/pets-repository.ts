import { Pet } from "@prisma/client"

export interface PetCreateInput {
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

export interface searchPetsOptParams {
    name?: string
    age?: "PUPPY" | "ADULT" | "OLD"
    size?: "SMALL"| "MEDIUM" | "LARGE"
    energy_level?: "LOW" | "MEDIUM" | "HIGH"
    independence_level?:  "LOW" | "MEDIUM" | "HIGH"
    environment?: "OPEN" | "CLOSED" 
}

export interface PetsRepository {
    create(data: PetCreateInput): Promise<Pet>
    search(city: string, args: searchPetsOptParams): Promise<Pet[]>
}