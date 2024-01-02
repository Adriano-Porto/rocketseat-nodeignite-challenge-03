import { PetsRepository } from "../repositories/pets-repository"

export class GetPetUseCase {
    constructor(private petsRepository: PetsRepository){}

    async execute(id: string) {

        const pet = await this.petsRepository.findUniqueById(id)

        return pet
    }
}