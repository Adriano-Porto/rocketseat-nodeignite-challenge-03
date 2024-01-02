import { OrgsRepository } from "../repositories/orgs-repository"
import { compare } from "bcrypt"
import { InvalidCredentialsError } from "./errors/invalid-credentiais"

interface OrgLoginInput {
    email: string,
    password: string
}

export class AuthenticateOrgUseCase {
    constructor(private orgsRepository: OrgsRepository) {}
    
    async execute({
        email,
        password
    }: OrgLoginInput) {
        

        const org = await this.orgsRepository.findUniqueByEmail(email)

        if (!org) throw new InvalidCredentialsError()

        if (!await compare(password, org.password_hash)) throw new InvalidCredentialsError()

        return { org }
    }
}