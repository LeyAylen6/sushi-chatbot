const getAllOrdersResponseMock = [{
    "_id": "678689e4be3bebaaa2bb1e48",
    "client": "Leila Salguero",
    "products": [
        {
            "productId": "6786886a46fbc8a4722a892e",
            "quantity": 2,
            "_id": "678689e4be3bebaaa2bb1e49"
        },
        {
            "productId": "6786888346fbc8a4722a8930",
            "quantity": 1,
            "_id": "678689e4be3bebaaa2bb1e4a"
        }
    ],
    "total": 35,
    "state": "pending",
    "createAt": "2025-01-14T15:59:32.725Z",
    "__v": 0
}];

const createOrderResponseMock = {
    "client": "Leila Salguero",
    "products": [
        {
            "productId": "6786886a46fbc8a4722a892e",
            "quantity": 2,
            "_id": "6786b35a8a3bbe18efa3ae68"
        },
        {
            "productId": "6786888346fbc8a4722a8930",
            "quantity": 1,
            "_id": "6786b35a8a3bbe18efa3ae69"
        }
    ],
    "total": 35,
    "state": "pending",
    "_id": "6786b35a8a3bbe18efa3ae67",
    "createAt": "2025-01-14T18:56:26.954Z",
    "__v": 0
};


const getAllProductsResponseMock = [
    {
        "_id": "6786886a46fbc8a4722a892e",
        "name": "Sushi Roll",
        "description": "Delicious sushi roll with salmon, avocado, and cucumber.",
        "price": 10,
        "available": true,
        "__v": 0
    },
    {
        "_id": "6786888346fbc8a4722a8930",
        "name": "Tuna Sashimi",
        "description": "Fresh slices of tuna served with wasabi and soy sauce.",
        "price": 15,
        "available": true,
        "__v": 0
    }
];

const createProductResponseMock = {
    "name": "Tuna Sashimi",
    "description": "Fresh slices of tuna served with wasabi and soy sauce.",
    "price": 15,
    "available": true,
    "_id": "6786b16617f07553d3670cf7",
    "__v": 0
}

const getAllFaqsResponseMock = [
    {
        "_id": "67868af317f07553d3670ce6",
        "question": "What are your opening hours?",
        "answer": "We are open every day from 12:00 PM to 11:00 PM.",
        "__v": 0
    }
]

const createFAQResponseMock = [
    {
        "_id": "67868af317f07553d3670ce6",
        "question": "What are your opening hours?",
        "answer": "We are open every day from 12:00 PM to 11:00 PM.",
        "__v": 0
    }
]

const updateFaqResponseMock = {
    "_id": "67868af317f07553d3670ce6",
    "question": "What are your opening hours?",
    "answer": "We are open every day from 12:00 PM to 11:00 PM.",
    "__v": 0
}

module.exports = {
    getAllOrdersResponseMock,
    createOrderResponseMock,

    getAllProductsResponseMock,
    createProductResponseMock,

    getAllFaqsResponseMock,
    createFAQResponseMock,
    updateFaqResponseMock
}
