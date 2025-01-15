const Order = require("../models/Order");

const getAll = () => {
    return Order.find();
};

const getById = (id) => {
    return Order.findById(id);
};

const save = (order) => {
    return order.save();
};

const addProducts = (id, products) => {
    const orderFound = getById(id)
    const orderUpdated = updateOrder(orderFound, products)

    return Order.findByIdAndUpdate(id, orderUpdated, { new: true, runValidators: true });
};

const updateOrder = (oldOrder, newProducts) => {
    newProducts.forEach(newProduct => {
        const existingProductIndex = oldOrder.products.findIndex(
            product => product.productId === newProduct.productId
        );

        if (existingProductIndex !== -1) {
            oldOrder.products[existingProductIndex].quantity += newProduct.quantity;

        } else {
            oldOrder.products.push(newProduct);
        }

        oldOrder.total = newProduct.price;
    });

    return oldOrder;
};

module.exports = { getAll, getById, save, addProducts }