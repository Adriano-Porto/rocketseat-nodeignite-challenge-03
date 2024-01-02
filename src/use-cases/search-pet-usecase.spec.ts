import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryPetsRepository } from "../repositories/in-memory/in-memory-pets-repository"
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository"
import { hash } from "bcrypt"
import { SearchPetsUseCase } from "./search-pet-usecase"

let petsRepository: InMemoryPetsRepository
let  sut: SearchPetsUseCase
let orgsRepository: InMemoryOrgsRepository
describe("List Pet", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        petsRepository = new InMemoryPetsRepository(orgsRepository)
        sut = new SearchPetsUseCase(petsRepository)
    })
    

    
    it("should be able to list pets in the same city", async () => {
        const { id } =  await orgsRepository.create({
            name: "test",
            password_hash: await hash("123456", 6),
            phone: "782817209",
            address: "campina_grande",
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
            org_id: id,
            photos: [],
            size: "MEDIUM"
        })

        const cgSearch = await sut.execute("campina_grande")
        const jpSearch = await sut.execute("joao_pessoa")


        expect(cgSearch.pets).toHaveLength(1)
        expect(jpSearch.pets).toHaveLength(0)

    })
})