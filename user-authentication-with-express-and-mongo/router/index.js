const express = require('express');

const index = require('./routes/index.js');
const register = require('./routes/register.js');
const about = require('./routes/about.js');
const contact = require('./routes/contact.js');
const profile = require('./routes/profile.js');
const login = require('./routes/login.js');
const logout = require('./routes/logout.js');

const router = express.Router();

// GET /
router.use('/', index);

// GET/POST /register
router.use('/register', register);

// GET /about
router.use('/about', about);

// GET /contact
router.use('/contact', contact);

// GET /profile
router.use('/profile', profile);

// GET/POST /login
router.use('/login', login);

// GET /logout
router.use('/logout', logout);

module.exports = router;
