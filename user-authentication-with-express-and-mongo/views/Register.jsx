import React from 'react';

import Layout from './Layout.jsx';

const Register = (props) => (
  <Layout {...props} active='register'>
    <div className='main container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h1 className='display-4 mb-5'>Sign Up</h1>
          <form method='POST' action='/register'>
            <div className='form-group'>
              <label htmlFor='name'>Name:</label>
              <input id='name' className='form-control' type='text' placeholder='Luke Skywalker' name='name' required />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <input id='email' className='form-control' type='email' placeholder='luke.skywalker@email.com' name='email' required />
            </div>
            <div className='form-group'>
              <label htmlFor='favoriteBook'>Favorite Book:</label>
              <input id='favoriteBook' className='form-control' type='text' placeholder='A New Hope' name='favoriteBook' required />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <input id='password' className='form-control' type='password' name='password' required />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password:</label>
              <input id='confirmPassword' className='form-control' type='password' name='confirmPassword' required />
            </div>
            <button className='btn btn-outline-primary mt-3' type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
);

export default Register;
