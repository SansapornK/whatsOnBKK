import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "./dbConnect"; // Adjust the import based on your file structure

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ message: "Event ID is required" });
  }

  try {
    const { db } = await connectToDatabase();
    const usersCollection = db.collection('users');
    const user_id = session.user.id; // Adjust to correctly access user ID

    const savedCollection = db.collection("saved");

    // Check if the event is already saved for this user
    const existingSave = await savedCollection.findOne({ user_id, eventId });
    if (existingSave) {
      return res.status(400).json({ message: "Event is already saved" });
    }

    // Save the event for the user
    await savedCollection.insertOne({
      user_id,
      eventId,
      savedAt: new Date(),
    });

    // Update user's saved events
    await usersCollection.updateOne(
      { _id: user_id },  // Ensure you're using the correct user id
      { $addToSet: { savedEvents: eventId } } // Change to a correct field if necessary
    );

    // Fetch updated saved events for the user to show in saved section
    const updatedUser = await usersCollection.findOne({ _id: user_id });
    const savedEvents = updatedUser.savedEvents; // Assuming you store event ids in 'savedEvents' array

    res.status(200).json({ message: 'Event saved successfully', savedEvents });
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ message: 'Error saving event' });
  }
}
