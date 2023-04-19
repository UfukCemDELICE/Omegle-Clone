import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

type Room = {
  _id: string;
  status: String;
}
const createRoom = (): Promise<Room> => {
  return fetch('/api/rooms', {
    method: 'POST',
  }).then((response) => response.json());
}

export default function Home() {

  const [room, setRoom] = useState<Room | undefined>();

  useEffect(() => {
    fetch('/api/rooms')
    .then(response => response.json())
    .then(rooms => {
      if(rooms.length > 0) {
        setRoom(rooms[0]);
      }else{
        createRoom().then(setRoom);
      }
    })
  }, []);
  return (
    <>
      <Head>
        <title>Omegle Clone</title>
        <link rel="icon" href="/massage.png" />
      </Head>
      <main className={styles.main}>{room?._id}</main>
    </>
  )
}
