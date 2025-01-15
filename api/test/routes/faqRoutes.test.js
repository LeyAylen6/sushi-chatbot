const express = require('express');
const request = require('supertest');
const faqRoutes = require('../../src/routes/faqRoutes');
const faqController = require('../../src/controllers/faqController');
const { getAllFaqsResponseMock } = require('./../mocks')

const app = express();
app.use(express.json());
app.use('/api/faq', faqRoutes);

jest.mock('../../src/controllers/faqController');

describe('FAQ Routes', () => {
    it('should call getFAQs controller for GET /api/faq', async () => {
        const mockGetFAQs = faqController.getFAQs.mockImplementation(
            (req, res) => res.status(200).send(getAllFaqsResponseMock)
        );

        await request(app).get('/api/faq');

        expect(mockGetFAQs).toHaveBeenCalled();
    });

    it('should call createFAQ controller for POST /api/faq', async () => {
        const mockCreateFAQ = faqController.createFAQ.mockImplementation(
            (req, res) => res.status(201).send(createFAQResponse)
        );

        await request(app)
            .post('/api/faq')
            .send({ question: 'Sample question?', answer: 'Sample answer.' });

        expect(mockCreateFAQ).toHaveBeenCalled();
    });

    it('should call updateFAQ controller for PUT /api/faq/:id', async () => {
        const mockUpdateFAQ = faqController.updateFAQ.mockImplementation(
            (req, res) => res.status(200).send()
        );

        await request(app)
            .put('/api/faq/123')
            .send({ question: 'Updated question?', answer: 'Updated answer.' });

        expect(mockUpdateFAQ).toHaveBeenCalled();
    });

    it('should call deleteFAQ controller for DELETE /api/faq/:id', async () => {
        const mockDeleteFAQ = faqController.deleteFAQ.mockImplementation(
            (req, res) => res.status(200).send()
        );

        await request(app).delete('/api/faq/123');

        expect(mockDeleteFAQ).toHaveBeenCalled();
    });
});
