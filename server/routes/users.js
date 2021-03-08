const { json } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const testUser = {
  name: 'Ray',
  email: '1@gmail.com',
  password: '$2b$10$JCRhDoZVJbsDoWSZVN9gUuT4oL7wWF5JP0FSrTN5NIzBdRvbi3dgm',
};

const register = async (req, res) => {
  const { email, name, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  const saltRounds = 10;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    //  TODO:
    // 1. Validation check in DB if user exists

    // 2. hash password
    const createdHash = await bcrypt.hash(password, saltRounds, (err, hash) => {
      // Store hash in DB
      console.log(hash);
    });

    // 3. Logic to create user
    return res
      .status(201)
      .json({ status: 'success', data: { user: { email, name } } });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // TODO:
    // 1. Validate if user exists

    // 2. Compare hash password - using user['password'] to match password
    const passwordMatches = await bcrypt.compare(password, testUser.password);
    if (!passwordMatches) {
      return res.status(401).json({ password: 'Incorrect password' });
    }

    return res.json({ status: 'success', data: { user: { email } } });
  } catch (error) {
    console.log(error);
  }
};

router.post('/register', register);
router.post('/login', login);
// TODO:
//  Add auth middleware

module.exports = router;
