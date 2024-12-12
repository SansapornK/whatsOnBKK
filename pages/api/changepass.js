import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import { connectToDatabase } from './mongodb';

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();
    const handlePasswordChange = async (event) => {
      event.preventDefault();
  
      if (password !== rePassword) {
          setError("Passwords do not match!");
          return;
      }
  
      try {
          const response = await fetch('/api/changepass', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  userId: '675af75edffc37e4fa90302b', // Replace with dynamic userId
                  password,
              }),
          });
  
          if (!response.ok) {
              throw new Error('Failed to update password');
          }
  
          console.log('Password changed successfully');
      } catch (error) {
          setError(error.message);
      }
  };
  
    if (req.method === 'POST') {
      const { userId, password } = req.body;

      // Validate input
      if (!userId || !password) {
        return res.status(400).json({ error: 'User ID and Password are required' });
      }

      // Validate and convert userId
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid User ID format' });
      }

      const objectId = new ObjectId(userId);

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update password in database
      const result = await db.collection('user').updateOne(
        { _id: objectId },
        { $set: { password: hashedPassword } }
      );

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'User not found or password not updated' });
      }

      return res.status(200).json({ message: 'Password changed successfully' });
    }
    try {
      const response = await fetch('/api/changepass', { /* API call */ });
  
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Unknown error occurred');
      }
  
      console.log('Password changed successfully');
  } catch (error) {
      setError(error.message);
  }
  
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
