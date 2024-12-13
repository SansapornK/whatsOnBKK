import { useState, useEffect } from 'react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Invalid token');
    }
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (password !== rePassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('/api/changepass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update password');
        return;
      }

      setMessage('Password changed successfully!');
    } catch (error) {
      setError('Failed to update password');
    }
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <form onSubmit={handlePasswordChange}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
