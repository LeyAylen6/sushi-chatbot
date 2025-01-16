import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import AdminItemForm from '../AdminItems/AdminItems';
import { getAllFaqs, getAllOrders, getAllProducts } from '../../service/apiService';

const AdminDashboard: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState<'products' | 'faqs' | 'orders'>('products');
    const [products, setProducts] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllFaqs().then((data) => setFaqs(data))
        getAllOrders().then((data) => setOrders(data))
        getAllProducts().then((data) => setProducts(data))
    }, [])

    const renderTabContent = () => {
        switch (selectedTab) {
            case 'products':
                return <AdminItemForm type="products" existingItems={products} />;
            case 'faqs':
                return <AdminItemForm type="faqs" existingItems={faqs} />;
            case 'orders':
                return <AdminItemForm type="orders" existingItems={orders} />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.tabContainer}>
                <button
                    onClick={() => setSelectedTab('products')}
                    className={styles.tabButton}
                >
                    Gestionar Productos
                </button>
                <button
                    onClick={() => setSelectedTab('faqs')}
                    className={styles.tabButton}
                >
                    Gestionar FAQs
                </button>
                <button
                    onClick={() => setSelectedTab('orders')}
                    className={styles.tabButton}
                >
                    Ver Pedidos
                </button>
            </div>
            {renderTabContent()}
        </div>
    );
};

export default AdminDashboard;