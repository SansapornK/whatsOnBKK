const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = process.env.MONGODB_URI; // Use environment variable for MongoDB URI
const client = new MongoClient(uri);

async function handler(req, res) {
  if (req.method === 'POST') {
    let { email, password } = req.body;

    try {
      // Decode the password (if URL-encoded in the request body)
      password = decodeURIComponent(password);

      await client.connect();
      const database = client.db('whatsonbkk');
      const usersCollection = database.collection('user');

      // Find user by email
      const user = await usersCollection.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Authentication successful
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error('Error during authentication:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await client.close();
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
