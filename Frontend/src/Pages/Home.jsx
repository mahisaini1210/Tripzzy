import React, { useEffect, useRef, useState, useContext } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';

import LiveTracking from '../components/LiveTracking';
import LocationSearchPanel from '../components/LocationSearchPanel';
import RideTypePanel from '../components/RideTypePanel';
import DeviceListPanel from '../components/DeviceListPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);

  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [showRideTypePanel, setShowRideTypePanel] = useState(false);
  const [showDeviceList, setShowDeviceList] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [rideType, setRideType] = useState('solo');
  const [availableSeats, setAvailableSeats] = useState(1);
  const [genderPreference, setGenderPreference] = useState('random');
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const rideTypePanelRef = useRef(null);
  const deviceListPanelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const geocodeAddress = async (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject('Geocode failed: ' + status);
        }
      });
    });
  };

  useEffect(() => {
    if (pickup) {
      geocodeAddress(pickup).then(setPickupCoords).catch(console.error);
    }
  }, [pickup]);

  useEffect(() => {
    if (destination) {
      geocodeAddress(destination).then(setDestinationCoords).catch(console.error);
    }
  }, [destination]);

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id });

    socket.on('ride-confirmed', (r) => {
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(r);
    });

    socket.on('ride-started', (r) => {
      setWaitingForDriver(false);
      navigate('/riding', { state: { ride: r } });
    });

    return () => {
      socket.off('ride-confirmed').off('ride-started');
    };
  }, [socket, user, navigate]);

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    if (!value.trim()) return setPickupSuggestions([]);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value.trim() },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPickupSuggestions(data || []);
    } catch (err) {
      console.error("Error fetching pickup suggestions:", err);
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    if (!value.trim()) return setDestinationSuggestions([]);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: value.trim() },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDestinationSuggestions(data || []);
    } catch (err) {
      console.error("Error fetching destination suggestions:", err);
    }
  };

  const findTrip = () => {
    setShowRideTypePanel(true);
    setPanelOpen(false);
  };

  const createRide = async () => {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType,
      rideType,
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };

  // GSAP Animations
  useGSAP(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '65%' : '0%',
      padding: panelOpen ? 24 : 0,
    });
  }, [panelOpen]);

  useGSAP(() => {
    gsap.to(rideTypePanelRef.current, { yPercent: showRideTypePanel ? 0 : 100 });
  }, [showRideTypePanel]);

  useGSAP(() => {
    gsap.to(deviceListPanelRef.current, { yPercent: showDeviceList ? 0 : 100 });
  }, [showDeviceList]);

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, { yPercent: vehiclePanel ? 0 : 100 });
  }, [vehiclePanel]);

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, { yPercent: confirmRidePanel ? 0 : 100 });
  }, [confirmRidePanel]);

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, { yPercent: vehicleFound ? 0 : 100 });
  }, [vehicleFound]);

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, { yPercent: waitingForDriver ? 0 : 100 });
  }, [waitingForDriver]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white overflow-hidden">
      {/* Left Panel */}
      <div className="w-full md:w-3/5 relative flex flex-col justify-start items-center p-10">
        <div className="w-full h-[500px] mb-6 rounded-xl overflow-hidden border border-slate-700 shadow-xl">
          <LiveTracking source={pickupCoords} destination={destinationCoords} />
        </div>

        <h1 className="text-5xl font-bold mb-4 text-yellow-400">Welcome to Tripzzy</h1>
        <p className="text-lg text-gray-300 text-center max-w-lg">
          Premium ride booking at your fingertips. Enter your trip details to begin your journey with ease and comfort.
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-2/5 p-8 text-white relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-l-3xl shadow-2xl border-l-[5px] border-amber-400">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/');
          }}
          className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          Logout
        </button>

        <h2 className="text-3xl font-bold mb-6 text-amber-400">Book Your Ride</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300">Pick-up Location</label>
            <input
              type="text"
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              className="w-full mt-1 px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              placeholder="Enter your location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              className="w-full mt-1 px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
              placeholder="Enter your destination"
            />
          </div>

          <button
            type="button"
            onClick={findTrip}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold py-3 rounded-lg shadow-lg transition"
          >
            See Prices
          </button>

          <button
            type="button"
            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg border border-slate-600 transition"
          >
            Schedule for Later
          </button>
        </form>

        {panelOpen && (
          <div ref={panelRef} className="mt-6 overflow-hidden">
            <LocationSearchPanel
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        )}
      </div>

      {/* Bottom Panels */}
      <div ref={rideTypePanelRef} className="fixed bottom-0 z-30 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl">
        <RideTypePanel {...{ rideType, setRideType, setShowRideTypePanel, setVehiclePanel, pickup, destination, setFare, availableSeats, genderPreference, setGenderPreference, setAvailableSeats, setShowDeviceList }} />
      </div>

      <div ref={deviceListPanelRef} className="fixed bottom-0 z-20 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl">
        <DeviceListPanel {...{ setVehiclePanel, setShowDeviceList }} />
      </div>

      <div ref={vehiclePanelRef} className="fixed bottom-0 z-10 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl">
        <VehiclePanel {...{ selectVehicle: setVehicleType, fare, setConfirmRidePanel, setVehiclePanel }} />
      </div>

      <div ref={confirmRidePanelRef} className="fixed bottom-0 z-10 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl">
        <ConfirmRide {...{ pickup, destination, fare, vehicleType, createRide, setConfirmRidePanel, setVehicleFound }} />
      </div>

      <div ref={vehicleFoundRef} className="fixed bottom-0 z-10 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl">
        <LookingForDriver {...{ pickup, destination, fare, vehicleType, setVehicleFound }} />
      </div>

      <div ref={waitingForDriverRef} className="fixed bottom-0 z-10 w-full px-6 py-10 text-white rounded-t-3xl shadow-lg backdrop-blur-md bg-gradient-to-br from-slate-800/80 to-slate-900/90 border border-slate-700 md:w-2/5 md:right-0 md:rounded-l-3xl">
        <WaitingForDriver {...{ ride, waitingForDriver, setWaitingForDriver, setVehicleFound }} />
      </div>
    </div>
  );
};

export default Home;
