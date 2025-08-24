import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (err) {
      alert('Signup failed. Please try again.');
    }

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Blur */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md brightness-50"
        style={{ backgroundImage: `url('/api/placeholder/1920/1080')` }}
      />
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-8 py-10 text-white shadow-2xl">
        <img className="h-12 mb-6 mx-auto" src="/image/trippzy.png" alt="Tripzzy" />

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="text-sm font-medium block mb-1">What's your name</label>
            <div className="flex gap-3">
              <input
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <input
                required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">What's your email</label>
            <input
              required
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Create a password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">
            Login here
          </Link>
        </p>

        <p className="text-[10px] text-center mt-4 leading-tight text-white/70">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service</span> apply.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
