const Product = require('../models/Product');
const MissingFieldsError = require('../utils/MissingFieldsError');
const productService = require('./../services/productService')

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAll();
        res.status(200).json(products);

    } catch (error) {
        next(error);
    }
};

const createProduct = async (req, res, next) => {
    try {
        const { name, price } = req.body
        let missingFields = [];

        if (!name) missingFields.push('name')
        if (!price) missingFields.push('price')

        if (missingFields.length > 0) {
            throw new MissingFieldsError(missingFields);
        };

        const newProduct = new Product(req.body);
        await productService.save(newProduct)

        res.status(201).json(newProduct);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProducts,
    createProduct,
};