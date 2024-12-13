import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('./api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } else {
      alert(data.message || 'Incorrect email or password');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12 px-6">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        {/* Go Back Button */}
        <button 
          onClick={handleGoBack}
          className="text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full font-semibold text-lg mb-6 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Go Back to Home
        </button>

        <h4 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Sign In
        </h4>

        <div className="flex justify-center mb-6">
          <img
            alt="Logo"
            src="/images/logo.png"
            className="h-auto w-auto rounded-full"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="block w-full px-4 py-2 text-base text-gray-900 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="block w-full px-4 py-2 text-base text-gray-900 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div className="text-center">
              <a
                href="/forgotpass"
                className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-all duration-300"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <a
                href="/register"
                className="text-indigo-600 font-medium hover:text-indigo-700 hover:underline transition-all duration-300"
              >
                Don't have an account? <span className="text-indigo-500">Sign up</span>
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
