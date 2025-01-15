const FAQ = require("../models/FAQ");

const getAll = () => {
    return FAQ.find();
};

const save = (faq) => {
    return faq.save();
};

const findByIdAndUpdate = (id, faq) => {
    return FAQ.findByIdAndUpdate(id, faq, { new: true, runValidators: true });
};

const findByIdAndDelete = (id, faq) => {
    return FAQ.findByIdAndDelete(id)
};

module.exports = { getAll, save, findByIdAndUpdate, findByIdAndDelete }