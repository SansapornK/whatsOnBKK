import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { format } from "date-fns";
import Link from "next/link";
import { CalendarIcon, ClockIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';  // Import Heroicons



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
        const response = await fetch("/api/dbConnect?type=events");
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
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Current Events in Bangkok</h1>

        {/* Search and Filter Controls */}
        <div className="mb-6 flex flex-wrap gap-6 justify-center">
          {/* Search Input */}
          <div className="relative w-full sm:w-1/2 md:w-1/3">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-10 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
          </div>
          
          
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
            <option value="Yaowarat">Yaowarat</option>
            <option value="Sukhumvit">Sukhumvit</option>
            <option value="Pathumwan">Pathumwan</option>
            <option value="Talad Plu">Talad Plu</option>
            <option value="Phra Nakhon">Phra Nakhon</option>
            <option value="Silom">Silom</option>
            <option value="Chareonkrung-Talad Noi">Chareonkrung-Talad Noi</option>
            <option value="Chatuchak">Chatuchak</option>
            <option value="Charoennakorn">Charoennakorn</option>
          </select>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div key={event._id} className="group relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img
                    src={event.images?.[0] || "/placeholder-image.jpg"}
                    alt={event.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-0 right-0 p-4 text-white bg-gradient-to-t via-transparent to-transparent rounded-bl-lg">
                    <span className="bg-indigo-600 text-sm font-medium py-1 px-3 rounded">{event.type}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">{event.name}</h2>
                  {/* Event Information with Icons */}
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPinIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <p>{event.location.area}</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <CalendarIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <p>{format(new Date(event.date), 'MMM dd, yyyy')}</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <ClockIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <p>{event.time}</p>
                  </div>

                  {/* See More Link */}
                  <Link href={`/event-details/${event._id}`} legacyBehavior>
                    <a className="text-indigo-600 hover:text-indigo-800 font-medium mt-4 inline-block">
                      See More →
                    </a>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-600 dark:text-gray-400">
              No events found.
            </p>
          )}
        </div>

      </div>
      <Footer />
    </div>
  );
}
