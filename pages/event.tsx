import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { format } from "date-fns";

// Define a TypeScript interface based on the structure of your event document
interface Coordinates {
  lat: number;
  lng: number;
}

interface Location {
  area: string;
  address: string;
  coordinates: Coordinates;
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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]); // Use the Event type here
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]); // Make sure it's an array
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    // Fetch events from the API
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/dbConnect");
        const data: Event[] = await response.json(); // Type the response as Event[]

        if (Array.isArray(data)) {
          setEvents(data);
          setFilteredEvents(data); // Initial display
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // Handle search and filters
  useEffect(() => {
    let filtered = events;

    console.log("Filtering with:", { searchTerm, selectedType, selectedArea });

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((event) => event.type === selectedType);
    }

    if (selectedArea) {
      filtered = filtered.filter(
        (event) => event.location.area === selectedArea
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedType, selectedArea, events]);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Current Events in Bangkok</h1>

        {/* Search and Filter Controls */}
        <div className="mb-6 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="music">Music</option>
            <option value="exhibition">Exhibition</option>
            <option value="festival">Festival</option>
          </select>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Areas</option>
            <option value="Siam">Siam</option>
            <option value="Banglamphu">Banglamphu</option>
            {/* Add more areas as needed */}
          </select>
        </div>

        {/* Event List */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event._id} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{event.name}</h2>
                <p className="text-gray-700">{event.description}</p>
                <p className="text-gray-500 mt-2">{event.location.area}</p>
                <p className="text-gray-500">
                  {format(new Date(event.date), "MMM dd, yyyy")}
                </p>
                <p className="text-gray-500">{event.time}</p>
                <div className="flex gap-2">
                  {Array.isArray(event.images) && event.images.length > 0 ? (
                    event.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Event Image ${idx + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
