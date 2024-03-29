import { beforeEach, describe, expect, it } from "vitest"
import { CreateOrgUsecase } from "./create-org-usecase"
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository"
import { compare } from "bcrypt"
import { ResourceAlreadyExistsError } from "./errors/resource-already-exists"

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUsecase

describe("Register Pet", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new CreateOrgUsecase(orgsRepository)
    })
    
    it("should be able to hash password", async () => {
        const { org } = await sut.execute({
            name: "testing",
            address: "na esquina",
            cep: "58193049",
            email: "pedro@teste.com",
            password: "123456",
            phone: "55993818105"
        })

        const isHashed = await compare("123456", org.password_hash)

        expect(isHashed).toBe(true)
    }) 
    
    it("should be able to register ORG", async () => {
        const { org } = await sut.execute({
            name: "testing",
            address: "na esquina",
            cep: "58193049",
            email: "pedro@teste.com",
            password: "123456",
            phone: "55993818105"
        })

        expect(org.id).toEqual(expect.any(String))
    }) 

    it("should not be able to register ORGs with same email", async () => {
        const email = "pedro@teste.com"

        await sut.execute({
            name: "testing",
            address: "na esquina",
            cep: "58193049",
            email,
            password: "123456",
            phone: "55993818105"
        })

        await expect(() => sut.execute({
            name: "testing",
            address: "na esquina",
            cep: "58193049",
            email,
            password: "123456",
            phone: "55993818105"
        })).rejects.toBeInstanceOf(ResourceAlreadyExistsError)

        // await expect(() => sut.execute({
            
        // })).rejects.toBeInstanceOf(ResourceAlreadyExistsError)
    }) 
})