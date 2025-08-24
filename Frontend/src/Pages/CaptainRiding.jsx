import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;

  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  // Animate bottom sheet
  useGSAP(() => {
    gsap.to(finishRidePanelRef.current, {
      y: finishRidePanel ? 0 : '100%',
      duration: 0.4,
      ease: 'power3.out',
    });
  }, [finishRidePanel]);

  useEffect(() => {
    const getLatLng = async (address, setter) => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setter({ lat, lng });
        } else {
          console.error('Geocode failed:', data.status);
        }
      } catch (err) {
        console.error('Geocode error:', err);
      }
    };

    if (rideData?.pickup) getLatLng(rideData.pickup, setPickupCoords);
    if (rideData?.destination) getLatLng(rideData.destination, setDestinationCoords);
  }, [rideData]);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-black text-white font-sans">

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 py-4 backdrop-blur-sm bg-black/50 border-b border-white/10">
        <div className="flex items-center gap-2">
          <img src="/image/trippzy.png" alt="Tripzzy" className="h-8" />
          <span className="text-lg font-semibold text-yellow-400">Tripzzy</span>
        </div>
        <Link
          to="/captain-home"
          className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center shadow hover:bg-yellow-300 transition"
        >
          <i className="ri-logout-box-r-line text-lg" />
        </Link>
      </header>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <LiveTracking
          source={pickupCoords}
          destination={destinationCoords}
        />
      </div>

      {/* Ride Info Floating Card */}
      <div
        className="fixed bottom-0 z-20 w-full px-6 pt-6 pb-8 bg-gradient-to-br from-yellow-300/90 to-yellow-400/90 rounded-t-3xl shadow-xl backdrop-blur-xl md:w-[420px] md:bottom-6 md:right-6 md:rounded-2xl"
        onClick={() => setFinishRidePanel(true)}
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-900">📍 4 KM to Destination</h4>
          <button className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded-lg shadow transition">
            Complete Ride
          </button>
        </div>
        <div className="text-sm text-gray-800">
          Tap above to complete your current trip.
        </div>
        <i className="ri-arrow-up-line text-2xl text-black mt-4 mx-auto block text-center" />
      </div>

      {/* Finish Ride Panel (Bottom Sheet) */}
      <div
  ref={finishRidePanelRef}
  className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 translate-y-full w-auto text-white border-t border-yellow-600/20 backdrop-blur-lg px-5 py-10 pt-14 rounded-t-3xl shadow-2xl"
>
  <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;
