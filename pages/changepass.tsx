import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Invalid or missing token.');
    }
  }, []);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError('Invalid or missing token.');
      return;
    }

    if (password !== rePassword) {
      setError('Passwords do not match!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/changepass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update password.');
        setIsLoading(false);
        return;
      }

      setMessage('Password changed successfully!');
      setError('');
      setIsLoading(false);

      // Redirect to the desired page after successful password reset
      setTimeout(() => router.push('/signin'), 1000);
    } catch (error) {
      setError('An error occurred while updating the password. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.back()}
            className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
            aria-label="Go back"
          >
            &larr; Back
          </button>
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-4">Reset Your Password</h1>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center mb-4">{message}</p>}

        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="New Password"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Confirm New Password"
            required
          />
          <button
            type="submit"
            className={`w-full py-3 ${
              isLoading ? 'bg-gray-400' : 'bg-indigo-600'
            } text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
}