import React from 'react';

const WaitingForDriver = ({ waitingForDriver, ride }) => {
  const captain = ride?.captain;
  const vehicle = captain?.vehicle;

  return (
    <div className="relative w-full max-w-md mx-auto px-5 pt-10 pb-6 bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-t-3xl shadow-2xl text-white border border-yellow-500/20 backdrop-blur-md">
      {/* Drag Handle */}
      <div
        onClick={() => waitingForDriver(false)}
        className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/30 rounded-full cursor-pointer hover:bg-white/50 transition"
      />

      {/* Heading */}
      <h3 className="text-2xl font-bold text-center text-yellow-400 mb-6">
        Waiting for Confirmation
      </h3>

      {/* Captain Info Card */}
      <div className="flex items-center justify-between bg-white/5 border border-yellow-400/20 rounded-xl p-4 mb-6 shadow-inner">
        <img
          className="h-14 w-14 rounded-full object-cover shadow"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Vehicle"
        />
        <div className="text-right">
          <h4 className="text-lg font-semibold capitalize text-white">
            {captain?.fullname?.firstname || 'Captain'}
          </h4>
          <p className="text-yellow-300 text-sm font-medium">{vehicle?.plate}</p>
          <p className="text-xs text-gray-400">{vehicle?.vehicleType || 'Vehicle'}</p>
          <p className="text-green-400 text-base font-semibold mt-1 tracking-widest">
            OTP: {ride?.otp}
          </p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-5 bg-white/5 border border-gray-700/20 rounded-2xl p-5 shadow-inner">
        {/* Pickup */}
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-user-fill text-yellow-300 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Pickup</p>
            <p className="text-base font-medium text-white break-words">{ride?.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-2-fill text-red-400 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Destination</p>
            <p className="text-base font-medium text-white break-words">{ride?.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-start gap-3">
          <i className="ri-wallet-3-line text-green-400 text-xl mt-1" />
          <div>
            <p className="text-sm text-gray-400">Fare</p>
            <p className="text-lg font-bold text-yellow-200">
              ₹{ride?.fare || '--'} <span className="text-xs font-normal">(Cash)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
