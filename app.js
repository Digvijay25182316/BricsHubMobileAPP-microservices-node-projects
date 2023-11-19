const express = require("express");
const path = require("path");
const sendEmail = require("./utils/SendMail");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//handeling file uploads
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// controllers for the requests
const sendMail = async (req, res) => {
  try {
    const { email } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const subject = "Email_Test_For_microservice";
    const response = await sendEmail(
      file,
      email,
      "this is a test message",
      subject
    );

    res.status(200).json({
      success: true,
      message: `Email sent successfully to: ${email}`,
      response: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || error,
    });
  }
};

// routes for the requests
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "your response is to be sent",
  });
});

// Corrected the route path to /sendmail
app.get("/sendmail", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "home.html"));
});
app.post("/sendmail", upload.single("attachment"), sendMail);

module.exports = app;
