import { beforeEach, describe, expect, it } from "vitest"
import { InMemoryOrgsRepository } from "../repositories/in-memory/in-memory-orgs-repository"
import { hash } from "bcrypt"
import { AuthenticateOrgUseCase } from "./authenticate-org"
import { InvalidCredentialsError } from "./errors/invalid-credentiais"

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe("Authenticate Org", () => {
    beforeEach(() => {
        orgsRepository = new InMemoryOrgsRepository()
        sut = new AuthenticateOrgUseCase(orgsRepository)
    })
    
    it("should be able to authenticate with correct credentials", async () => {
        const createdOrg = await orgsRepository.create({
            name: "testing",
            address: "na esquina",
            cep: "58193049",
            email: "pedro@teste.com",
            password_hash: await hash("123456", 6),
            phone: "55993818105"
        })

        const { org } = await sut.execute({
            email: "pedro@teste.com",
            password: "123456"
        })

        expect(org).toEqual(expect.objectContaining({
            id: createdOrg.id
        }))
    }) 
    
    it("should not be able to authenticate with invalid credentials", async () => {
        await orgsRepository.create({
            name: "testing",
            address: "na esquina",
            cep: "58193049",
            email: "pedro@teste.com",
            password_hash: await hash("123456", 6),
            phone: "55993818105"
        })

        const invalidEmail = sut.execute({
            email: "pedro@teste4.com",
            password: "123456"
        })

        
        const invalidPassword = sut.execute({
            email: "pedro@teste.com",
            password: "1234"
        })
        
        expect(invalidEmail).rejects.toBeInstanceOf(InvalidCredentialsError)
        expect(invalidPassword).rejects.toBeInstanceOf(InvalidCredentialsError)
        
    }) 
})