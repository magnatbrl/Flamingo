import React, { useState } from 'react';


// Определение интерфейса для пропса user
interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  photo: string;
  isProfileVisible: boolean;
}

// Типизация для пропса onToggleProfile
interface UserProfileCardProps {
  user: User;
  onToggleProfile: (userId: string, newVisibility: boolean) => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, onToggleProfile }) => {
  const [isProfileVisible, setIsProfileVisible] = useState(user.isProfileVisible);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isRequestRejected, setIsRequestRejected] = useState(false);

  const handleRequest = () => {
    setIsRequestSent(true);
    // Здесь может быть логика для отправки запроса (например, открыть чат)
  };

  const handleRejectRequest = () => {
    setIsRequestSent(false);
    setIsRequestRejected(true);
  };

  const handleToggle = () => {
    setIsProfileVisible(!isProfileVisible);
    onToggleProfile(user.id, !isProfileVisible);
  };

  return (
    <div className="main-content">
      <div className="user-profile-card">
        <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
        <h3>{`${user.firstName} ${user.lastName}`}</h3>
        <p>{user.phone}</p>
        <p>{user.email}</p>

        <button onClick={handleToggle}>
          {isProfileVisible ? 'Скрыть профиль' : 'Показать профиль'}
        </button>
        <button onClick={user.isProfileVisible ? handleRequest : undefined}>
          {isRequestSent ? 'Запрос отправлен' : 'Сделать запрос'}
        </button>
        {isRequestSent && (
          <button onClick={handleRejectRequest}>Отклонить запрос</button>
        )}
        {isRequestRejected && (
          <p className="rejection-message">Извините, но ваше сообщение было отклонено</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
