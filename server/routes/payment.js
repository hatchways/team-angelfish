const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { attachPaymentMethod, paymentIntent } = require("../utils/stripe");

const createNewPaymentMethod = async (req, res) => {
  const { user } = res.locals;
  if (user) {
    const { id } = req.body;
    if (!id) return res.sendStatus(400);
    const { customer } = user;
    const result = await attachPaymentMethod({
      customer: customer.stripeId,
      id,
    });
    console.log(result);
    return res.status(200).json({ message: "Success" });
  } else return res.sendStatus(401);
};

const getSecret = async (req, res) => {
  const intent = await paymentIntent(req.body);
  return res.json(intent);
};

router.post("/payment/create", auth, createNewPaymentMethod);
router.post("/secret", getSecret);

module.exports = router;
