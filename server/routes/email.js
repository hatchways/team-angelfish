require("dotenv").config();
const express = require("express");
const router = express.Router();
const sendGridApiKey = process.env.SENDGRID_API_KEY;
const sgMail = require("@sendgrid/mail");
const auth = require("../middleware/auth");

sgMail.setApiKey(sendGridApiKey);

const sendEmail = async (req, res) => {
  //Fake Flight Data to test the email
  const flightData = {
    passenger: "teamAngelFish",
    from: "Toronto",
    to: "Bali",
    departureTime: "12PM",
    arrivalTime: "1PM",
    hotelName: "La Crop",
  };
 
  const {
    passenger,
    from,
    to,
    departureTime,
    arrivalTime,
    hotelName,
  } = flightData;

  const msg = {
    //  Chnage this to your own email to get mail sent to your inbox
    to: "plug in any email you want sent to",

    //Do not change verified (The from email) Sender as SendGrid will only send from this email.
    from: "I'm sending the verified email to slack",
    subject: "Flight Details",
    html: `<h4>Passenger Name: ${passenger}</h4>
      <h4>from: ${from}</h4>
      <h4>to: ${to}</h4> 
      <h4>Depature Time: ${departureTime}</h4>
      <h4>Arrival Time: ${arrivalTime}</h4>
      <h4>Hotel Name: ${hotelName}</h4>`,
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
