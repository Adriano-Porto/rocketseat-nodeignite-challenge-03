import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository"
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository"
import { hash } from "bcrypt"
import { GetPetUseCase } from "./get-pet"
import { randomUUID } from "crypto"

let petsRepository: InMemoryPetsRepository
let sut: GetPetUseCase
let orgsRepository: InMemoryOrgsRepository
describe("Get Pet", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new GetPetUseCase(petsRepository)
    })
    
    it("should be able to get pet from correct id", async () => {
        const org =  await orgsRepository.create({
            name: "test",
            password_hash: await hash("123456", 6),
            phone: "782817209",
            address: "rua 5",
            cep: "82408", 
            email: "test@teste.com"
        })

        

        const createdPet = await petsRepository.create({
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

        const pet = await sut.execute(createdPet.id)

        expect(pet).toEqual(expect.objectContaining({
            id: createdPet.id
        }))
    })

    it("should not be able to get pet from incorrect id", async () => {
        const org =  await orgsRepository.create({
            name: "test",
            password_hash: await hash("123456", 6),
            phone: "782817209",
            address: "rua 5",
            cep: "82408", 
            email: "test@teste.com"
        })

        await petsRepository.create({
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

        const pet = await sut.execute(randomUUID())

        expect(pet).toEqual(null)
    })
})