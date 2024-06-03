import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Invite = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = location.pathname.split('/').pop(); // Extract token from URL path
    console.log(token)
    axios.post(`${import.meta.env.VITE_BASE_URL}/invite/invite-token`, { token })
      .then(response => {
        setEmail(response.data.email);
        setRole(response.data.role);
      })
      .catch(error => {
        setError(error.response.data.message);
        toast.error(error.response.data.message); // Show error message as toast
      });
  }, [location.pathname]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/invite/register`, { token: location.pathname.split('/').pop(), email, password, role });
      toast.success(`${role} has been registered successfully`)
      navigate('/auth/sign-in');
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message); // Show error message as toast
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'role') setRole(value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              readOnly
              className="w-full px-4 py-2 mt-2 border rounded-lg bg-gray-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default Invite;
