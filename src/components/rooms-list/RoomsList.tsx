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
      <h2 className={styles.title}>Rooms</h2>
        <ul className={styles.cardContainer}>
          {rooms.map((room) => (<li key={room.id} className={styles.card}>
            <p>Type room: {room.type}</p>
            <p>Number room: {room.number}</p>
            <button className={styles.removeBtn} onClick={() => handleDeleteRoom(room.id)}>Delete Room</button>
            <p className={styles.p}>Beds:</p>
            <ul className={styles.bedsContainer}>
              {room.beds.map(
                (bed) => <li key={bed.id} className={styles.cardBed}>
                  <p>Type bed: {bed.type}</p>
                  <p>Number bed: {bed.number}</p>
                  <button className={styles.removeBtn} onClick={() => handleDeleteBed(bed.id)}>Delete Bed</button>
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