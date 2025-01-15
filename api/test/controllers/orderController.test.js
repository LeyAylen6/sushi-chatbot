const { getAllOrders, createOrder } = require("../../src/controllers/orderController");

const orderService = require('./../../src/services/orderService')
const productService = require('./../../src/services/productService')

const { getAllOrdersResponseMock } = require("../mocks");

jest.mock('../../src/models/Order');
jest.mock('./../../src/services/orderService', () => ({
    getAll: jest.fn(),
    save: jest.fn(),
}));

jest.mock('./../../src/services/productService', () => ({
    getById: jest.fn(),
}));

describe('Order Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        req = {
            body: {
                client: "Leila Salguero",
                products: [{ productId: "6786886a46fbc8a4722a892e", quantity: 2 }],
                total: 30.00,
                state: "pending"
            }
        }

        next = jest.fn();
    })

    describe('GetAllOrders', () => {
        it('getAllOrders should return all Orders', async () => {
            orderService.getAll.mockResolvedValue(getAllOrdersResponseMock);

            await getAllOrders(req, res, next);

            expect(orderService.getAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(getAllOrdersResponseMock);
        });

        it('should return a 500 error when the database query fails', async () => {
            orderService.getAll.mockRejectedValue(new Error("Error retrieving orders."));

            await getAllOrders(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error("Error retrieving orders."));
        });
    });

    describe('Create new Order', () => {
        it('should create a new Order successfully', async () => {
            productService.getById.mockResolvedValueOnce({ price: 15 });

            await createOrder(req, res, next);

            expect(productService.getById).toHaveBeenCalledTimes(req.body.products.length);
        });

        it('should return 400 if name and price is missing', async () => {
            req.body = { products: [] };

            await createOrder(req, res, next);

            expect(next).toHaveBeenCalledWith(
                new Error("The following required fields are missing: client, products")
            );
        });

        it('should return a 500 error when the database query fails', async () => {
            productService.getById = jest.fn().mockRejectedValue(
                new Error('Error trying to process the order')
            );
            orderService.save = jest.fn();

            await createOrder(req, res, next);

            expect(productService.getById).toHaveBeenCalledTimes(req.body.products.length);
            expect(orderService.save).not.toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                new Error("Error trying to process the order")
            );
        });
    });
});
