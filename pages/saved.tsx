import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { CalendarIcon, ClockIcon, MapPinIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

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
  dateStart: string;
  timeStart: string;
  dateEnd: string;
  timeEnd: string;
  createdBy: string;
  images: string[];
  attendees: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function SavedEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    // Fetch saved events from the API
    const fetchSavedEvents = async () => {
      try {
        const response = await fetch("/api/dbConnect?type=user"); // Adjust the endpoint if necessary
        const userData = await response.json();

        if (userData.eventid?.$oid) {
          const eventIds = userData.eventid.$oid;

          // Fetch details for all events in parallel
          const eventPromises = eventIds.map((id: string) =>
            fetch(`/api/dbConnect?type=events&id=${id}`).then((res) => res.json())
          );

          const eventData = await Promise.all(eventPromises);

          const validEvents = eventData.filter((event) => event && event._id); // Filter valid responses
          setEvents(validEvents);
          setFilteredEvents(validEvents);
        }
      } catch (error) {
        console.error("Error fetching saved events:", error);
      }
    };

    fetchSavedEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((event) => event.type === selectedType);
    }

    if (selectedArea) {
      filtered = filtered.filter((event) => event.location.area === selectedArea);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedType, selectedArea, events]);

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">Saved Events</h1>

        {/* Search and Filter Controls */}
        <div className="mb-6 flex flex-wrap gap-6 justify-center">
          {/* Search Input */}
          <div className="relative w-full sm:w-1/2 md:w-1/3">
            <input
              type="text"
              placeholder="Search saved events..."
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
                  <div className="flex items-center text-gray-500 mt-2">
                    <MapPinIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <p>{event.location.area}</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <CalendarIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <p>{format(new Date(event.dateStart), 'MMM dd, yyyy')} - {format(new Date(event.dateEnd), 'MMM dd, yyyy')}</p>
                  </div>
                  <div className="flex items-center text-gray-500 mt-2">
                    <ClockIcon className="h-5 w-5 text-indigo-600 mr-2" />
                    <p>{event.timeStart} - {event.timeEnd}</p>
                  </div>

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
              No saved events found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
