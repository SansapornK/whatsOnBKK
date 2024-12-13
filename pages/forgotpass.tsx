import { useState } from 'react';

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forgotpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Email sent. Please check your inbox.');
        setError('');
      } else {
        setError(data.message || 'An error occurred. Please try again.');
        setMessage('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to send reset email. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => window.history.back()}
            className="text-sm text-indigo-600 hover:text-indigo-800 focus:outline-none"
          >
            &larr; Back
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-4 py-2 text-base text-gray-900 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
          >
            Send
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-500 font-medium">{message}</p>
        )}
        {error && (
          <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
