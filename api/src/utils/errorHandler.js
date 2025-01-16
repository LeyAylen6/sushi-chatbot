const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        error: err.error || err.name,
        statusCode: err?.statusCode || 500,
        message: err.message || 'Something went wrong.'
    };

    console.error(`Error: ${err.message}`);
    res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;