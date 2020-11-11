import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { connectToDatabase } from '../util/mongodb';

import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false
});

export default function Admin(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jo Brookbank Homeopathy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {props.success}
        {props.error}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const dataArray = [
    {
      date: new Date(2020, 10, 10),
      appointments: { 1300: 'available', 1400: 'Suzy Small', 1500: 'available' }
    },
    { date: new Date(2020, 10, 11), appointments: { 1300: 'available', 1400: 'available', 1500: 'Billy Bongles' } },
    {
      date: new Date(2020, 10, 12),
      appointments: { 1300: 'Emma Engine', 1400: 'Molly Minute', 1500: 'Billy Bongles' }
    },
    { date: new Date(2020, 10, 13), appointments: { 1300: 'Debby Donuts', 1400: 'available', 1500: 'Billy Bongles' } },
    { date: new Date(2020, 10, 14), appointments: { 1300: 'Sandra Sausage', 1400: 'available', 1500: 'Sally Singer' } },
    { date: new Date(2020, 10, 15), appointments: { 1300: 'Peter Pineapple', 1400: 'available', 1500: 'available' } },
    { date: new Date(2020, 10, 16), appointments: { 1300: 'available', 1400: 'available', 1500: 'available' } },
    { date: new Date(2020, 10, 17), appointments: { 1300: 'Mandy Minute', 1400: 'available', 1500: 'Billy Bongles' } },
    { date: new Date(2020, 10, 18), appointments: { 1300: 'available', 1400: 'available', 1500: 'available' } }
  ];
  try {
    const { db } = await connectToDatabase();
    await db.collection('bookingdata').insertMany(dataArray);
    console.log('data uploaded');
    //res.status(201).json({ success: true, data: post });
    return { props: {} };
  } catch (error) {
    console.log(error);
    //res.status(400).json({ success: false });
    return { props: {} };
  }
}
