const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conected to MongoDB database');

    } catch (error) {
        console.error('Error trying to connect MongoDB:', error);
        process.exit(1);
    }
};

module.exports = conectarDB;