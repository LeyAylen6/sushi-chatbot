import React from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

const products: Product[] = [
    { id: 1, name: 'Sushi', description: 'Delicious sushi', price: 15 },
    { id: 2, name: 'Tempura', description: 'Crispy tempura', price: 10 },
];

const ProductList: React.FC = () => {
    return (
        <div>
            <h2>Productos Existentes</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <strong>{product.name}</strong> - {product.description} - ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;