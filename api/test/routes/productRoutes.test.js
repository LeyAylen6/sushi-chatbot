const express = require('express');
const request = require('supertest');
const productController = require('../../src/controllers/productController');
const productRoutes = require('../../src/routes/productRoutes');
const { getAllProductsResponseMock, createProductResponseMock } = require('../mocks');

const app = express();
app.use(express.json());
app.use('/api/product', productRoutes);

jest.mock('../../src/controllers/productController');

describe('Order Routes', () => {
    it('should call getAllOrders controller for GET /api/product', async () => {
        const mockGetAllProducts = productController.getAllProducts.mockImplementation(
            (req, res) => res.status(200).send(getAllProductsResponseMock)
        );

        await request(app).get('/api/product');

        expect(mockGetAllProducts).toHaveBeenCalled();
    });

    it('should call createOrder controller for POST /api/product', async () => {
        const mockCreateProduct = productController.createProduct.mockImplementation(
            (req, res) => res.status(200).send(createProductResponseMock)
        );

        await request(app).post('/api/product');

        expect(mockCreateProduct).toHaveBeenCalled();
    });
});