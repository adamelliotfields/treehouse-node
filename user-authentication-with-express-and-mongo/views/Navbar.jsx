import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Navbar = ({active, currentUser}) => {
  const register = classNames({ 'nav-item nav-link': true, 'active': active === 'register' || false });
  const about = classNames({ 'nav-item nav-link': true, 'active': active === 'about' || false });
  const contact = classNames({ 'nav-item nav-link': true, 'active': active === 'contact' || false });
  const profile = classNames({ 'nav-item nav-link': true, 'active': active === 'profile' || false });

  const registerLink = currentUser
    ? null
    : <a className={register} href='/register'>Sign Up</a>;

  const loginButton = currentUser
    ? <div>
        <img className='avatar-small rounded-circle mr-3' src='/images/avatar.png' alt='avatar' />
        <a className='btn btn-outline-primary' href='/logout'>Logout</a>
      </div>
    : <a className='btn btn-primary' href='/login'>Login</a>

  return (
    <nav className='navbar navbar-toggleable-md navbar-inverse'>
      <button
        className='navbar-toggler navbar-toggler-right'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
      >
        <span className='navbar-toggler-icon' />
      </button>
      <a className='navbar-brand' href='/'>
        <i className='icn-logo material-icons float-left mt-1 mx-1'>bookmark_border</i>
        Bookworm
      </a>
      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <div className='navbar-nav'>
          {registerLink}
          <a className={about} href='/about'>About</a>
          <a className={contact} href='/contact'>Contact</a>
          <a className={profile} href='/profile'>My Profile</a>
        </div>
        {loginButton}
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  active: PropTypes.string,
  currentUser: PropTypes.string
};

export default Navbar;
