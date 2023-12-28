export class ResourceAlreadyExists extends Error {
    constructor(message: string){
        super(message)
    }
}