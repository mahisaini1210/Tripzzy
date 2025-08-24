import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmRidePopUp = ({
  ride,
  setRidePopupPanel,
  setConfirmRidePopupPanel,
}) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: ride._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        setConfirmRidePopupPanel(false);
        setRidePopupPanel(false);
        navigate('/captain-riding', { state: { ride } });
      }
    } catch (err) {
      alert('Invalid OTP or failed to start ride');
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto px-4 pt-8 pb-6 bg-gradient-to-b from-black via-neutral-900 to-neutral-800 rounded-t-3xl shadow-2xl text-white border border-yellow-600/20 backdrop-blur-lg">
      {/* Drag Handle */}
      <div
        onClick={() => setRidePopupPanel(false)}
        className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-400/60 rounded-full cursor-pointer"
      />

      {/* Heading */}
      <h3 className="text-xl font-semibold text-center text-yellow-400 mb-6">
        Confirm Ride Start
      </h3>

      {/* Rider Info */}
      <div className="flex items-center gap-4 mb-6 bg-yellow-100/10 border border-yellow-500/20 p-4 rounded-xl shadow-inner">
        <img
          className="h-12 w-12 rounded-full object-cover shadow"
          src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
          alt="Rider"
        />
        <div>
          <h4 className="text-lg font-semibold capitalize text-white">
            {ride?.user?.fullname?.firstname}
          </h4>
          <p className="text-sm text-gray-400">2.2 KM away</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-5 mb-6 bg-white/5 border border-yellow-500/20 p-5 rounded-2xl shadow-lg">
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-user-fill text-yellow-300 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Pickup</p>
            <p className="text-base font-medium text-white break-words">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <i className="ri-map-pin-2-fill text-red-400 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Destination</p>
            <p className="text-base font-medium text-white break-words">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <i className="ri-wallet-3-line text-green-300 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Fare</p>
            <p className="text-lg font-bold text-yellow-200">₹{ride?.fare} (Cash)</p>
          </div>
        </div>
      </div>

      {/* OTP Input & Actions */}
      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-5 py-3 rounded-xl bg-neutral-800/80 text-white border border-gray-500 placeholder:text-gray-400 font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter OTP to start ride"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold transition-all duration-200 shadow-md"
        >
          Start Ride
        </button>

        <button
          type="button"
          onClick={() => {
            setConfirmRidePopupPanel(false);
            setRidePopupPanel(false);
          }}
          className="w-full py-3 rounded-xl bg-neutral-700/70 hover:bg-neutral-600 text-white font-medium shadow-md"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default ConfirmRidePopUp;
