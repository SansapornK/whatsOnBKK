import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic'; // Lazy loading for Saved component


const Saved = dynamic(() => import('../pages/saved'), { ssr: false }); // Adjust the path as needed

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSavedModalOpen, setSavedModalOpen] = useState(false); // State for Saved modal
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  

  // Ensure theme functionality is only mounted on the client
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = '/signin';
  };

  const handleChangePassword = () => {
    window.location.href = '/changepass';
  };

  return (
    <header className="w-full sticky-nav">
      <div className="flex flex-col flex-wrap max-w-5xl p-2.5 mx-auto md:flex-row">
        <div className="flex flex-row items-center justify-between p-2 md:p-1">
          <Link href="/">
            <img alt="Your Company" src="/images/logo.png" className="h-auto w-auto" />
          </Link>
          <button
            className="px-3 py-1 pb-4 ml-auto text-black outline-none dark:text-gray-300 md:hidden"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="3" y1="6" y2="6" x2="21" />
              <line x1="3" y1="12" y2="12" x2="21" />
              <line x1="3" y1="18" y2="18" x2="21" />
            </svg>
          </button>
        </div>
        <div className={`md:flex flex-grow items-center ${navbarOpen ? 'flex' : 'hidden'}`}>
          <div className="flex flex-wrap items-center justify-center pt-1 pl-2 ml-1 space-x-8 md:space-x-16 md:mx-auto md:pl-14">
            <Link href="/event">Upcoming Events</Link>
            <Link href="/map">Map</Link>
            <Link href="/about">About Us</Link>
          </div>
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 ml-5 mr-0 bg-gray-200 rounded md:ml-0 md:mr-5 dark:bg-gray-800"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-gray-800 dark:text-gray-200"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <circle cx="12" cy="12" r="5" fill="currentColor" />
                )}
              </svg>
            )}
          </button>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <img
                  src="/images/default-profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 w-40 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800">
                  {/* <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setSavedModalOpen(true); // Open Saved modal
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Saved
                  </button> */}
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/signin"
              className="dark:hover:border-gray-500 hover:shadow-md transition duration-300 mr-4 border px-3 py-1.5 rounded dark:text-gray-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
      {/* Modal for Saved */}
      {isSavedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-screen my-10 overflow-y-auto relative">
            <button
              onClick={() => setSavedModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              ✕
            </button>
            <div>
              <Saved />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
