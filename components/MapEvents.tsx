import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Event {
  name: string;
  lat: number;
  lng: number;
  date: string;
  time: string;
  description: string;
}

const MapEvents: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const L = require("leaflet");

      const map = L.map(mapRef.current!).setView([13.7563, 100.5018], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Custom icon for events
      const pinIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -30],
      });

      const events: Event[] = [
        {
          name: "Music Festival",
          lat: 13.7563,
          lng: 100.5018,
          date: "2024-12-15",
          time: "18:00 - 22:00",
          description: "Enjoy live music performances.",
        },
        {
          name: "Art Exhibition",
          lat: 13.7465,
          lng: 100.5320,
          date: "2024-12-18",
          time: "10:00 - 17:00",
          description: "Explore contemporary art.",
        },
        {
          name: "Food Market",
          lat: 13.7649,
          lng: 100.5383,
          date: "2024-12-20",
          time: "11:00 - 22:00",
          description: "Savor street food.",
        },
      ];

      events.forEach((event) => {
        L.marker([event.lat, event.lng], { icon: pinIcon })
          .addTo(map)
          .bindPopup(
            `<b>${event.name}</b><br>Date: ${event.date}<br>Time: ${event.time}<br>Description: ${event.description}`
          );
      });
    }
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

export default MapEvents;
