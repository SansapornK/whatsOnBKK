import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { connectToDatabase } from './mongodb';


import { hashPassword } from './utils';

const hashedPassword = await hashPassword(password);


export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    if (req.method === 'GET') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'User ID is required' });
      }

      const user = await db.collection('user').findOne({ _id: new ObjectId(id) });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Exclude sensitive data like password
      const { password, ...userData } = user;
      return res.status(200).json(userData);
    }

    if (req.method === 'POST') {
      const { firstName, lastName, email, mobile, password } = req.body;

      // Validation for required fields
      if (!firstName || !lastName || !email || !mobile || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        firstName,
        lastName,
        email,
        mobile,
        password: hashedPassword,
      };

      const result = await db.collection('user').insertOne(newUser);

      return res.status(201).json({ message: 'User created successfully', userId: result.insertedId });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error in userdbConnect:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
