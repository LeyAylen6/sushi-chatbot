const AppError = require('./AppError');

class InvalidObjectIdError extends AppError {
    constructor(identifier) {
        const errorMessage = `Invalid ID format: ${identifier}`;
        super({ error: 'Invalid ObjectId', message: errorMessage, statusCode: 400 });
    }
}

module.exports = InvalidObjectIdError;