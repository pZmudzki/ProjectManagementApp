var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendTicket = (req, res) => {
  const { from, subject, text } = req.body.ticketContent;

  if (subject === "" || text === "") {
    return res.json({ error: "Please fill all information." });
  }

  var mailOptions = {
    from: process.env.EMAIL,
    to: process.env.PROJECTFLOW_EMAIL,
    subject: subject,
    html: `<h3>From: ${from}</h3><h2>Subject: ${subject}</h2><h2>Description: ${text}</h2>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(400).json({ error: "Error sending an email." });
    } else {
      return res.status(200).json({ message: `Email sent: ${subject}` });
    }
  });
};

module.exports = {
  sendTicket,
};
