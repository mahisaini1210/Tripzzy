import React from 'react';

const ConfirmRide = ({
  pickup,
  destination,
  fare,
  vehicleType,
  setConfirmRidePanel,
  setVehicleFound,
  createRide,
}) => {
  const vehicleImages = {
    car: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
    moto:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
    auto:
      'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
  };

  const vehicleImg = vehicleImages[vehicleType];

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-6 pt-8 bg-gradient-to-b from-black via-neutral-900 to-neutral-800 rounded-t-3xl shadow-2xl text-white relative">
      {/* Handle */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-yellow-600/80 rounded-full cursor-pointer"
        onClick={() => setConfirmRidePanel(false)}
      />

      {/* Heading */}
      <h3 className="text-2xl font-bold text-center text-yellow-400 mt-6 mb-6">
        Confirm Your Ride
      </h3>

      {/* Info Card */}
      <div className="bg-white/5 border border-yellow-600/30 backdrop-blur-md rounded-2xl p-5 space-y-6 shadow-lg">
        {/* Selected Vehicle with Image */}
        <div className="flex items-center gap-4">
          {vehicleImg && (
            <img
              src={vehicleImg}
              alt={vehicleType}
              className="h-12 w-16 object-contain rounded-md shadow-md"
            />
          )}
          <div>
            <p className="text-sm text-gray-400 capitalize">Selected Vehicle</p>
            <h4 className="text-lg font-semibold text-yellow-200 capitalize">
              {vehicleType || '—'}
            </h4>
          </div>
        </div>

        {/* Pickup */}
        <div className="flex items-start gap-4">
          <i className="ri-map-pin-user-fill text-xl text-green-400 mt-1" />
          <div>
            <p className="text-sm text-gray-400">Pickup</p>
            <p className="text-base font-medium text-white break-words">{pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-4">
          <i className="ri-map-pin-2-fill text-xl text-cyan-400 mt-1" />
          <div>
            <p className="text-sm text-gray-400">Destination</p>
            <p className="text-base font-medium text-white break-words">{destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-4">
          <i className="ri-wallet-3-line text-xl text-yellow-300 mt-1" />
          <div>
            <p className="text-sm text-gray-400">Estimated Fare</p>
            <p className="text-lg font-bold text-yellow-200">
              ₹{fare?.[vehicleType] || '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          setVehicleFound(true);
          setConfirmRidePanel(false);
          createRide();
        }}
        className="w-full mt-8 bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold py-3 rounded-xl shadow-md transition-all duration-200"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
