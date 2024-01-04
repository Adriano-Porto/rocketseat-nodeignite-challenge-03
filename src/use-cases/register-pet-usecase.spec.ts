import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository"
import { RegisterPetUseCase } from "./register-pet-usecase"
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository"
import { hash } from "bcrypt"
import { randomUUID } from "node:crypto"
import { ResourceDoesNotExistsError } from "./errors/resource-does-not-exists"

let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase
let orgsRepository: InMemoryOrgsRepository
describe("Register Pet", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new RegisterPetUseCase(petsRepository)
    })
    

    
    it("should be able to register pet", async () => {
        const org =  await orgsRepository.create({
            name: "test",
            password_hash: await hash("123456", 6),
            phone: "782817209",
            address: "rua 5",
            cep: "82408", 
            email: "test@teste.com"
        })

        const pet = await sut.execute({
            name: "seth",
            about: "um belo gato",
            adoption_requisites: [],
            age: "ADULT",
            energy_level: "LOW",
            environment: "OPEN",
            independence_level: "HIGH",
            org_id: org.id,
            photos: [],
            size: "MEDIUM"
        })

        expect(pet.id).toEqual(expect.any(String))
    })
    
    it("should not be able to register pet with an non existent org", async () => {

        const invalidRegister = sut.execute({
            name: "seth",
            about: "um belo gato",
            adoption_requisites: [],
            age: "ADULT",
            energy_level: "LOW",
            environment: "OPEN",
            independence_level: "HIGH",
            org_id: randomUUID(),
            photos: [],
            size: "MEDIUM"
        })

        expect(invalidRegister).rejects.toBeInstanceOf(ResourceDoesNotExistsError)
    }) 
})