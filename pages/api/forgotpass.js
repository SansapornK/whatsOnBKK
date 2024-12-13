import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid'; // For generating unique tokens
import { connectToDatabase } from './mongodb';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        // Connect to the database
        const { db } = await connectToDatabase();

        // Check if the user exists
        const user = await db.collection('user').findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Generate a token and expiry date
        const resetToken = uuidv4(); // Unique token
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        // Update user record with token and expiry
        await db.collection('user').updateOne(
            { email },
            {
                $set: {
                    resetToken,
                    resetTokenExpiry,
                },
            }
        );

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'panttpa1@gmail.com',
                pass: 'plcp xwqg dsgx cija', // Replace with your app password
            },
        });

        const mailOptions = {
            from: 'panttpa1@gmail.com',
            to: email,
            subject: 'Reset your password',
            html: `
                <p>Click the link below to reset your password:</p>
                <p><a href="http://localhost:3000/changepass?token=${resetToken}">Reset Password</a></p>
                <p>This link will expire in 1 hour.</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Reset email sent successfully!' });
    } catch (error) {
        console.error('Error in forgot-password handler:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}



// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const crypto = require('crypto');
// const bcrypt = require('bcrypt');

// const app = express();
// app.use(bodyParser.json());

// // MongoDB connection setup
// mongoose.connect('mongodb://localhost:27017/whatsonbkk', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // Define User Schema for MongoDB (with resetToken and resetTokenExpiry)
// const userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, required: true, unique: true },
//   mobile: String,
//   password: String,
//   confirmPassword: String,
//   eventid: [mongoose.Schema.Types.ObjectId],
//   resetToken: String,
//   resetTokenExpiry: Date,
// });

// const User = mongoose.model('User', userSchema);

// // Set up the mail transport
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'panttpa1@gmail.com',
//     pass: 'plcp xwqg dsgx cija', // Use app password
//   },
// });

// // Function to send email with the reset password link
// const sendEmail = (email, token) => {
//   const encodedToken = encodeURIComponent(token); // Encode token for safe URL usage
//   const mailOptions = {
//     from: 'panttpa1@gmail.com',
//     to: email,
//     subject: 'Reset your password',
//     html: `
//       <p>Click the link below to reset your password:</p>
//       <p><a href="http://localhost:3000/changepass?token=${encodedToken}">Reset Password</a></p>
//     `,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log('Error sending email:', error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

// // Function to generate reset token
// const generateToken = () => {
//   return crypto.randomBytes(32).toString("hex"); // Create a random token for password reset
// };

// // Forgot password route
// app.post("/forgotpass", (req, res) => {
//   const { email } = req.body;

//   // Check if email exists in MongoDB
//   User.findOne({ email }, (err, user) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error checking email.' });
//     }

//     if (!user) {
//       return res.status(400).json({ message: 'Email not found.' });
//     }

//     // Generate token
//     const token = generateToken();

//     // Set token expiry to 24 hours
//     const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token expires in 24 hours

//     // Update the resetToken and resetTokenExpiry in MongoDB
//     User.updateOne(
//       { email },
//       { 
//         $set: { 
//           resetToken: token, 
//           resetTokenExpiry: expiryDate 
//         }
//       },
//       (err) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error updating token.' });
//         }

//         // Send the reset password email
//         sendEmail(email, token);
//         res.status(200).json({ message: 'Please check your email to reset your password.' });
//       }
//     );
//   });
// });

// // Password reset route (to handle the actual password change)
// app.post("/changepass", (req, res) => {
//   const { token, newPassword } = req.body;

//   // Validate the token
//   if (!token || token.length !== 64) {
//     return res.status(400).json({ message: 'Invalid token format.' });
//   }

//   // Verify token and check expiry
//   User.findOne({ resetToken: token, resetTokenExpiry: { $gt: new Date() } }, (err, user) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error verifying the token.' });
//     }

//     if (!user) {
//       return res.status(400).json({ message: 'Token is invalid or expired.' });
//     }

//     // Hash the new password
//     bcrypt.genSalt(10, (err, salt) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error generating salt.' });
//       }

//       bcrypt.hash(newPassword, salt, (err, hashedPassword) => {
//         if (err) {
//           return res.status(500).json({ message: 'Error hashing the password.' });
//         }

//         // Update the password in MongoDB
//         User.updateOne(
//           { resetToken: token },
//           { 
//             $set: { 
//               password: hashedPassword, 
//               resetToken: null, 
//               resetTokenExpiry: null 
//             }
//           },
//           (err) => {
//             if (err) {
//               return res.status(500).json({ message: 'Error updating the password.' });
//             }

//             res.status(200).json({ message: 'Your password has been successfully reset!' });
//           }
//         );
//       });
//     });
//   });
// });

