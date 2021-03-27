require("dotenv").config();
const express = require("express");
const router = express.Router();
const sendGridApiKey = process.env.SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(sendGridApiKey);

const sendEmail = async (req, res) => {

  const { from, to, subject, content} = req.body;

  const msg = {
    //  Chnage this to your own email to get mail sent to your inbox
    to: "gbudjeakp@gmail.com",
    //Do not change verified (The from email) Sender as SendGrid will only send from this email.
    from: "sebdwebdev@gmail.com",
    subject: "Testing Jest",
    html: "Hope this works",
  };
  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "You might not be authorized to make this action" });
    if (error.response) {
      console.error(error.response.body);
    }
  }
};

router.post("/sendemail", sendEmail);

module.exports = router;
