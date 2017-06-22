import React from 'react';

import Layout from './Layout.jsx';

const Login = (props) => (
  <Layout {...props}>
    <div className='main container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <h1 className='display-4 mb-5'>Log In</h1>
          <form method='POST' action='/login'>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input id='email' className='form-control' type='email' placeholder='email' name='email' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input id='email' className='form-control' type='password' placeholder='password' name='password' />
            </div>
            <button className='btn btn-outline-primary mt-3' type='submit'>Log in</button>
          </form>
        </div>
      </div>
    </div>
  </Layout>
);

export default Login;
