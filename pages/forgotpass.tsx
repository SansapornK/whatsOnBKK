import React, { useState } from 'react';

export default function ForgotPass() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        setError('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred. Please try again.');
        setMessage('');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to send reset email. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h4 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Forgot Password
        </h4>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-white hover:bg-indigo-500"
          >
            Send
          </button>
        </form>
        {message && <p className="mt-5 text-center text-green-500">{message}</p>}
        {error && <p className="mt-5 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
}
