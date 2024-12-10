import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { format, parseISO } from "date-fns";

interface Event {
  _id: string;
  name: string;
  description: string;
  type: string;
  location: {
    area: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  date: string;
  time: string;
  createdBy: string;
  images: string[];
  attendees: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

const MapEvents: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      // Initialize map
      const map = L.map(mapRef.current!).setView([13.7563, 100.5018], 12);

      // Set up tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Custom icon for event markers
      const pinIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Custom icon URL
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -20],
      });

      // Fetch events from the API
      const fetchEvents = async () => {
        try {
          const response = await fetch("/api/dbConnect?type=events"); // Fetch events from your backend
          if (!response.ok) {
            console.error("Failed to fetch events. Status:", response.status);
            return;
          }

          const data = await response.json(); // Parse the JSON response
          console.log("Fetched Events:", data);

          // Loop over the fetched events and add markers to the map
          data.forEach((event: Event) => {
            const { coordinates } = event.location;
            console.log(`Coordinates for ${event.name}:`, coordinates);

            if (!coordinates?.lat || !coordinates?.lng) {
              console.error("Invalid coordinates for event:", event.name);
              return;
            }


            const formattedDate = format(new Date(event.date), 'MMM dd, yyyy')

            // Add marker to the map
            L.marker([coordinates.lat, coordinates.lng], { icon: pinIcon })
              .addTo(map)
              .bindPopup(`
                <b>${event.name}</b><br>
                Location: ${event.location.area}<br>
                Date: ${formattedDate}<br>
                Time: ${event.time}<br>
                
              `);
          });
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };

      fetchEvents(); // Call fetch function to load events
    }
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

export default MapEvents;
