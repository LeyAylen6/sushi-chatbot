const { default: mongoose } = require('mongoose');
const FAQ = require('../models/FAQ');
const InvalidObjectIdError = require('../utils/InvalidObjectIdError');
const MissingFieldsError = require('../utils/MissingFieldsError');
const NotFoundError = require('../utils/notFoundError');
const faqService = require('./../services/faqService')

const getFAQs = async (req, res, next) => {
    try {
        const faqs = await faqService.getAll();
        res.status(200).json(faqs);
    } catch (error) {
        next(error);
    }
};

const createFAQ = async (req, res, next) => {
    try {
        const { question, answer } = req.body;
        let missingFields = []

        if (!question) missingFields.push('question');
        if (!answer) missingFields.push('answer');

        if (missingFields.length > 0) {
            throw new MissingFieldsError(missingFields);
        }

        const newFAQ = new FAQ({ question, answer });
        await faqService.save(newFAQ);

        res.status(201).json(newFAQ);
    } catch (error) {
        next(error);
    }
};

const updateFAQ = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new InvalidObjectIdError(id);
        }

        const updatedFAQ = await faqService.findByIdAndUpdate(id, { question, answer })

        if (!updatedFAQ) {
            throw new NotFoundError({ resource: 'FAQ', identifier: id })
        }

        res.status(200).json(updatedFAQ);

    } catch (error) {
        next(error);
    }
};

const deleteFAQ = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new InvalidObjectIdError(id);
        }

        const deletedFAQ = await faqService.findByIdAndDelete(id);

        if (!deletedFAQ) {
            throw new NotFoundError({ resource: 'FAQ', identifier: id })
        }

        res.status(200).json(deletedFAQ);

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ
};