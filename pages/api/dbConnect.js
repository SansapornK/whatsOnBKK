import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let client;

    try {
      client = await MongoClient.connect(uri);
      const db = client.db('whatsonbkk');
      const eventsCollection = db.collection('events');

      const events = await eventsCollection.find({}).toArray();

      res.status(200).json(events);
    } catch (error) {
      console.error('Fetching events failed:', error);
      res.status(500).json({ message: 'Fetching events failed', error });
    } finally {
      if (client) {
        client.close(); // Ensure the client is always closed
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
