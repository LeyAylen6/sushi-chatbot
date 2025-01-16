import React from 'react';
import ChatClient from '../../components/ChatClient/ChatClient';
import styles from './ClientPage.module.css'

const ClientPage: React.FC = () => {
    return (
        <div className={styles.clientPageContainer}>
            <h1>Sushi Bot</h1>
            <p>
                Haz tu pedido online, consulta nuestras preguntas frecuentes, revisa nuestros horarios y mucho más. ¡Disfruta del mejor sushi directamente desde tu teléfono!
            </p>
            <ChatClient />
        </div>
    );
};

export default ClientPage;