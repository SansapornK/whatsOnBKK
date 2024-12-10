import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Location {
  city: string;
  country: string;
}

interface Event {
  _id: string;
  name: string;
  description: string;
  type: string;
  location: Location;
  date: string; // MongoDB stores date as a string in ISO format
  time: string;
  createdBy: string; // Assuming createdBy is an ObjectId
  images: string[]; // Array of image URLs
  attendees: string[]; // Array of attendee ObjectIds
  isPublic: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export default function EventPreview() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to truncate the description
  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/dbConnect?type=events"); // Assuming the API endpoint for events
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data: Event[] = await response.json();
        setEvents(data); // Save the fetched events to the state
      } catch (error) {
        setError("Error fetching events.");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8 text-lg text-gray-600 dark:text-gray-400">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-lg text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <section className="pb-10" id="eventpreview">
      <div className="px-4 pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Event preview section */}
        <div className="mt-12 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 md:text-6xl">
              Upcoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Events
              </span>
            </h1>
            <Link href="/event" legacyBehavior>
              <a className="inline-flex items-center px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-800 transition duration-300 shadow-md">
                View All Events
              </a>
            </Link>
          </div>

         {/* Render events */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).length > 0 ? ( // Limit to the first 3 events
              events.slice(0, 3).map((event) => (
                <div
                  key={event._id}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                  <img
                    src={event.images?.[0] || "/placeholder-image.jpg"} // Use event image or placeholder
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.name}
                    </h3>
                    <p className="text-gray-700 mb-4">
                      {truncateText(event.description, 100)} {/* Truncate description */}
                    </p>
                    <Link href={`/event-details/${event._id}`} legacyBehavior>
                      <a className="text-indigo-600 hover:text-indigo-800 font-medium">
                        See More →
                      </a>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-lg text-gray-600 dark:text-gray-400">
                No events available at the moment.
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
