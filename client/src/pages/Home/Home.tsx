import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <div className={styles.background}>
            <div className={styles.homeContainer}>
                <h1>Bienvenido a Sushi Express</h1>
                <div className={styles.menu}>
                    <Link to="/chat" className={styles.menuItem}>
                        Soy un Cliente
                    </Link>
                    <Link to="/admin" className={styles.menuItem}>
                        Soy un Administrador
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;