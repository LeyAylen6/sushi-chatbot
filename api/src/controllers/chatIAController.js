const { queryCohereAI } = require('../services/queryCohereAI');
const faqService = require('./../services/faqService')
const productService = require('./../services/productService')
const Order = require('../models/Order');

const MissingFieldsError = require('../utils/MissingFieldsError');

const chat = async (req, res, next) => {
    const { message } = req.body;

    if (!message) {
        throw new MissingFieldsError(['message'])
    }

    const faqs = await faqService.getAll()
    const products = await productService.getAll()

    const productsString = JSON.stringify(products)
    const faqsString = JSON.stringify(faqs)

    console.log(productsString)

    const prompt = `Eres un asistente amable de un restaurante de sushi. Responde siguiendo estas reglas:
        - Si pide el menú, usa esta información: ${productsString} y devuelve el nombre y precio del producto.
        - Si quiere hacer un pedido y no envia productos, envíale el menú nuevamente y pídele que indique qué desea y que te de su nombre para el pedido.
        - Si menciona productos y confirma el pedido pero no indico su nombre, indicale que tiene que enviar su nombre junto con el pedido para poder hacer la compra.
        - Si menciona productos, confirma el pedido y avísale que puede retirarlo.
        - Si pide productos fuera del menú, di que no existen y muestra el menú.
        - Para preguntas frecuentes (horarios, disponibilidad), usa estas respuestas: ${faqsString}.
        - Si no entiendes, responde: "No entiendo tu solicitud. ¿Podrías reformularla?"
        - Si te saluda, da una bienvenida amistosa y habla del local.
        - No repitas la pregunta del usuario.
        - No hagas preguntas que se respondan con SI o NO.
        - Responde en JSON con los campos \`response\`, \`_id\`, \`price\`, \`client\`, y \`products\`:
        {
            response: "respuesta IA",
            "_id": order_id,
            client: "",
            products: [{
            "productId": "product_id",
            "quantity": 2,
            "price": 15
            }]
        }
        - Si te pide agregar mas productos a su pedido, el nombre no hace falta, debes solicitar el numero de pedido y agrega los nuevos productos en el campo products, cuando lo agregues agradecele por su compra.
        - Si te pide agregar más productos a su pedido, el nombre no hace falta, debes ver si te envio el número de pedido, junto con los pedidos que quiere agregar y sino solicitar que te envie ambos juntos. Luego agrega los nuevos productos al campo \`products\` de ese pedido. Cuando los productos sean añadidos, agradece al cliente por su compra y confirma que el pedido se ha actualizado.
        - Si hace un pedido e indico su nombre, devuelve en el campo producto los productos agregados por el usuario con los campos \`_id\` del producto en \`productId\`, el nombre del cliente en \`client\`, la cantidad, el \`price\`,  y el \`order_id\`. Si no tienes el ID, envía 0.

        Mensaje del usuario: "${message}"`;

    try { // TODO: devolver el id de compra al usuario despues de comprar 

        const cohereResponse = await queryCohereAI(prompt);
        const cohereResponseJson = JSON.parse(cohereResponse.generations[0].text)

        console.log('LOGGGGGGGG', cohereResponseJson.products)

        if (cohereResponseJson.products.length && cohereResponseJson.client) {
            let newOrder = Order({
                client: cohereResponseJson.client,
                products: cohereResponseJson.products
            })
            newOrder = await orderService.save(newOrder);

            cohereResponseJson.response += ` Su numero de pedido es: ${newOrder._id}, con su numero de pedido puede socitar un cambio de productos de ser necesario.`

            if (cohereResponseJson._id != 0) {
                orderService.addProducts(cohereResponseJson._id, cohereResponseJson.products);
            }
        }
        res.json(cohereResponseJson);

    } catch (error) {
        next(error)
    }
};

module.exports = { chat };