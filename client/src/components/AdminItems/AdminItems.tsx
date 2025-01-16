import React, { useState } from 'react';
import styles from './AdminItems.module.css'
import { AdminItemFormProps, Types } from '../AdminDashboard/interfaces';

const AdminItemForm: React.FC<AdminItemFormProps> = ({
    type,
    existingItems,
    createFunction,
    state,
    inputFields
}) => {
    const [newItem, setNewItem] = useState(state);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        createFunction && await createFunction(newItem)
        setNewItem(state);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target

        setNewItem((prevState: any) => ({
            ...prevState,
            [name]: value
        }))
    }

    const itemName = (type: keyof Types): string => {
        const types: Types = {
            products: "Producto",
            faqs: 'Pregunta frecuente',
            orders: "pedido"
        }
        return types[type];
    }

    return (
        <div className={styles.adminContainer}>
            {type !== 'orders' && (
                <div className={styles.formContainer}>
                    <h2>{'Crear ' + itemName(type)}</h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {inputFields?.map((field) => (
                            field.type === 'textarea' ? (
                                <textarea
                                    key={field.name}
                                    placeholder={field.placeholder}
                                    name={field.name}
                                    value={newItem?.[field.name]}
                                    onChange={handleChange}
                                    required
                                    className={styles.textarea}
                                />
                            ) : (
                                <input
                                    key={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={newItem?.[field.name]}
                                    onChange={handleChange}
                                    required
                                    className={styles.input}
                                />
                            )
                        ))}
                        <button type="submit" className={styles.button}>
                            Crear {itemName(type)}
                        </button>
                    </form>
                </div>)}
            <div className={styles.existingItemsContainer}>
                <h3>Registro actualizado</h3>
                <ul>
                    {existingItems?.map((item: any) => (
                        <li key={item.id}>
                            {type === 'products' && (
                                <>
                                    <strong>{item?.name}</strong> - {item?.description} - ${item?.price}
                                </>
                            )}
                            {type === 'faqs' && (
                                <>
                                    <strong>{item?.question}</strong> - {item?.answer}
                                </>
                            )}
                            {type === 'orders' && (
                                <>
                                    <strong>{item?.client}</strong> - {item?.state} - ${item?.total}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};


export default AdminItemForm;