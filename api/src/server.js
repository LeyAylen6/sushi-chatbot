require('dotenv').config();
const app = require('./app');
const conectarDB = require('./configs/database');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
});

conectarDB();