import React from 'react';
import PropTypes from 'prop-types';

import Layout from './Layout.jsx';

const Error = ({message}) => (
  <Layout title='Error'>
    <div className='main container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2 text-center'>
          <i className='icn-person material-icons'>error</i>
          <p className='lead mt-3'>{message}</p>
        </div>
      </div>
    </div>
  </Layout>
);

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
