import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

import { connectToDatabase } from './mongodb'; // Ensure your connection utility is set up correctly

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Destructure user details from the request body
      const { firstName, lastName, email, mobile, password } = req.body;

      // Validate incoming data
      if (!firstName || !lastName || !email || !mobile || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Connect to the database
      const { db } = await connectToDatabase();

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      const result = await db.collection('user').insertOne({
        firstName,
        lastName,
        email,
        mobile,
        password: hashedPassword
      });

      // Respond with success
      res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    } catch (error) {
      console.error("Error inserting user data into MongoDB:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
