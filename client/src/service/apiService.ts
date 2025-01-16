import axios from "axios";

interface Product {
    name: string
    description: string
    price: number
    available: boolean
}

interface Faq {
    question: string
    answer: string
}


const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const talkToTheChat = async (userMessage: string) => {
    try {
        const response = await api.post("/chat", { message: userMessage });
        return response.data.response

    } catch (error) {
        console.error("Error fetching chat response:", error);
    }
};

export const getAllOrders = async () => {
    try {
        const response = await api.get("/order");
        return response.data

    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};

export const getAllProducts = async () => {
    try {
        const response = await api.get("/product");
        return response.data

    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

export const getAllFaqs = async () => {
    try {
        const response = await api.get("/faq");
        return response.data

    } catch (error) {
        console.error("Error fetching FAQs:", error);
    }
};

export const createFaq = async (faq: Faq) => {
    try {
        const response = await api.post("/faq", faq);
        return response.data

    } catch (error) {
        console.error("Error creating FAQ:", error);
    }
};

export const createProduct = async (product: Product) => {
    try {
        const response = await api.post("/product", product);
        return response.data

    } catch (error) {
        console.error("Error creating product:", error);
    }
};