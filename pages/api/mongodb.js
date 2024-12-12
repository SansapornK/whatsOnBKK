import { MongoClient } from 'mongodb';

// Replace the URI with your MongoDB connection string
const uri = "mongodb+srv://sansaporn294:2fd2lvC37c53pUE6@whatsonbkk.xki0j.mongodb.net/";

let cachedDb = null;

/**
 * Connect to MongoDB and return the client and database.
 * @returns {Promise<{ client: MongoClient, db: any }>}
 */
export async function connectToDatabase() {
  if (cachedDb) {
    return { client: null, db: cachedDb };
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const dbName = 'whatsonbkk';
  const db = client.db(dbName);

  cachedDb = db;

  return { client, db };
}


