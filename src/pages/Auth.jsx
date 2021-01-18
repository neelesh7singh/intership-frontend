import React, { useState } from 'react';
import axios from 'axios';

function Auth(props) {
  const [username, setUsername] = useState('');
  const [useremail, setUseremail] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [userpassword2, setUserpassword2] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', useremail);
    if (userpassword !== userpassword2) {
      alert('Passwords did not match');
      return;
    }
    formData.append('password', userpassword);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    // Request to backend
    axios
      .post('http://localhost:3000/api/v1/auth/signup', formData, config)
      .then((response) => {
        console.log(response);
        if (response.data.status === 'Failed') alert(response.data.message);
        else props.history.push('/posts');
      })
      .catch((error) => {});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', useremail);
    formData.append('password', userpassword);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    // Request to backend
    axios
      .post('http://localhost:3000/api/v1/auth/login', formData, config)
      .then((response) => {
        console.log(response);
        if (response.data.status === 'Failed') alert(response.data.message);
        else props.history.push('/posts');
      })
      .catch((error) => {});
  };
  return (
    <div className='row'>
      <div className='col'>
        <form onSubmit={handleSignUp}>
          <legend className=' mt-5'>SignUp</legend>
          <div className='mb-3'>
            <label className='form-label'>Name:</label>
            <input
              type='text'
              name='name'
              className='form-control'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Emal:</label>
            <input
              type='text'
              name='email'
              className='form-control'
              onChange={(e) => setUseremail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password:</label>
            <input
              type='password'
              name='password'
              className='form-control'
              onChange={(e) => setUserpassword(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Confirm Password:</label>
            <input
              type='password'
              name='password'
              className='form-control'
              onChange={(e) => setUserpassword2(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Upload
          </button>
        </form>
      </div>
      <div className='col'>
        <form onSubmit={handleLogin}>
          <legend className=' mt-5'>LogIn</legend>
          <div className='mb-3'>
            <label className='form-label'>Emal:</label>
            <input
              type='text'
              name='email'
              className='form-control'
              onChange={(e) => setUseremail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password:</label>
            <input
              type='password'
              name='password'
              className='form-control'
              onChange={(e) => setUserpassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
