import { MongoClient, ObjectId } from "mongodb";
const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method === "POST") {
    let client;

    try {
      client = await MongoClient.connect(uri);
      const db = client.db("whatsonbkk");

      const { id } = req.query; // Event ID from query

      // Validate eventId format
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid event ID format" });
      }

      // Find the event by ID and increment the interest count
      const eventCollection = db.collection("events");
      const event = await eventCollection.findOne({ _id: new ObjectId(id) });

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      // Update the interest count
      const updatedEvent = await eventCollection.updateOne(
        { _id: new ObjectId(id) },
        { $inc: { interestCount: 1 } } // Increment interestCount by 1
      );

      if (updatedEvent.modifiedCount === 0) {
        return res.status(500).json({ message: "Failed to update interest" });
      }

      return res.status(200).json({ message: "Interest updated successfully" });
    } catch (error) {
      console.error("Error updating interest:", error);
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
      if (client) {
        await client.close(); // Ensure the client is always closed
      }
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
