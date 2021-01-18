import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Posts(props) {
  const [data, setdata] = useState([]);
  const [lat, setlat] = useState('');
  const [lng, setlng] = useState('');

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  // Addind distance to every post with respect to user coordinate
  const addDist = (data) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
    for (let i = 0; i < data.length; i++) {
      data[i]['distance'] = calculateDistance(
        lat,
        lng,
        data[i]['lat'],
        data[i]['lng']
      );
    }
  };
  const showPosition = (position) => {
    setlat(position.coords.latitude);
    setlng(position.coords.longitude);
  };

  useEffect(() => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    };

    // Request to get all the posts from backend
    axios
      .get('https://lt-lgtime-backend.herokuapp.com/api/v1/posts/all', config)
      .then((response) => {
        if (response.data.status === 'Failed') {
          props.history.push('/');
        }
        addDist(response.data);
        response.data.sort(function (a, b) {
          return a.distance - b.distance;
        });
        setdata(response.data);
      })
      .catch((error) => {});
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1 className='text-center mt-5 mb-3'>Posts</h1>
      {data.map((post) => {
        return (
          <div key={post._id} className='border border-3 mb-5 rounded'>
            {post.img && (
              <img
                className='rounded mx-auto d-block mt-3'
                src={
                  'https://lt-lgtime-backend.herokuapp.com/' +
                  post.img.replace('public/', '')
                }
                alt=''
              />
            )}
            {post.about && <p className='text-center mt-3'> {post.about} </p>}
            <p className='text-end me-3 fw-bold'> Location - {post.country} </p>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
