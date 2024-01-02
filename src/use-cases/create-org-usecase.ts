import { OrgsRepository } from "../repositories/orgs-repository"
import { hash } from "bcrypt"
import { ResourceAlreadyExistsError } from "./errors/resource-already-exists"

interface orgCreateInput {
    name: string
    email: string
    cep: string
    address: string
    phone: string
    password: string
}

export class createOrgUsecase {
    constructor(private orgsRepository: OrgsRepository) {}
    
    async execute({
        name,
        email,
        cep,
        address,
        phone, 
        password
    }: orgCreateInput) {
        const password_hash = await hash(password, 6)

        const emailExists = await this.orgsRepository.findUniqueByEmail(email)

        if (emailExists) {
            throw new ResourceAlreadyExistsError()
        }

        const org = await this.orgsRepository.create({
            name,
            email,
            cep,
            address,
            phone, 
            password_hash
        })

        return { org }
    }
}