import React from 'react';

const DiscoverBangkokAreas: React.FC = () => {
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
          Immerse yourself in the pulse of Bangkok. Whether you're looking for a lively street scene, cultural gems, or peaceful riverside escapes, there’s something for everyone. Stay updated with events and get personalized alerts based on your interests and location.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Yaowarat (Chinatown) */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translate-y-4">
            <a href="https://unsplash.com/photos/eG4A4gk1ZJY" target="_blank" rel="noreferrer">
              <img
                className="w-full h-60 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                src="/images/China-Town-Bangkok.jpg"
                alt="Chinatown Bangkok"
              />
            </a>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-2xl font-semibold">Yaowarat (Chinatown)</h2>
              <p className="text-sm mt-2">
                Delve into the vibrant culture, culinary wonders, and rich history of Chinatown. From street food feasts to traditional festivals, there’s always something exciting happening.
              </p>
            </div>
          </div>

          {/* Khao San Road */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translate-y-4">
            <a href="https://unsplash.com/photos/FL-5Y95f6xA" target="_blank" rel="noreferrer">
              <img
                className="w-full h-60 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                src="/images/khao-san-road.jpg"
                alt="Khao San Road"
              />
            </a>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-2xl font-semibold">Khao San Road</h2>
              <p className="text-sm mt-2">
                Experience the bustling energy of Khao San Road, where cultural fusion meets vibrant nightlife. Perfect for those seeking adventure and unique street performances.
              </p>
            </div>
          </div>

          {/* Sukhumvit Area */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translate-y-4">
            <a href="https://unsplash.com/photos/5HgKXyCpG-8" target="_blank" rel="noreferrer">
              <img
                className="w-full h-60 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                src="/images/sukhumvit-area.jpg"
                alt="Sukhumvit Area"
              />
            </a>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-2xl font-semibold">Sukhumvit Area</h2>
              <p className="text-sm mt-2">
                Sukhumvit is where modern luxury meets authentic street life. Enjoy shopping malls, gourmet dining, and trendy bars, all while discovering pop-up events and live shows.
              </p>
            </div>
          </div>

          {/* Asiatique The Riverfront */}
          <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:translate-y-4">
            <a href="https://unsplash.com/photos/Fu_w7C5gr3s" target="_blank" rel="noreferrer">
              <img
                className="w-full h-60 object-cover transition-transform duration-700 ease-in-out transform hover:scale-110"
                src="/images/asiatique.jpg"
                alt="Asiatique The Riverfront"
              />
            </a>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-2xl font-semibold">Asiatique The Riverfront</h2>
              <p className="text-sm mt-2">
                Relax by the river and explore riverside shopping, dining, and entertainment at Asiatique. Ideal for families and couples looking for a serene escape with stunning views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverBangkokAreas;
