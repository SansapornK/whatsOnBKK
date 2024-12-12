import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let client;

    try {
      client = await MongoClient.connect(uri);
      const db = client.db('whatsonbkk');

      const { type, id } = req.query; // Ensure both 'type' and 'id' are extracted
      let data;

      if (type === 'events') {
        const eventsCollection = db.collection('events');

        if (id) {
          // Case 1: `id` is provided - fetch a single event by ID
          if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid Event ID' });
          }

          const event = await eventsCollection.findOne({ _id: new ObjectId(id) });
          if (!event) {
            return res.status(404).json({ message: 'Event not found' });
          }

          data = event; // Single event data
        } else {
          // Case 2: No `id` provided - fetch all events
          const events = await eventsCollection.find({}).toArray();
          if (events.length === 0) {
            return res.status(404).json({ message: 'No events found' });
          }

          data = events; // Array of all events
        }
      } else if (type === 'areas') {
        // Fetch areas if the type is 'areas'
        const areasCollection = db.collection('areas');
        data = await areasCollection.find({}).toArray();


        
      } else {
        // Return a 400 Bad Request if no valid type or id is provided
        return res.status(400).json({ message: 'Invalid type or missing id' });
      }

      res.status(200).json(data); // Return the data in JSON format
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } finally {
      if (client) {
        await client.close(); // Ensure the client is always closed
      }
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
