class AppError extends Error {
    constructor({ error, message, statusCode }) {
        super(message);
        this.error = error;
        this.statusCode = statusCode;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;