const AppError = require("./AppError");

class MissingFieldsError extends AppError {
    constructor(missingFields) {
        const fieldsList = missingFields.join(', ');
        const errorMessage = `The following required fields are missing: ${fieldsList}`;

        super({ error: 'Missing Fields Error', message: errorMessage, statusCode: 400 });
    }
}

module.exports = MissingFieldsError;