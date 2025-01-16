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
        console.log(response)
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
                        {message.text}
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
        </div>
    );
};

export default ChatClient;



// import React, { useEffect, useState } from 'react';
// import styles from './ChatClient.module.css';

// const ChatClient: React.FC = () => {
//     const [messages, setMessages] = useState<{ text: string; from: string }[]>([
//         { text: '¡Hola! ¿En qué puedo ayudarte hoy?', from: 'bot' },
//     ]);

//     const handleUserMessage = (message: string): void => {
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { text: message, from: 'user' },
//         ]);
//         setMessages((prevMessages) => [
//             ...prevMessages,
//             { text: '¿Qué tipo de sushi te gustaría pedir?', from: 'bot' },
//         ]);
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         const input = (event.target as HTMLFormElement).elements.namedItem(
//             'messageInput'
//         ) as HTMLInputElement;
//         const message = input.value.trim();

//         if (message) {
//             handleUserMessage(message);
//             input.value = '';
//         }
//     };

//     useEffect(() => {
//         const chatContainer = document.getElementById('chatMessages');
//         if (chatContainer) {
//             chatContainer.scrollTop = chatContainer.scrollHeight;
//         }
//     }, [messages]);

//     return (
//         <div className={styles.chatContainer}>
//             <div id="chatMessages" className={styles.chatMessages}>
//                 {messages.map((msg, index) => (
//                     <div
//                         key={index}
//                         className={`${styles.chatMessage} ${msg.from === 'user' ? styles.user : styles.bot
//                             }`}
//                     >
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>
//             <div className={styles.suggestions}>
//                 <p>Menu</p>
//                 <p>FAQS</p>
//                 <p>Hacer un pedido</p>
//             </div>
//             <form onSubmit={handleSubmit} className={styles.chatInput}>
//                 <input
//                     type="text"
//                     name="messageInput"
//                     placeholder="Escribe tu mensaje..."
//                     className={styles.input}
//                 />
//                 <button type="submit" className={styles.button}>
//                     Enviar
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default ChatClient;