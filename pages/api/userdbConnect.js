import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { connectToDatabase } from './mongodb';

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

    if (req.method === 'PUT') {
      const { id } = req.query;
      const { firstName, lastName, email, mobile } = req.body;

      if (!id || !firstName || !lastName || !email || !mobile) {
        return res.status(400).json({ error: 'Invalid input data' });
      }

      const updated = await db.collection('user').updateOne(
        { _id: new ObjectId(id) },
        { $set: { firstName, lastName, email, mobile } }
      );

      if (!updated.matchedCount) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json({ message: 'User updated successfully' });
    }

    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error("Error in userdbConnect:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
