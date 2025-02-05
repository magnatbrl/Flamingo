import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.css";
import instance from "../../lib/axios";

interface Booking {
  entryDate: string;
  departureDate: string;
  roomId: number;
  bedId: number;
  price: number;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  username: string;
  bookings?: Booking[];
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("Session expired. Please log in again.");
          navigate("/login");
          return;
        }

        const response = await instance.get("/profile",  {
          headers: { 'Content-Type': 'application/json' },
        });

        setUserData(response.data);
      } catch (error: any) {
        console.error("Error fetching profile data:", error.response?.data || error.message);
        if (error.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [navigate]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!userData) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.subheading}>My Profile</h3>
      <p className={styles.heading}>First Name: {userData.firstName}</p>
      <p className={styles.heading}>Last Name: {userData.lastName}</p>
      <p className={styles.heading}>Username: {userData.username}</p>
      <p className={styles.heading}>Phone: {userData.phone}</p>
      <p className={styles.heading}>Email: {userData.email}</p>
      
      <h3 className={styles.subheading}>Bookings</h3>
      {userData.bookings && userData.bookings.length > 0 ? (
        <ul className={styles.ulList}>
          {userData.bookings.map((booking, index) => (
            <li key={index}>
              Room: {booking.roomId}, Bed: {booking.bedId}, Dates: {booking.entryDate} - {booking.departureDate}, Price: ${booking.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default ProfilePage;
