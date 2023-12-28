import { OrgsRepository } from "../repositories/orgs-repository"
import { hash } from "bcrypt"
import { ResourceAlreadyExists } from "./errors/resource-already-exists"

interface orgCreateInput {
    email: string
    cep: string
    address: string
    phone: string
    password: string
}

export class createOrgUsecase {
    constructor(private orgsRepository: OrgsRepository) {}
    
    async execute({
        email,
        cep,
        address,
        phone, 
        password
    }: orgCreateInput) {
        const password_hash = await hash(password, 6)

        const emailExists = await this.orgsRepository.findUniqueByEmail(email)

        if (emailExists) {
            throw new ResourceAlreadyExists("email existente no banco de dados")
        }

        const org = await this.orgsRepository.create({
            email,
            cep,
            address,
            phone, 
            password_hash
        })

        return org
    }
}