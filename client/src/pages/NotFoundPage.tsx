import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Página no encontrada</h1>
            <p>Lo siento, la página que buscas no existe.</p>
            <p>
                <Link to="/">Volver a la página principal</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;