import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { format } from 'date-fns'; // For formatting dates
import { MapPinIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

// Define types for the event data
interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: {
    area: string;
  };
  images?: string[];
  type: string;
}

const EventDetails = () => {
  const router = useRouter();
  const { eventId } = router.query; // Get eventId from the URL
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (eventId) {
      // Fetch event data based on eventId
      fetch(`/api/dbConnect?type=events${eventId}`)
        .then((response) => response.json())
        .then((data) => setEvent(data))
        .catch((error) => console.error('Error fetching event data:', error));
    }
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
      <img
        src={event.images?.[0] || "/placeholder-image.jpg"}
        alt={event.name}
        className="w-full h-80 object-cover rounded-lg mb-4"
      />
      <p className="text-lg mb-4">{event.description}</p>
      <div className="flex items-center text-gray-500 mb-2">
        <MapPinIcon className="h-5 w-5 text-indigo-600 mr-2" />
        <p>{event.location.area}</p>
      </div>
      <div className="flex items-center text-gray-500 mb-2">
        <CalendarIcon className="h-5 w-5 text-indigo-600 mr-2" />
        <p>{format(new Date(event.date), 'MMM dd, yyyy')}</p>
      </div>
      <div className="flex items-center text-gray-500 mb-4">
        <ClockIcon className="h-5 w-5 text-indigo-600 mr-2" />
        <p>{event.time}</p>
      </div>
      {/* Add more event details as necessary */}
    </div>
  );
};

export default EventDetails;
