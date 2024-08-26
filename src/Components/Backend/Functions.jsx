const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

// Initialize Firebase Admin
admin.initializeApp();

// Set your SendGrid API key
sgMail.setApiKey("YOUR_SENDGRID_API_KEY");

// Cloud Function to send email
exports.sendApprovalEmail = functions.https.onRequest((req, res) => {
  const { email, status } = req.body;

  const message = {
    to: email,
    from: "obomanuboma10@gmail.com", 
    subject: `Your Application has been ${status}`,
    text: `Hello, Your application status has been updated to: ${status}. Thank you for applying.`,
  };

  sgMail
    .send(message)
    .then(() => {
      res.status(200).send("Email sent successfully.");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email.");
    });
});
