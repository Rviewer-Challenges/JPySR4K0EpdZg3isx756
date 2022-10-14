class NotFoundInBDError extends Error {
    constructor(searchParam) {
        super();
        this.name = "NotFoundInBD",
        this.message = `No se ha localizado ${searchParam} en la base de datos`,
        this.code = 400
    }
}


module.exports = {
    NotFoundInBDError: NotFoundInBDError
}