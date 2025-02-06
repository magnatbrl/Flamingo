import { useEffect, useState } from 'react'
import instance from '../../lib/axios';
import { Room } from '../../types/types';
import styles from './RoomsList.module.css';
import BedsForm from '../beds-form/BedsForm';

export default function RoomsList() {

  const [rooms, setRooms] = useState<Room[]>([]);

  async function fetchRooms() {
    const res = await instance.get('/rooms', { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    setRooms(res.data)
  }


  async function deleteRoom(id: number) {
    const res = await instance.delete(`/rooms/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })

    if (res.status === 204) {
      fetchRooms();
    }
  }

  function handleDeleteRoom(id: number) {
    deleteRoom(id);
  }

  async function deleteBed(id: number) {
    const res = await instance.delete(`/beds/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
    if (res.status === 204) {
      fetchRooms();
    }
  }

  function handleDeleteBed(id: number) {
    deleteBed(id);
  }


  useEffect(() => { fetchRooms() }, [])

  return (
    <>
      <div className={styles.container}>
      <h2 className={styles.h2}>Rooms</h2>
        <ul className={styles.cardContainer}>
          {rooms.map((room) => (<li key={room.id} className={styles.card}>
            <p className={styles.p}>Type: {room.type}</p>
            <p className={styles.p}>Number: {room.number}</p>
            <button className={styles.button} onClick={() => handleDeleteRoom(room.id)}>Delete Room</button>
            <p className={styles.p}>Beds:</p>
            <ul className={styles.bedsContainer}>
              {room.beds.map(
                (bed) => <li key={bed.id} className={styles.cardBed}>
                  <p className={styles.p}>{bed.type}</p>
                  <p className={styles.p}>{bed.number}</p>
                  <button className={styles.button} onClick={() => handleDeleteBed(bed.id)}>Delete Bed</button>
                </li>
              )}
            </ul>
            <BedsForm roomId={room.id} />
          </li>))}
        </ul>
      </div>
    </>

  )
}