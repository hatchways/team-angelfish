const { json } = require('express');
const express = require('express');
const router = express.Router();

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const register = (req, res) => {
  const { email, name, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  //  TODO:
  // 2: Register logic to DB

  return res
    .status(201)
    .json({ status: 'success', data: { user: { email, name } } });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // TODO:
  // 1. Login logic
  // 2. Verify Username & password

  return res.json({ message: 'Login connected' });
};

router.post('/register', register);
router.post('/login', login);
// TODO:
//  Add auth middleware

module.exports = router;
