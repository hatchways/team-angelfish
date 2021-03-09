require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const bcrypt = require('bcrypt');

const auth = require('../middleware/auth');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// MOCK DATA
const testUser = {
  name: 'Ray',
  email: '1@gmail.com',
  //   save new hash here to test
  password: '$2b$10$Q7.7/ECbbHR0xXDiKab/K.OAcbojaZfWq7t4lOkh4IYRg9asJtuaC',
};

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  const saltRounds = 10;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    //  TODO start
    // 1. Validation check in DB if user exists

    // 2. hash password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      // Store hash in DB
      console.log(hash);
    });

    // 3. Logic to create user
    // TODO end

    const token = jwt.sign(email, process.env.JWT_SECRET);
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    return res
      .status(201)
      .json({ status: 'success', data: { user: { email, name } } });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // TODO start
    // 1. Validate if user exists

    // 2. Compare hash password - using user['password'] to match password
    // testUser is mock
    const passwordMatches = await bcrypt.compare(password, testUser.password);
    if (!passwordMatches) {
      return res.status(401).json({ password: 'Incorrect password' });
    }
    // TODO end

    const token = jwt.sign(email, process.env.JWT_SECRET);
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })
    );

    return res.json({ status: 'success', data: { user: { email } } });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const authorized = (req, res) => {
  return res.json({ email: res.locals.email });
};

// TODO
// 1.Logout route

router.post('/register', register);
router.post('/login', login);
router.get('/auth', auth, authorized);

module.exports = router;
