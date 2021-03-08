const { json } = require('express');
const express = require('express');
const router = express.Router();

const register = (req, res) => {
  const { email, name, password } = req.body;

  //  TODO:
  // 1: Validation
  // 2: Register logic to DB

  return res.json({ data: { email, name, password } });
};

const login = (req, res) => {
  // TODO:
  // 1. Validation
  // 2. Login logic

  return res.json({ message: 'Login connected' });
};

router.post('/register', register);
router.post('/login', login);

module.exports = router;
