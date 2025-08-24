import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';

import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CapatainContext';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  // ✅ Update captain location when captain ID is available
  useEffect(() => {
    if (!captain?._id) return;

    console.log("Joining as captain:", captain._id);
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const locationData = {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          };

          console.log("Sending location update:", locationData);
          socket.emit('update-location-captain', locationData);
        }, (error) => {
          console.warn("Geolocation error:", error.message);
        });
      } else {
        console.warn("Geolocation is not supported.");
      }
    };

    const interval = setInterval(updateLocation, 10000);
    updateLocation(); // trigger once on mount

    return () => clearInterval(interval);
  }, [captain?._id]); // ✅ dependency added

  // Listen for ride requests
  useEffect(() => {
    socket.on('new-ride', (data) => {
      setRide(data);
      setRidePopupPanel(true);
    });

    return () => {
      socket.off('new-ride');
    };
  }, []);

  const confirmRide = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    setRidePopupPanel(false);
    setConfirmRidePopupPanel(true);
  };

  // Animations
  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [ridePopupPanel]);

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
      duration: 0.4,
      ease: 'power2.out',
    });
  }, [confirmRidePopupPanel]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 text-white overflow-hidden">
      {/* Left Panel */}
      <div className="w-full md:w-3/5 relative flex flex-col justify-center items-center p-10">
        <div className="w-full h-[400px] mb-6 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="Live Tracking"
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-yellow-400">Welcome Captain</h1>
        <p className="text-lg text-gray-300 text-center max-w-xl">
          Stay online, receive rides, and start earning instantly. This is your control center on Tripzzy.
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-2/5 px-6 py-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-l-3xl shadow-2xl relative">
        <div className="absolute top-5 right-5 flex items-center gap-4">
          <img src="/image/trippzy.png" alt="Tripzzy" className="h-10" />
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/');
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Logout
          </button>
        </div>
        <div className="mt-16">
          <CaptainDetails />
        </div>
      </div>

      {/* Ride Popup */}
      <div
        ref={ridePopupPanelRef}
        className="fixed bottom-0 z-30 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl"
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed bottom-0 z-40 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl"
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
