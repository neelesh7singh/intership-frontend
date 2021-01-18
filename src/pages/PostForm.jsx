import React, { useState } from 'react';
import axios from 'axios';
var convert = require('xml-js');

function PostForm(props) {
  const [img, setImg] = useState(null);
  const [about, setAbout] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('about', about);
    formData.append('img', img);
    let config = {
      headers: {
        'content-type': 'multipart/form-data',
        'X-Requested-With': 'XMLHttpRequest',
      },
    };

    // Request to get random loacation on land
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.3geonames.org/?randomland=yes',
        config
      )
      .then((response) => {
        var result1 = convert.xml2json(response.data, {
          compact: true,
          spaces: 4,
        });
        result1 = JSON.parse(result1);
        formData.append('lat', result1.geodata.nearest.latt._text);
        formData.append('lng', result1.geodata.nearest.longt._text);

        config = {
          ...config,
          withCredentials: true,
        };

        // Request to the backend
        axios
          .post(
            'https://lt-lgtime-backend.herokuapp.com/api/v1/posts/create',
            formData,
            config
          )
          .then((response) => {
            if (response.data.status === 'Failed') {
              if (response.data.message === 'Please login first')
                props.history.push('/');
              else alert(response.data.message);
              console.log(response);
              return;
            }
            props.history.push('/posts');
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <legend className=' mt-5'>Create Post</legend>
        <div className='mb-3'>
          <label className='form-label'>About :</label>
          <input
            type='text'
            name='about'
            maxlength='500'
            className='form-control'
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Imgage:</label>
          <input
            type='file'
            name='img'
            className='form-control'
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Upload
        </button>
      </form>
    </div>
  );
}

export default PostForm;
