import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CapatainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType
      }
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-md brightness-50" style={{ backgroundImage: `url('/api/placeholder/1920x1080')` }} />
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-8 py-4 text-white shadow-2xl">
        <img className="h-12 mb-6 mx-auto" src="/image/trippzy.png" alt="Tripzzy" />

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">What's our Captain's name</label>
            <div className="flex gap-4">
              <input
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-yellow-400 focus:outline-none"
              />
              <input
                required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">What's our Captain's email</label>
            <input
              required
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Enter Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          {/* Vehicle Info */}
          <div>
            <label className="block text-sm font-medium mb-2">Vehicle Information</label>
            <div className="flex gap-4 mb-4">
              <input
                required
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-yellow-400 focus:outline-none"
              />
              <input
                required
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-yellow-400 focus:outline-none"
              />
            </div>

            <div className="flex gap-4">
              <input
                required
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60 border border-white/30 focus:ring-yellow-400 focus:outline-none"
              />
              <select
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-1/2 px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:ring-yellow-400 focus:outline-none"
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
          >
            Create Captain Account
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{' '}
          <Link to="/captain-login" className="text-yellow-400 hover:underline">
            Login here
          </Link>
        </p>

        <p className="text-[10px] mt-6 text-center leading-tight text-white/60">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;
