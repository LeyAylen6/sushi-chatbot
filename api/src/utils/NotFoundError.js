const AppError = require("./AppError");

class NotFoundError extends AppError {
    constructor({ resource = 'Resource', identifier }) {
        const errorMessage = identifier
            ? `${resource} with identifier "${identifier}" was not found.`
            : `${resource} was not found.`;

        super({ error: 'Not Found Error', message: errorMessage, statusCode: 404 });
    }
}

module.exports = NotFoundError;