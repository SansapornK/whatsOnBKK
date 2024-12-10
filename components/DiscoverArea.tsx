import React, { useEffect, useState } from 'react';

interface Area {
  _id: string;  // MongoDB ObjectId
  name: string;
  description: string;
  image_url: string;
  link_url: string;
}

const DiscoverBangkokAreas: React.FC = () => {
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('/api/dbConnect?type=areas'); // Include the type query parameter
        if (!response.ok) {
          throw new Error('Failed to fetch areas');
        }
        const data = await response.json();
        console.log(data);  // Log the full API response to ensure it has areas
        setAreas(data);  // Directly use the fetched data
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 dark:text-red-400">Error: {error}</p>;
  }

  return (
    <section id="discover-bangkok-areas" className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-extrabold text-center text-gray-900 md:text-4xl dark:text-gray-100">
          <span className="text-transparent bg-clip-text bg-gradient-to-r dark:bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 dark:from-green-400 dark:via-yellow-400 dark:to-red-400">
            Explore the Heart of Bangkok:
          </span>
          <br />
          Discover Hidden Gems and Iconic Areas
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Immerse yourself in the pulse of Bangkok. Whether you're looking for a lively street scene, cultural gems, or peaceful riverside escapes, there’s something for everyone.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {areas.length > 0 ? (
            areas.map((area) => (
              <div
                key={area._id}
                className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translate-y-4"
              >
                <a href={area.link_url} target="_blank" rel="noreferrer">
                  <img
                    className="w-full h-60 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                    src={area.image_url}
                    alt={area.name}
                  />
                </a>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
                  <h2 className="text-2xl font-semibold">{area.name}</h2>
                  <p className="text-sm mt-2">{area.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400">No areas found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiscoverBangkokAreas;
