import dbConnect from './dbConnect'; // Your existing DB connection utility
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  password: String,
});
const User = mongoose.model('user', userSchema);

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    type: String,
    location: {
      area: String,
      address: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    dateStart: String,
    dateEnd: String,
    timeStart: String,
    timeEnd: String,
    images: String, // Array of File objects for image files
});
const Event = mongoose.model('events', eventSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ error: 'User ID and Event ID are required' });
  }

  try {
    await dbConnect();

    // Find the user and update their saved events
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.savedEvents.includes(eventId)) {
      user.savedEvents.push(eventId);
      await user.save();
    }

    res.status(200).json({ message: 'Event saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
