import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles  from './ProfilePage.module.css';



interface IBooking {
  roomNumber: string;
  guests: number;
  checkInDate: string;
  checkOutDate: string;
}

interface IUserData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  username: string;
  bookings?: IBooking[];
  isProfileVisible: boolean;
}
const isTestMode = true; // Установите в `false` для отключения тестового режима

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<IUserData | null>(null);
  const [messages, setMessages] = useState([
    { user: 'admin', text: 'Hello! How can I help you??', timestamp: '10:00 AM' }
  ]);
  const [editableField, setEditableField] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState<string>("");


  //  Включить этот код после окончания тестирования

  // useEffect(() => {
  //   const storedUser = localStorage.getItem('user');
  //   if (storedUser) {
  //     setUserData(JSON.parse(storedUser));
  //   } else {
  //     alert("Please register first!");
  //     navigate('/register');
  //   }
  // }, [navigate]);

  //тестовый  режим
  useEffect(() => {
    if (isTestMode) {
      const mockUser = {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        phone: '123456789',
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser',
        bookings: [
          { roomNumber: '101', guests: 2, checkInDate: '2025-01-20', checkOutDate: '2025-01-22' },
        ],
        isProfileVisible: true,
      };
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUserData(mockUser);
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      } else {
        alert('Please register first!');
        navigate('/register');
      }
    }
  }, [navigate]);

  // @ts-ignore
  const handleSendMessage = (message: string) => {
    const newMessage = {
      user: 'user',
      text: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);

    setTimeout(() => {
      const adminResponse = {
        user: 'admin',
        text: 'Your request has been accepted, we will respond as soon as possible.',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, adminResponse]);
    }, 2000);
  };

  const startEditing = (field: keyof IUserData) => {
    if (userData) {
      setEditableField(field);
      setFieldValue(userData[field] as string);
    }
  };

  const saveField = (field: keyof IUserData) => {
    if (userData) {
      const updatedUserData = { ...userData, [field]: fieldValue };
      setUserData(updatedUserData);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
      setEditableField(null);
    }
  };

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(event.target.value);
  };

  if (!userData) {
    return <div>Loading user data...</div>;
  }

  // function handleClearData(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error("Function not implemented.");
  // }

  const handleClearData = () => {
    const clearedData: IUserData = {
      id: userData.id,
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      username: "",
      isProfileVisible: userData.isProfileVisible,
      bookings: [],
    };
    setUserData(clearedData);
  };

  return (
    <div className={styles.container}>

      <h3 className={styles.subheading}>My Profil</h3>

      <p className={styles.heading}>
        First Name: {editableField === "firstName" ? (
          <input type="text" value={fieldValue} onChange={handleFieldChange} />
        ) : (
          userData.firstName
        )}
        <span onClick={() => startEditing("firstName")} className={styles.editIcon}>✏️</span>
        {editableField === "firstName" && (
          <>
            <button onClick={() => saveField("firstName")} className={styles.saveButton}>Save</button>
            <button onClick={() => setEditableField(null)} className={styles.cancelButton}>Cancel</button>
          </>
        )}
      </p>

      <p className={styles.heading}>
        Last Name: {editableField === "lastName" ? (
          <input type="text" value={fieldValue} onChange={handleFieldChange} />
        ) : (
          userData.lastName
        )}
        <span onClick={() => startEditing("lastName")} className={styles.editIcon}>✏️</span>
        {editableField === "lastName" && (
          <button onClick={() => saveField("lastName")} className={styles.saveButton}>Save</button>
        )}
      </p>

      <p className={styles.heading}>
        Username: {editableField === "username" ? (
          <input type="text" value={fieldValue} onChange={handleFieldChange} />
        ) : (
          userData.username
        )}
        <span onClick={() => startEditing("username")} className={styles.editIcon}>✏️</span>
        {editableField === "username" && (
          <button onClick={() => saveField("username")} className={styles.saveButton}>Save</button>
        )}
      </p >

      <p className={styles.heading}>
        Phone: {editableField === "phone" ? (
          <input type="text" value={fieldValue} onChange={handleFieldChange} />
        ) : (
          userData.phone
        )}
        <span onClick={() => startEditing("phone")} className={styles.editIcon}>✏️</span>
        {editableField === "phone" && (
          <button onClick={() => saveField("phone")} className={styles.saveButton}>Save</button>
        )}
      </p>

      <p className={styles.heading}>
        Email: {editableField === "email" ? (
          <input type="email" value={fieldValue} onChange={handleFieldChange} />
        ) : (
          userData.email
        )}
        <span onClick={() => startEditing("email")} className={styles.editIcon}>✏️</span>
        {editableField === "email" && (
          <button onClick={() => saveField("email")} className={styles.saveButton}>Save</button>
        )}
      </p>

      <p className={styles.heading}>
        Password: {editableField === "password" ? (
          <input type="password" value={fieldValue} onChange={handleFieldChange} />
        ) : (
          userData.password
        )}
        <span onClick={() => startEditing("password")} className={styles.editIcon}>✏️</span>
        {editableField === "password" && (
          <button onClick={() => saveField("password")} className={styles.saveButton}>Save</button>
        )}
      </p>

      <h3 className={styles.subheading}>Bookings</h3>
      {userData.bookings && userData.bookings.length > 0 ? (
        <ul className={styles.ulList}>
          {userData.bookings.map((booking, index) => (
            <li key={index}>
              Room: {booking.roomNumber}, Guests: {booking.guests}, Dates: {booking.checkInDate} - {booking.checkOutDate}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
      <button onClick={handleClearData} className={styles.clearButton}>
        Clear data
      </button>


      <h3 className={styles.subheading} >Chat with Administration</h3>
    </div>

  );
};

export default ProfilePage;