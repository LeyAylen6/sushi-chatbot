const { getAllProducts, createProduct } = require("../../src/controllers/productController");
const Product = require("../../src/models/Product");
const { getAllProductsResponseMock, createProductResponseMock } = require("../mocks");

jest.mock('../../src/models/Product');

describe('Product Controller Tests', () => {
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
                name: "Tuna Sashimi",
                description: "Fresh slices of tuna served with wasabi and soy sauce.",
                price: 15.00,
                available: true
            }
        }

        next = jest.fn();
    })

    describe('GetAllProducts', () => {
        it('GetAllProducts should return all Products', async () => {
            Product.find.mockResolvedValue(getAllProductsResponseMock);

            await getAllProducts(req, res, next);

            expect(Product.find).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(getAllProductsResponseMock);
        });

        it('should return a 500 error when the database query fails', async () => {
            Product.find.mockRejectedValue(new Error("Error trying to get products"));

            await getAllProducts(req, res, next);

            expect(next).toHaveBeenCalledWith(
                new Error("Error trying to get products")
            );
        });
    });

    describe('createProduct', () => {
        it('should create a new Product successfully', async () => {
            Product.prototype.save = jest.fn().mockResolvedValue(createProductResponseMock);

            await createProduct(req, res, next);

            expect(Product.prototype.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            // expect(res.json).toHaveBeenCalledWith(createProductResponseMock);
        });

        it('should return 400 if name and price is missing', async () => {
            req.body = {
                name: "",
                price: "",
            }

            await createProduct(req, res, next);

            expect(next).toHaveBeenCalledWith(
                new Error("The following required fields are missing: name, price")
            );
        });

        it('should return a 500 error when the database query fails', async () => {
            Product.prototype.save = jest.fn().mockRejectedValue(
                new Error('Error creating Product')
            );

            await createProduct(req, res, next);

            expect(Product.prototype.save).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                new Error("Error creating Product")
            );
        });
    });
});
