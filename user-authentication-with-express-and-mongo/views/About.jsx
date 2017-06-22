import React from 'react';

import Layout from './Layout.jsx';

const About = (props) => (
  <Layout {...props} active='about'>
    <div className='main container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h1 className='display-4'>About Us</h1>
          <p className='mt-3'>Bookworm is a friendly community where book lovers can discover and share books. See which books your friends are reading, and keep track of books you&apos;re reading or want to read.</p>
          <p>Sed dictum dolor vitae dignissim scelerisque. Ut tincidunt, tortor at accumsan eleifend, tellus lectus vestibulum nibh, accumsan sagittis turpis nisl eu mauris. Mauris ut laoreet sapien. Nam suscipit, dui at condimentum accumsan, dui sapien tincidunt.</p>
          <a className='btn btn-lg btn-outline-info mt-5' href='/register'>Get started for FREE</a>
        </div>
      </div>
    </div>
  </Layout>
);

export default About;
