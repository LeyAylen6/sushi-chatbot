import { FaqState, Field, ProductState } from "./interfaces";


export const productState: ProductState = {
    name: '',
    description: '',
    price: 0
}

export const faqState: FaqState = {
    answer: '',
    question: ''
}

export const faqsFields: Field[] = [
    {
        type: 'text',
        name: 'question',
        placeholder: 'Escriba una pregunta..',
        label: "Pregunta"
    },
    {
        type: 'textarea',
        name: 'answer',
        placeholder: 'Escriba una respuesta..',
        label: "respuesta"
    }
];

export const productFields: Field[] = [
    {
        type: 'text',
        name: 'name',
        placeholder: 'Nombre del producto',
        label: "Nombre"
    },
    {
        type: 'textarea',
        name: 'description',
        placeholder: 'Descripción del producto',
        label: "Descripción",
    },
    {
        type: 'number',
        name: 'price',
        placeholder: 'Precio del producto',
        label: "Precio",
    }
];