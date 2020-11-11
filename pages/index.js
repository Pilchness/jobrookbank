import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { OnlineBooking } from '../calendar/onlinebooking';

export default function Home() {
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
          <OnlineBooking />
        </div>
      </main>
    </div>
  );
}
