import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email,
        password
      });

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (err) {
      alert('Invalid credentials');
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Blur + Overlay */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-md brightness-50" style={{ backgroundImage: `url('/api/placeholder/1920/1080')` }} />
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Login Box */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-8 py-10 text-white shadow-2xl">
        <img className="h-12 mb-6 mx-auto" src="/image/trippzy.png" alt="Tripzzy" />

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="text-sm font-medium block mb-1">What's your email</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Enter password</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          New here?{" "}
          <Link to="/signup" className="text-yellow-400 hover:underline">
            Create new Account
          </Link>
        </p>

        <Link
          to="/captain-login"
          className="block mt-6 w-full text-center py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
