const errorHandler = (err, req, res, next) => {
    const errorResponse = {
        error: err.error || err.name,
        message: err.message || 'Something went wrong.'
    };

    console.error(`Error: ${err.message}`);
    res.status(err.statusCode).json(errorResponse);
};

module.exports = errorHandler;