import React, { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);

  // Geocode address to lat/lng
  const geocode = async (address) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    );
    const data = await res.json();
    if (data.status === 'OK') {
      return data.results[0].geometry.location;
    } else {
      console.error('Geocoding failed:', address, data.status);
      return null;
    }
  };

  useEffect(() => {
    if (ride?.pickup && ride?.destination) {
      geocode(ride.pickup).then(setPickup);
      geocode(ride.destination).then(setDrop);
    }
  }, [ride]);

  useEffect(() => {
    if (!socket) return;
    const listener = () => navigate('/home');
    socket.on('ride-ended', listener);
    return () => socket.off('ride-ended', listener);
  }, [socket, navigate]);

  if (!ride) return <div className="text-white p-6">Invalid Ride Data</div>;

  return (
    <div className="relative min-h-screen bg-[#0d0f12] text-white font-sans overflow-hidden">
      {/* Header */}
      <header className="absolute top-4 left-0 right-0 z-40 px-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/image/trippzy.png" alt="Tripzzy" className="h-7" />
          <span className="text-lg font-semibold text-yellow-400">Tripzzy</span>
        </div>
        <Link
          to="/home"
          className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-yellow-300"
        >
          <i className="ri-home-5-line text-lg"></i>
        </Link>
      </header>

      {/* Map Section */}
      <section className="mt-20 w-full h-[300px]">
        <LiveTracking source={pickup} destination={drop} />
      </section>

      {/* Ride Info Card */}
      <section className="absolute bottom-0 w-full px-6 py-7 bg-[#16191d] rounded-t-3xl z-30 shadow-2xl border-t border-gray-700">
        {/* Captain Details */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
              {ride?.captain?.fullname?.firstname?.[0] ?? 'C'}
            </div>
            <div>
              <h2 className="text-lg font-semibold capitalize leading-tight">
                {ride?.captain?.fullname?.firstname}
              </h2>
              <p className="text-sm text-gray-400">Maruti Suzuki Alto</p>
            </div>
          </div>
          <div className="text-right leading-tight">
            <p className="text-yellow-300 font-semibold text-sm">
              {ride?.captain?.vehicle?.plate}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {ride?.captain?.vehicle?.vehicleType}
            </p>
          </div>
        </div>

        {/* Ride Details */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex gap-3">
            <i className="ri-map-pin-fill text-lg text-red-500 mt-1"></i>
            <div>
              <p className="text-sm font-medium">Drop</p>
              <p className="text-xs text-gray-400">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <i className="ri-currency-line text-lg text-green-400 mt-1"></i>
            <div>
              <p className="text-sm font-medium">Fare</p>
              <p className="text-xs text-gray-400">₹{ride?.fare ?? '--'} (Cash)</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full py-3 rounded-xl bg-gradient-to-tr from-yellow-400 to-yellow-500 text-black font-semibold text-base shadow hover:shadow-lg transition duration-200">
          Confirm Payment
        </button>
      </section>
    </div>
  );
};

export default Riding;
