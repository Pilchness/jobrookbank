import { useState } from 'react';
import { useRouter } from 'next/router';

const FormPost = () => {
  const router = useRouter();
  const contentType = 'application/json';
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    username: '',
    postText: ''
  });

  const postData = async () => {
    try {
      const res = await fetch('/api/addPost', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType
        },
        body: JSON.stringify({ username: form.username, text: form.postText })
      });
      console.log(res);

      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/blog');
    } catch (error) {
      setMessage('Failed to add post');
    }
  };

  const handleMessageChange = (event) => {
    setForm({
      ...form,
      postText: event.target.value
    });
  };

  const handleUsernameChange = (event) => {
    setForm({
      ...form,
      username: event.target.value
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

  const formValidate = () => {
    let err = {};
    // (!form.username) err.username = 'Name is required';
    //if (!form.postText) err.postText = 'Message is required';
    return err;
  };

  return (
    <>
      <form id={new Date()} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          maxLength="20"
          name="username"
          value={form.username}
          onChange={handleUsernameChange}
          required
        />

        <label htmlFor="postText">Message</label>
        <textarea name="postText" maxLength="60" value={form.postText} onChange={handleMessageChange} required />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
};

export default FormPost;
