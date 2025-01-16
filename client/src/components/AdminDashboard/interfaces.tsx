export interface AdminItemFormProps {
    type: 'products' | 'faqs' | 'orders';
    existingItems: any;
    createFunction?: Function
    inputFields?: Field[]
    state?: ProductState | FaqState
}

export interface Types {
    products: string
    faqs: string
    orders: string
}

export interface ProductState {
    name: string
    description: string
    price: number
    [key: string]: string | number
}

export interface FaqState {
    answer: string
    question: string
    [key: string]: string | number
}

export interface Field {
    type: string
    placeholder: string
    name: string
    label: string
}
