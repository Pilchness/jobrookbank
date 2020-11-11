import { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

import dynamic from 'next/dynamic';

const StarRatings = dynamic(() => import('react-star-ratings'), {
  ssr: false
});

export const AppointmentPost = () => {
  const router = useRouter();
  const contentType = 'application/json';
  //const [errors, setErrors] = useState({});
  //const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    date: '',
    appointments: { 1400: 'available', 1500: 'available', 1600: 'available' }
  });

  const postData = async () => {
    try {
      const res = await fetch('/api/addBookings', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType
        },
        body: JSON.stringify({ date: form.date, appointments: form.appointments })
      });
      //console.log(res);

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/');
    } catch (error) {
      setMessage('Failed to add post');
    }
  };

  // const handleMessageChange = (event) => {
  //   setForm({
  //     ...form,
  //     postText: event.target.value
  //   });
  // };

  const handleDateChange = (event) => {
    setForm({
      ...form,
      date: event.target.value
    });
  };

  const handleSubmit = (e) => {
    postData();
    // e.preventDefault();
    // const errs = formValidate();
    // if (Object.keys(errs).length === 0) {
    //   postData();
    // } else {
    //   setErrors({ errs });
    // }
  };

  // const formValidate = () => {
  //   let err = {};
  //   // (!form.username) err.username = 'Name is required';
  //   //if (!form.postText) err.postText = 'Message is required';
  //   return err;
  // };

  return (
    <>
      <form id={uuidv4()} onSubmit={handleSubmit}>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" value={form.date} onChange={handleDateChange} required />

        <label htmlFor="appointments">Appointments</label>
        <input type="dropdown" />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      {/* <p>{message}</p> */}
      {/* <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div> */}
    </>
  );
};
