import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { MapPinIcon, CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";
import "leaflet/dist/leaflet.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const API_URL = "http://localhost:3001";

interface Event {
  _id: string;
  name: string;
  description: string;
  type: string;
  location?: {
    area: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
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

const EventDetails = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId && typeof eventId === "string") {
      setLoading(true);
      setError(null);

      fetch(`/api/dbConnect?type=events&id=${eventId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch event data");
          }
          return response.json();
        })
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [eventId]);

  useEffect(() => {
    if (event && event.location?.coordinates) {
        const L = require("leaflet");
      // Initialize Leaflet map
      const map = L.map("map", {
        center: [event.location.coordinates.lat, event.location.coordinates.lng],
        zoom: 15,
      });

      // TileLayer for map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Custom icon for event marker
      const pinIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Custom icon URL
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -20],
      });

      // Add marker to map
      L.marker([event.location.coordinates.lat, event.location.coordinates.lng], {
        icon: pinIcon,
      })
        .addTo(map)
        .bindPopup(`
          <strong>${event.name}</strong><br>
          Location: ${event.location.area}<br>
          Date: ${formattedDateStart} ${formattedDateEnd}<br>
          Time: ${event.timeStart} ${event.timeEnd}<br>
        `);
    }
  }, [event]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  const isValidDate = (date: string) => !isNaN(new Date(date).getTime());
  const formattedDateStart = format(new Date(event.dateStart), 'MMM dd, yyyy');
  const formattedDateEnd = format(new Date(event.dateEnd), 'MMM dd, yyyy');
  const formattedTimeStart = event.timeStart || "Time not available";
  const formattedTimeEnd = event.timeEnd || "Time not available";

  const eventLocation = event.location?.area || "Location not available";
  const eventAddress = event.location?.address || "Address not available";

  return (
    <div className="bg-white dark:bg-black">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="relative">
        <div className="px-4 pt-10 mx-auto max-w-7xl md:pt-16">
          <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="md:w-1/2 w-full flex-shrink-0 mb-6 md:mb-0 relative">
              <img
                src={`${API_URL}/public/${event.images?.[0]}`}
                alt={event.name || "Event image"}
                className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                style={{ aspectRatio: "1" }}
              />
              </div>
              <div className="md:w-1/2 w-full p-6 space-y-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 md:text-5xl">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    {event.name || "Event name not available"}
                  </span>
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-400">{event.description || "Description not available"}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPinIcon className="h-5 w-5 text-indigo-600 mr-2" />
                  <p>{eventLocation}</p>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <p>{eventAddress}</p>
                </div>
                <div className="flex items-center text-gray-500 mb-2">
                  <CalendarIcon className="h-5 w-5 text-indigo-600 mr-2" />
                  <p>{formattedDateStart} - {formattedDateEnd}</p>
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <ClockIcon className="h-5 w-5 text-indigo-600 mr-2" />
                  <p>{formattedTimeStart} - {formattedTimeEnd}</p>
                </div>
                <button
                  className="py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                  onClick={() => router.push('/saved')}
                >
                  Saved
                </button>
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Event Location on Map</h2>
              <div id="map" style={{ width: "100%", height: "400px" }} />
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default EventDetails;
