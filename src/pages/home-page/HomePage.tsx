
import { Link } from "react-router-dom";
import styles from "./homePage.module.css";
import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import { Room } from "../../types/types";




const HomePage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  async function fetchRooms() {
    const res = await instance.get('/rooms', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    setRooms(res.data)
  }
  useEffect(() => { fetchRooms() }, [])



  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Available Rooms</h2>
      <div className={styles.cardContainer}>
        {rooms.map((room) => (
          <Link to={`/rooms/${room.id}`} key={room.id} className={styles.card}>
            <img src={room.image} alt={room?.type} className={styles.image} />
            <h2 className={styles.roomTitle}>{room.type}</h2>
            <p className={styles.description}>{room?.description}</p>
            <p className={styles.price}>Price: ${room?.price}</p>

          </Link>
        ))}
      </div>
    </div>)
}
export default HomePage;