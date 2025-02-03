import { useEffect, useState } from "react";
import instance from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Room } from "../../types/types";

export default function RoomPage() {
  const { id } = useParams();

  const [room, setRoom] = useState<Room | undefined>(undefined);

  async function fetchRoom() {
    const res = await instance.get(`/rooms/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setRoom(res.data);
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <div>
      <h2> </h2>
      <img src={room?.image} alt={room?.type} />
      <h2>{room?.type}</h2>
      <p>{room?.description}</p>
      <p>Price: ${room?.price}</p>
      Beds:
      {room?.beds.map((bed) => (
        <li key={bed.id}>
          <p>{bed.type}</p>
          <p>{bed.number}</p>
        </li>
      ))}
    </div>
  );
}
