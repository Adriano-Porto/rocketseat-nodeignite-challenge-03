import { PetsRepository } from "../repositories/pets-repository"
import { ResourceDoesNotExistsError } from "./errors/resource-does-not-exists"

export class GetPetUseCase {
    constructor(private petsRepository: PetsRepository){}

    async execute(id: string) {

        const pet = await this.petsRepository.findUniqueById(id)

        if (pet == null) throw new ResourceDoesNotExistsError()

        return { pet }
    }
}