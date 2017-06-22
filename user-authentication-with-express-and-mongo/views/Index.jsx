import React from 'react';

import Layout from './Layout.jsx';

const Index = (props) => (
  <Layout {...props}>
    <div className='main container text-center'>
      <h1 className='display-4'>Read &amp; Share Books</h1>
      <p className='lead'>Choose from our large collection of paid and free books!</p>
      <a className='btn btn-lg btn-outline-info mt-5' href='/register'>Get started for FREE</a>
    </div>
  </Layout>
);

export default Index;
