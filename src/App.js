import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import Auth from './pages/Auth';
import Posts from './pages/Posts';
import PostForm from './pages/PostForm';

function App() {
  return (
    <div className='App container'>
      <nav className='navbar'>
        <Link className='navbar-brand' to='/posts'>
          Home
        </Link>
        <Link className='navbar-link' to='/create'>
          Create Post
        </Link>
      </nav>
      <Switch>
        <Route exact path='/' component={Auth} />
        <Route exact path='/posts' component={Posts} />
        <Route exact path='/create' component={PostForm} />
      </Switch>
    </div>
  );
}

export default App;
