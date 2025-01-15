const express = require('express');
const request = require('supertest');
const orderRoutes = require('../../src/routes/orderRoutes');
const orderController = require('../../src/controllers/orderController');
const { getAllOrdersResponseMock, createOrderResponseMock } = require('../mocks');

const app = express();
app.use(express.json());
app.use('/api/order', orderRoutes);

jest.mock('../../src/controllers/orderController');

describe('Order Routes', () => {
    it('should call getAllOrders controller for GET /api/order', async () => {
        const mockGetAllOrders = orderController.getAllOrders.mockImplementation(
            (req, res) => res.status(200).send(getAllOrdersResponseMock)
        );

        await request(app).get('/api/order');

        expect(mockGetAllOrders).toHaveBeenCalled();
    });

    it('should call createOrder controller for POST /api/order', async () => {
        const mockCreateOrder = orderController.createOrder.mockImplementation(
            (req, res) => res.status(200).send(createOrderResponseMock)
        );

        await request(app).post('/api/order');

        expect(mockCreateOrder).toHaveBeenCalled();
    });
});