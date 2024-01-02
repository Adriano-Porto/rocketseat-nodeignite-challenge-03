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
    
    it("should be able to list pets in the same city and not in different cities", async () => {
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

    it("should be able to get pets by params", async () => {
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

        await petsRepository.create({
            name: "oito",
            about: "um outro gato",
            adoption_requisites: [],
            age: "OLD",
            energy_level: "HIGH",
            environment: "CLOSED",
            independence_level: "MEDIUM",
            org_id: id,
            photos: [],
            size: "LARGE"
        })

        const adultSearch = await sut.execute("campina_grande", { age: "ADULT" })
        const oldSearch = await sut.execute("campina_grande", { age: "OLD" })
        const energySearch = await sut.execute("campina_grande", { energy_level: "MEDIUM"})
        const environmentSearch = await sut.execute("campina_grande", { environment: "CLOSED"})
        const independenceSearch = await sut.execute("campina_grande", { independence_level: "MEDIUM"})
        const sizeSearch = await sut.execute("campina_grande", { size: "LARGE"})


        expect(adultSearch.pets).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: "seth"
            })
        ]))

        expect(oldSearch.pets).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: "oito"
            })
        ]))

        expect(energySearch.pets).toHaveLength(0)
        expect(environmentSearch.pets).toHaveLength(1)
        expect(independenceSearch.pets).toHaveLength(1)
        expect(sizeSearch.pets).toHaveLength(1)

    })

    it("should be able to get pets by name", async () => {
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

        await petsRepository.create({
            name: "oito",
            about: "um outro gato",
            adoption_requisites: [],
            age: "OLD",
            energy_level: "HIGH",
            environment: "CLOSED",
            independence_level: "MEDIUM",
            org_id: id,
            photos: [],
            size: "LARGE"
        })

        const sethSearch = await sut.execute("campina_grande", { name: "se" })
        const oitoSearch = await sut.execute("campina_grande", { name: "oi" })


        expect(sethSearch.pets).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: "seth"
            })
        ]))

        expect(oitoSearch.pets).toEqual(expect.arrayContaining([
            expect.objectContaining({
                name: "oito"
            })
        ]))

    })
})