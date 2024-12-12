const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB Setup
mongoose.connect('mongodb+srv://sansaporn294:2fd2lvC37c53pUE6@whatsonbkk.xki0j.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  password: String,
  resetToken: String,
  resetTokenExpiry: Date,
});

const User = mongoose.model('user', userSchema);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Nodemailer Transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'd8spch@gmail.com', // Use your email
    pass: 'rzuq kbja fmsn embf', // Generate an App Password from Gmail
  },
});

// Forgot Password Endpoint
app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

    // Save token and expiry to user
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Construct Reset URL
    const resetUrl = `http://localhost:3000/changepass?token=${resetToken}`;

    // Send Email
    const mailOptions = {
      from: 'd8spch@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>If you did not request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error in forgot-password:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
