import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Saved from '../pages/saved'; // Adjust the path as needed


export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSavedModalOpen, setSavedModalOpen] = useState(false); // State for Saved modal
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    window.location.href = '/signin';
  };

  const handleChangepassword = () => {
    window.location.href = '/changepass';
  }



  return (
    <header className="w-full sticky-nav">
      <div className="flex flex-col flex-wrap max-w-5xl p-2.5 mx-auto md:flex-row">
        <div className="flex flex-row items-center justify-between p-2 md:p-1">
          <Link href="/">
            <img alt="Your Company" src="/images/logo.png" className="h-40 w-42" />
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
            <Link href="/editprofile">About Us</Link>
          </div>
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 p-3 ml-5 bg-gray-200 rounded dark:bg-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              className="w-4 h-4 text-gray-800 dark:text-gray-200"
            >
              {/* Dark/Light Mode Icon */}
            </svg>
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
                  <button 
                  onClick={handleChangepassword}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Change Password</button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setSavedModalOpen(true); // Open Saved modal
                    }}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Saved
                  </button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-screen my-10 overflow-y-auto relative">
          {/* <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-8">Saved Events</h2> */}
          <button
            onClick={() => setSavedModalOpen(false)}
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
          <div>
            {/* Render the Saved component dynamically */}
            <Saved />
          </div>
        </div>
      </div>
      
      )}
    </header>
  );
}
