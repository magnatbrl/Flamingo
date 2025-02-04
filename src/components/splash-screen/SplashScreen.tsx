// src/components/SplashScreen.js
import React, { useEffect } from 'react';
import './SplashScreen.css'
// Типизация пропсов
interface SplashScreenProps {
    onClose: () => void; // Функция, которая вызывается при закрытии
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 2000); // Закрываем окно через 2 секунды
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="splash-screen">
            <h1>Casa Flamingo</h1>
        </div>
    );
};

export default SplashScreen;
