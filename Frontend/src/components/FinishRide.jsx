import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate();

  const endRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        navigate('/captain-home');
      }
    } catch (err) {
      alert('Failed to end ride');
      console.error(err);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto px-5 pt-8 pb-6 bg-gradient-to-b from-neutral-900 via-black to-neutral-900 rounded-t-3xl shadow-2xl text-white border border-yellow-600/20 backdrop-blur-md">
      
      {/* Drag handle / Close */}
      <div
        onClick={() => setFinishRidePanel(false)}
        className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-500/40 rounded-full cursor-pointer"
      />

      {/* Title */}
      <h3 className="text-2xl font-bold text-center text-yellow-400 mb-6">
        Finish This Ride
      </h3>

      {/* Passenger Info */}
      <div className="flex items-center justify-between bg-yellow-400/10 border border-yellow-600/30 rounded-xl p-4 shadow-inner mb-6">
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover shadow-md"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="User"
          />
          <h4 className="text-lg font-semibold capitalize text-white">
            {ride?.user?.fullname?.firstname}
          </h4>
        </div>
        <span className="text-sm text-yellow-300 font-medium">2.2 KM</span>
      </div>

      {/* Ride Details */}
      <div className="space-y-5 bg-yellow-200/5 border border-yellow-700/10 rounded-2xl p-5 shadow-inner">
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-user-fill text-yellow-400 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Pickup</p>
            <p className="text-base font-medium text-white break-words">
              {ride?.pickup}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <i className="ri-map-pin-2-fill text-red-400 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Destination</p>
            <p className="text-base font-medium text-white break-words">
              {ride?.destination}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <i className="ri-wallet-3-line text-green-400 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Fare</p>
            <p className="text-lg font-bold text-yellow-200">
              ₹{ride?.fare} (Cash)
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={endRide}
        className="w-full mt-8 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-all duration-200"
      >
        ✅ Finish Ride
      </button>
    </div>
  );
};

export default FinishRide;
