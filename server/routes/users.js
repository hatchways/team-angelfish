require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const bcrypt = require("bcrypt");

const auth = require("../middleware/auth");

const User = require("../models/User");

const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = (req, res) => {
  const { email, name, password } = req.body;
  const { errors, isValid } = validateRegisterInput(req.body);
  const saltRounds = 10;

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Authentication Failed" });
    } else {
      createStripeCustomer({ email })
        .then((data) => {
          const newUser = new User({
            name: name,
            email: email,
            password: password,
            customer: { stripeId: data.id },
          });
          bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                if (user) {
                  const payload = { id: user._id, email: user.email };
                  const token = jwt.sign(payload, process.env.JWT_SECRET);
                  res.set(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                      httpOnly: true,
                      secure: process.env.NODE_ENV === "production",
                      sameSite: "strict",
                      maxAge: 3600,
                      path: "/",
                    }),
                  );
                }
                res
                  .status(200)
                  .json({ status: "success", data: { user: user } });
              })
              .catch((err) => {
                res.status(400).json({ message: err.message });
              });
          });
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ email: "Authentication Failed" });
    }
    bcrypt.compare(password, user.password).then((passwordMatches) => {
      if (passwordMatches) {
        const payload = { id: user._id, email: user.email };
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.set(
          "Set-Cookie",
          cookie.serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          }),
        );
        return res.json({ status: "success", data: { user: user } });
      } else {
        return res.status(400).json({ password: "Password is incorrect" });
      }
    });
  });
};

const authorized = (req, res) => {
  return res.json({ user: res.locals.user });
};

// TODO
// 1.Logout route

router.post("/register", register);
router.post("/login", login);
router.get("/auth", auth, authorized);

module.exports = router;
