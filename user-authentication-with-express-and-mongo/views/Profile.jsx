import React from 'react';
import PropTypes from 'prop-types';

import Layout from './Layout.jsx';

const Profile = ({title, currentUser, name, favoriteBook}) => (
  <Layout title={title} active='profile' currentUser={currentUser}>
    <div className='main container'>
      <div className='row'>
        <div className='col-md-8 offset-md-2'>
          <h1 className='display-4 mb-5'>
            <img className='avatar rounded-circle mr-3' src='/images/avatar.png' alt='avatar' />
            {name}
          </h1>
          <h2 className='mb-3'>Favorite Book</h2>
          {favoriteBook}
        </div>
      </div>
    </div>
  </Layout>
);

Profile.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  favoriteBook: PropTypes.string.isRequired,
  currentUser: PropTypes.string
};

export default Profile;
