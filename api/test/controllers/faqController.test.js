const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../../src/controllers/faqController');

const { createFAQResponseMock, updateFaqResponseMock } = require('./../mocks')

const faqService = require('./../../src/services/faqService')

jest.mock('../../src/models/FAQ');

jest.mock('./../../src/services/faqService', () => ({
    getAll: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
}));

describe('FAQ Controller Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    })

    describe('GetFAQs', () => {
        it('getFAQs should return all FAQs', async () => {
            const mockFAQs = [
                { _id: '1', question: 'Question', answer: 'Answer' },
            ];
            faqService.getAll.mockResolvedValue(mockFAQs);

            await getFAQs(req, res, next);

            expect(faqService.getAll).toHaveBeenCalledTimes(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockFAQs);
            expect(next).not.toHaveBeenCalled();
        });

        it('should return a 500 error when the database query fails', async () => {
            faqService.getAll.mockRejectedValue(new Error('Database error'));

            await getFAQs(req, res, next);

            expect(next).toHaveBeenCalledWith(
                new Error("Database error")
            );
        });
    });

    describe('createFAQ', () => {
        it('should create a new FAQ successfully', async () => {
            const req = {
                body: {
                    question: 'What is your return policy?',
                    answer: 'You can return within 30 days.',
                },
            };

            faqService.save = jest.fn().mockResolvedValue(createFAQResponseMock);

            await createFAQ(req, res, next);

            expect(faqService.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
        });

        it('should return 400 if question or answer is missing', async () => {
            const req = { body: { question: 'Question', answer: undefined } };

            await createFAQ(req, res, next);

            expect(next).toHaveBeenCalledWith(
                new Error("The following required fields are missing: answer")
            );
        });

        it('should return a 500 error when the database query fails', async () => {
            const req = { body: { question: 'Question', answer: 'Answer' } };

            faqService.save = jest.fn().mockRejectedValue(new Error('Error creating FAQ.'));

            await createFAQ(req, res, next);

            expect(faqService.save).toHaveBeenCalled();
            expect(next).toHaveBeenCalledWith(
                new Error("Error creating FAQ.")
            );
        });
    });

    describe('updateFAQ', () => {
        it('should update an existing FAQ successfully', async () => {
            const req = {
                params: { id: '67868af317f07553d3670ce6' },
                body: {
                    question: 'Question',
                    answer: 'Answer'
                }
            };

            const updatedFAQ = {
                _id: req.params.id,
                question: req.body.question,
                answer: req.body.answer
            };

            faqService.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedFAQ);

            await updateFAQ(req, res, next);

            expect(faqService.findByIdAndUpdate).toHaveBeenCalledWith(
                req.params.id,
                { question: req.body.question, answer: req.body.answer }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(updatedFAQ);
        });

        it('should return a 404 error if the FAQ is not found', async () => {
            const req = {
                params: { id: '67868af317f07553d3670ce6' },
                body: {
                    question: 'Question',
                    answer: 'Answer'
                }
            };

            faqService.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

            await updateFAQ(req, res, next);

            expect(faqService.findByIdAndUpdate).toHaveBeenCalledWith(
                req.params.id,
                { question: req.body.question, answer: req.body.answer }
            );
            expect(next).toHaveBeenCalledWith(
                new Error('FAQ with identifier "67868af317f07553d3670ce6" was not found.')
            );
        });

        it('should return a 500 error if there is a server error', async () => {
            const req = {
                params: { id: '67868af317f07553d3670ce6' },
                body: {
                    question: 'Question',
                    answer: 'Answer'
                }
            };

            faqService.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Error updating FAQ'));

            await updateFAQ(req, res, next);

            expect(faqService.findByIdAndUpdate).toHaveBeenCalledWith(
                req.params.id, req.body
            );

            expect(next).toHaveBeenCalledWith(
                new Error("Error updating FAQ")
            );
        });
    });

    describe('deleteFAQ', () => {
        it('should delete a FAQ successfully', async () => {
            req = { params: { id: '67868af317f07553d3670ce6' } }
            const deletedFAQ = { _id: req.params.id, question: 'Question', answer: 'Answer' };

            faqService.findByIdAndDelete = jest.fn().mockResolvedValue(deletedFAQ);

            await deleteFAQ(req, res, next);

            expect(faqService.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(deletedFAQ);
        });

        it('should return a 404 error if FAQ is not found', async () => {
            req = { params: { id: '67868af317f07553d3670ce6' } }
            faqService.findByIdAndDelete = jest.fn().mockResolvedValue(null);

            await deleteFAQ(req, res, next);

            expect(faqService.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledWith(
                new Error('FAQ with identifier "67868af317f07553d3670ce6" was not found.')
            );
        });

        it('should return a 500 error if there is a server error', async () => {
            req = { params: { id: '67868af317f07553d3670ce6' } }
            faqService.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Error deleting FAQ.'));

            await deleteFAQ(req, res, next);

            expect(faqService.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
            expect(next).toHaveBeenCalledWith(
                new Error("Error deleting FAQ.")
            );
        });
    });

});