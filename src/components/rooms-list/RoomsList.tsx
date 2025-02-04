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
    <div>
      <h2>Rooms</h2>
      <ul className={styles.roomsContainer}>
        {rooms.map((room) => (<li key={room.id} className={styles.roomItem}>
          <p>Тип:{room.type}</p>
          <p>Номер:{room.number}</p>
          <button onClick={() => handleDeleteRoom(room.id)}>Delete Room</button>


          <ul className={styles.bedsContainer}>
            Beds:
            {room.beds.map(
              (bed) => <li key={bed.id} className={styles.bedItem}>
                <p>{bed.type}</p>
                <p>{bed.number}</p>
                <button onClick={() => handleDeleteBed(bed.id)}>Delete Bed</button>
              </li>
            )}
            <BedsForm roomId={room.id} />
          </ul>
        </li>))}
      </ul>
    </div>

  )
}

// import { useEffect, useState } from 'react'
// import instance from '../../lib/axios';
// import { Room } from '../../types/types';

// import styles from './RoomsList.module.css';
// import { useParams } from 'react-router-dom';

// export default function RoomsList() {
//   const { id } = useParams();

//   const [room, setRoom] = useState<Room>();

//   async function fetchRooms() {
//     const res = await instance.get(`rooms/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
//     setRoom(res.data)
//   }

//   useEffect(() => { fetchRooms() }, [])

//   if (!room) return <div>The room does not exist.</div>;

//   return (
//     <div>
//       <h2>Rooms</h2>
//       <ul className={styles.roomsContainer}>
//         <li key={room.id} className={styles.roomItem}>
//           <img className={styles.img} src="../../../public/assets/images/1.jpg" alt="" />
//           <p>{room.type}</p>
//           <p> {room.number}</p>
//           <p> {room.price}</p>

//           <ul className={styles.bedsContainer}>
//             Beds:
//             {room?.beds?.map(
//               (bed) => <li key={bed.id} className={styles.bedItem}>
//                 <p>{bed.type}</p>
//                 <p> {bed.number}</p>
//                 <p> {bed.price}</p>
//               </li>
//             )}</ul>
//         </li>
//       </ul>
//     </div>

//   )
// }

// import { useEffect, useState } from 'react'
// import instance from '../../lib/axios';
// import { Room } from '../../types/types';

// import * as Yup from 'yup';

// import styles from './RoomsList.module.css';
// import { useParams } from 'react-router-dom';
// import { useFormik } from 'formik';

// const schema = Yup.object({
//   number: Yup.string().required("Room number is required!"),
//   type: Yup.string().required("Type is required!"),
//   price: Yup.number().required("Price is required!"),
// });

// export default function RoomsList() {
//   const { id } = useParams();

//   const [room, setRoom] = useState<Room>();

//   async function fetchRooms() {
//     const res = await instance.get(`rooms/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } })
//     setRoom(res.data)
//   }

//   useEffect(() => { fetchRooms() }, [])

//   const formik = useFormik({
//     initialValues: {
//       number: '',
//       type: '',
//       price: '',
//     },
//     validationSchema: schema,
//     onSubmit: async (values) => {
//       try {
//         await instance.post("/beds", { ...values, price: Number(values.price), roomId: Number(id) }, {
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
//         });

//         fetchRooms();
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   });

//   if (!room) return <div>The room does not exist.</div>;

//   return (
//     <div>
//       <div className="login-form">
//         <h2>Add bed</h2>
//         <form onSubmit={formik.handleSubmit}>
//           <input
//             type="text"
//             name="number"
//             placeholder="number"
//             value={formik.values.number}
//             onChange={formik.handleChange}
//           />
//           <input
//             type="text"
//             name="type"
//             placeholder="type"
//             value={formik.values.type}
//             onChange={formik.handleChange}
//           />
//           <input
//             type="text"
//             name="price"
//             placeholder="price"
//             value={formik.values.price}
//             onChange={formik.handleChange}
//           />
//           {formik.errors.price && <span>{formik.errors.price}</span>}
//           <button type="submit" className="form-button">Add</button>
//         </form>
//       </div>
//       <h2>Room details</h2>
//       <ul className={styles.roomsContainer}>
//         <li key={room.id} className={styles.roomItem}>
//           <img className={styles.img} src="../../../public/assets/images/1.jpg" alt="" />
//           <p>{room.type}</p>
//           <p> {room.number}</p>
//           <p> {room.price}</p>

//           <ul className={styles.bedsContainer}>
//             Beds:
//             {room?.beds?.map(
//               (bed) => <li key={bed.id} className={styles.bedItem}>
//                 <p>{bed.type}</p>
//                 <p> {bed.number}</p>
//                 <p> {bed.price}</p>
//               </li>
//             )}</ul>
//         </li>
//       </ul>
//     </div>

//   )
// }