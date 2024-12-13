import { useState } from 'react';
import axios from 'axios';

export default function User() {
  const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    number: '',
    password: '',
    cpassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    lname: '',
    email: '',
    number: '',
    password: '',
    cpassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};

    // Basic validation logic
    if (!formData.name) newErrors.name = "First Name is required.";
    if (!formData.lname) newErrors.lname = "Last Name is required.";
    
    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Mobile number validation
    if (!formData.number) newErrors.number = "Mobile Number is required.";

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // Confirm password validation
    if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    // If no errors, proceed with API call
    if (Object.keys(newErrors).length === 0) {
      try {
        // Prepare the user data for submission
        const newUser = {
          firstName: formData.name,
          lastName: formData.lname,
          email: formData.email,
          mobile: formData.number,
          password: formData.password,
        };

        // Send data to the API
        await axios.post('/api/register', newUser);

        alert("Registration successful!");
        window.location.href = '/signin';
      } catch (error) {
        console.error("Error registering user:", error);
        alert("There was an error creating your account. Please try again.");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 rounded-md space-y-6">
      <div className="font-[sans-serif] text-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center min-h-[160px]">
          <button onClick={() => window.history.back()} className="rounded-full p-2 text-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Go back">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h4 className="sm:text-3xl text-2xl font-bold text-white">Create your account</h4>
        </div>
        
        <form className="max-w-4xl mx-auto bg-white shadow-lg sm:p-8 p-4 rounded-md">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">First Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-black"
                placeholder="First Name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
              <input
                type="text"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-black"
                placeholder="Last Name"
              />
              {errors.lname && <p className="text-red-500 text-xs mt-1">{errors.lname}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-black"
              placeholder="Email Address"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">Mobile Number</label>
            <input
              type="text"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-black"
              placeholder="Mobile Number"
            />
            {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
          </div>

          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-black"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              value={formData.cpassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-black"              
              placeholder="Confirm Password"
            />
            {errors.cpassword && <p className="text-red-500 text-xs mt-1">{errors.cpassword}</p>}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full px-6 py-3 mt-6 flex items-center justify-center rounded-md text-white text-sm tracking-wider font-semibold border-none outline-none bg-indigo-500 hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300 active:scale-95 transition duration-300 ease-in-out"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
