import React, { useState } from 'react';
import styles from './AdminItems.module.css';

interface AdminItemFormProps {
    type: 'products' | 'faqs' | 'orders';
    existingItems: Array<any>;
}

const AdminItemForm: React.FC<AdminItemFormProps> = ({ type, existingItems }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState<number | string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newItem = { name, description, price: type === 'orders' ? undefined : price };
        console.log(`${type.charAt(0).toUpperCase() + type.slice(1)} creado:`, newItem);

        setName('');
        setDescription('');
        setPrice('');
    };

    return (
        <div className={styles.adminContainer}>
            {type !== 'orders' && (
                <div className={styles.formContainer}>
                    <h2>{`Crear Nuevo ${type.charAt(0).toUpperCase() + type.slice(1)}`}</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder={`Nombre del ${type.slice(0, -1)}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <textarea
                            placeholder={`Descripción del ${type.slice(0, -1)}`}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className={styles.textarea}
                        />
                        <input
                            type="number"
                            placeholder="Precio"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>Crear {type.slice(0, -1)}</button>
                    </form>
                </div>)}
            <div className={styles.existingItemsContainer}>
                <h3>{`${type.charAt(0).toUpperCase() + type.slice(1)} Existentes`}</h3>
                <ul>
                    {existingItems?.map(item => (
                        <li key={item.id}>
                            <strong>{item.name || item.question || item.client}</strong> -
                            {item?.description} {item?.price && ` - $${item.price}`}
                            {item.answer}
                            {item.state} - {`$${item.total}`}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminItemForm;