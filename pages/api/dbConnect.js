import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let client;

    try {
      client = await MongoClient.connect(uri);
      const db = client.db('whatsonbkk');
      
      // Get the type of data to fetch from the query parameters
      const { type } = req.query;  // Assuming the query parameter is named 'type'
      
      let data;

      if (type === 'events') {
        // Fetch events if the type is 'events'
        const eventsCollection = db.collection('events');
        data = await eventsCollection.find({}).toArray();
      } else if (type === 'areas') {
        // Fetch areas if the type is 'areas'
        const areasCollection = db.collection('areas');
        data = await areasCollection.find({}).toArray();
      } else {
        // Return a 400 Bad Request if no valid type is provided
        return res.status(400).json({ message: 'Invalid type specified' });
      }

      res.status(200).json(data); // Return the data in JSON format
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    } finally {
      if (client) {
        client.close(); // Ensure the client is always closed
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
