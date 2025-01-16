const orderService = require('./../services/orderService')
const productService = require('./../services/productService')

const MissingFieldsError = require('../utils/MissingFieldsError');
const NotFoundError = require('../utils/NotFoundError');

const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAll();
        res.status(200).json(orders);

    } catch (error) {
        next(error);
    }
};

const createOrder = async (req, res, next) => {
    try {
        const { client, products } = req.body;
        let missingFields = [];

        if (!client) missingFields.push('client')
        if (!products || products.length === 0) missingFields.push('products')

        if (missingFields.length > 0) {
            throw new MissingFieldsError(missingFields)
        }

        const productPrices = await Promise.all(
            products.map(async (item) => {
                const product = await productService.getById(item.productId);
                if (!product) {
                    throw new NotFoundError({ resource: 'product', identifier: item.productId })
                }

                return product.price * item.quantity;
            })
        );

        const total = productPrices.reduce((sum, price) => sum + price, 0);
        const newOrder = new Order({
            client,
            products,
            total
        });

        await orderService.save(newOrder);

        res.status(201).json(newOrder);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllOrders,
    createOrder
};
