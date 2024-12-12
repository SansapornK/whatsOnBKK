// dbConnect.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let cachedClient;
let cachedDb;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db('whatsonbkk'); // Replace with your DB name

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export { connectToDatabase };
