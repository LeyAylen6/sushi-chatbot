const Product = require("../models/Product");

const getAll = () => {
    return Product.find();
};

const getById = (productId) => {
    return Product.findById(productId);
};

const save = (product) => {
    return product.save();
};

module.exports = { getAll, getById, save }