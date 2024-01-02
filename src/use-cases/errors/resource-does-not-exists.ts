export class ResourceDoesNotExistsError extends Error {
    constructor() {
        super("Resource Does not Exists")
    }
}