import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export default function Header() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check authentication state from localStorage
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication status
    setIsAuthenticated(false); // Update state
    window.location.href = '/signin'; // Redirect to sign-in page
  };

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
            {/* SVG Icon */}
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
            {/* SVG Icon */}
          </button>
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <img
                  src="/images/default-profile.jpg" // Replace with user profile image if available
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 w-40 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg dark:bg-gray-800">
                  <Link
                    href="/editprofile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    href="/saved"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Saved
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="dark:hover:border-gray-500 hover:shadow-md transition duration-300 mr-4 border px-3 py-1.5 rounded dark:text-gray-300">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
