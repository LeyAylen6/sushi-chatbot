const axios = require('axios');

const key = process.env.COHERE_AI_API_KEY
const url = process.env.COHERE_AI_API_URL

const queryCohereAI = async (prompt) => {
    const headers = {
        Authorization: `Bearer ${key}`
    };

    const body = {
        model: "command-xlarge-nightly",
        prompt,
        max_tokens: 150,
        temperature: 0.5,
        top_p: 1
    }

    try {
        const { data } = await axios.post(url, body, { headers });
        return data;

    } catch (error) {
        console.error("Error querying Hugging Face:", error.message);
        throw new Error("Failed to query Hugging Face API.");
    }
};

module.exports = { queryCohereAI };