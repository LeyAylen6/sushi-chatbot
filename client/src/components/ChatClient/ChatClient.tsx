import React, { useEffect, useState } from 'react';
import styles from './ChatClient.module.css';
import { talkToTheChat } from '../../service/apiService';

const ChatClient: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ text: string; from: string }[]>([
        { text: '¡Hola! ¿En qué puedo ayudarte hoy?', from: 'bot' },
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const message = inputValue.trim();
        if (message) {
            handleUserMessage(message);
            getBotResponse(message);
        }

        setInputValue('');
    };

    const handleUserMessage = (message: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, from: 'user' },
        ]);
    };

    const getBotResponse = async (userMessage: string) => {
        const response = await talkToTheChat(userMessage)
        if (response) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: response, from: 'bot' },
            ]);
        }
    };

    useEffect(() => {
        const chatContainer = document.getElementById('chatMessages');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={styles.chatContainer}>
            <div id="chatMessages" className={styles.chatMessages}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.chatMessage} ${message.from === 'user' ? styles.user : styles.bot}`}
                    >
                        {message.from === 'bot' ? (
                            <pre style={{ whiteSpace: 'pre-wrap' }}>{message.text}</pre>
                        ) : (
                            message.text
                        )}
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit} className={styles.chatInput}>
                <input
                    type="text"
                    name="messageInput"
                    placeholder="Escribe tu mensaje..."
                    className={styles.input}
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button type="submit" className={styles.button}>
                    Enviar
                </button>
            </form>
        </div >
    );
};

export default ChatClient;
