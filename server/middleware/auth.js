const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error('Unauthenticated');

    const email = jwt.verify(token, process.env.JWT_SECRET);

    // TODO start
    // 1. Find user in DB and match username
    // TODO end

    // Will return user obj when DB is implemented
    res.locals.email = email;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};
