import { useState } from 'react';

export default function ChangePassword() {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Password validation function
    const validatePassword = (password: string) => {
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handlePasswordChange = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // Clear previous messages
        setError('');
        setSuccess('');

        // Check for password match
        if (password !== rePassword) {
            setError('Passwords do not match!');
            return;
        }

        // Check for password strength
        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and include letters and numbers.');
            return;
        }

        try {
            // Mocked userId, replace with dynamic logic in real scenarios
            const userId = '675af75edffc37e4fa90302b';

            // API call to change password
            const response = await fetch('/api/changepass', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update password');
            }

            // Handle success
            setSuccess('Password changed successfully!');
            setPassword('');
            setRePassword('');
        } catch (error: any) {
            setError(error.message || 'An error occurred while changing the password.');
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="font-[sans-serif]">
                    <h4 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                        Change Password
                    </h4>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handlePasswordChange} className="space-y-6">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                placeholder="Enter password"
                            />
                        </div>
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Re-Password</label>
                            <input
                                type="password"
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                                className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all"
                                placeholder="Re-Enter password"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
