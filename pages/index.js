import Head from 'next/head';
import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';

import { OnlineBooking } from '../calendar/onlinebooking';
import { AppointmentPost } from '../components/Form';
import { connectToDatabase } from '../util/mongodb';
import { useState } from 'react';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false
});

export default function Home(props) {
  //console.log(props.appointments);
  const databaseAppointments = {};
  for (let i = 0; i < Object.keys(props.appointments).length; i++) {
    databaseAppointments[props.appointments[i].date] = props.appointments[i].appointments;
  }
  const [appointments, updateAppointments] = useState(databaseAppointments);
  const dateKeys = Object.keys(appointments);

  //console.log(appointments[dateKeys[0]][1300]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Jo Brookbank Homeopathy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div style={{ marginLeft: 500, marginTop: 20 }}>
          <h1>Jo Brookbank Homeopathy</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
          <OnlineBooking appointments={appointments} dateKeys={dateKeys} />
        </div>
        <AppointmentPost />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const appointments = await db.collection('bookingdata').find({}).limit(10).toArray();
  return {
    props: {
      appointments: JSON.parse(JSON.stringify(appointments))
    }
  };
}
