import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = ({title, active, currentUser, children}) => (
  <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
      <meta httpEquiv='x-ua-compatible' content='ie=edge' />
      <title>{title}</title>
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css'
        integrity='sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ'
        crossOrigin='anonymous'
      />
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/icon?family=Material+Icons'
      />
      <link
        rel='stylesheet'
        href='/css/main.css'
      />
      <script
        src='https://code.jquery.com/jquery-3.1.1.slim.min.js'
        integrity='sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n'
        crossOrigin='anonymous'
      />
      <script
        src='https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js'
        integrity='sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb'
        crossOrigin='anonymous'
      />
      <script
        src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js'
        integrity='sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn'
        crossOrigin='anonymous'
      />
    </head>
    <body>
      <Navbar active={active} currentUser={currentUser} />
      {children}
      <Footer />
    </body>
  </html>
);

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  currentUser: PropTypes.string,
  active: PropTypes.string
};

export default Layout;
