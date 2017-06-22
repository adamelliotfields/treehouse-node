import React from 'react';

import Layout from './Layout.jsx';

const Contact = (props) => (
  <Layout {...props} active='contact'>
    <div className='main container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h1 className='display-4'>Contact Us</h1>
          <p className='mt-3'>Sed dictum dolor vitae dignissim scelerisque. Ut tincidunt, tortor at accumsan eleifend, tellus lectus vestibulum nibh, accumsan sagittis turpis nisl eu mauris. Mauris ut laoreet sapien. Nam suscipit, dui at condimentum accumsan, dui sapien tincidunt.</p>
          <a className='btn btnlg btn-outline-info mt-5' href='#'>Get in touch</a>
        </div>
      </div>
    </div>
  </Layout>
);

export default Contact;
