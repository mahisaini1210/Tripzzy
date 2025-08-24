import React from 'react';

const vehicleImages = {
  car: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
  moto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
  auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
};

const LookingForDriver = ({ pickup, destination, fare, vehicleType, setVehicleFound }) => {
  const vehicleImg = vehicleImages[vehicleType] || vehicleImages.car;

  return (
    <div className="relative w-full h-full max-w-md mx-auto px-6 py-8 bg-gradient-to-br from-[#1b1c2e] via-[#1f2137] to-[#1b1c2e] text-white rounded-3xl shadow-2xl border border-[#2c2e4a]">
      {/* Close Button */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={() => setVehicleFound(false)}
      >
        <i className="ri-arrow-down-wide-line text-3xl text-gray-400 hover:text-yellow-300 transition-all" />
      </div>

      {/* Title */}
      <h2 className="text-center text-2xl font-bold text-yellow-400 mt-6 mb-6 tracking-wide">
        Searching for a Driver...
      </h2>

      {/* Vehicle Image */}
      <div className="flex justify-center mb-5">
        <img
          src={vehicleImg}
          alt={vehicleType}
          className="h-24 rounded-xl shadow-md border border-slate-700"
        />
      </div>

      {/* Trip Details */}
      <div className="space-y-5">
        {/* Pickup */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
          <i className="ri-map-pin-user-fill text-yellow-300 text-xl mt-1" />
          <div>
            <p className="text-xs uppercase text-gray-400 tracking-wider mb-1">Pick-up</p>
            <p className="text-base font-medium text-white">{pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
          <i className="ri-map-pin-2-fill text-yellow-300 text-xl mt-1" />
          <div>
            <p className="text-xs uppercase text-gray-400 tracking-wider mb-1">Destination</p>
            <p className="text-base font-medium text-white">{destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700">
          <i className="ri-currency-line text-yellow-300 text-xl mt-1" />
          <div>
            <p className="text-xs uppercase text-gray-400 tracking-wider mb-1">Fare</p>
            <p className="text-base font-semibold text-white">
              ₹{fare?.[vehicleType] || '---'}{' '}
              <span className="text-sm text-gray-400 font-normal">(Cash)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Animated Status */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400 italic animate-pulse">
          Looking for nearby drivers...
        </p>
        <div className="flex justify-center mt-3 space-x-2">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-yellow-600 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
