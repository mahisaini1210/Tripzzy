import React from 'react';

const RidePopUp = ({
  ride,
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  confirmRide,
}) => {
  const passenger = ride?.user?.fullname;

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-6 pt-8 bg-gradient-to-b from-black via-neutral-900 to-neutral-800 rounded-t-3xl shadow-2xl text-white relative border border-yellow-600/20 backdrop-blur-lg">
      {/* Drag Handle */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gray-400/50 rounded-full cursor-pointer"
        onClick={() => setRidePopupPanel(false)}
      />

      {/* Heading */}
      <h3 className="text-xl font-semibold text-center text-yellow-400 mt-6 mb-5">
        New Ride Request
      </h3>

      {/* Passenger Info */}
      <div className="flex items-center gap-4 mb-6 bg-yellow-200/10 p-4 rounded-xl border border-yellow-400/20 shadow-inner">
        <img
          src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
          alt="Passenger"
          className="h-12 w-12 rounded-full object-cover shadow"
        />
        <div>
          <p className="text-lg font-semibold text-white capitalize">
            {passenger?.firstname} {passenger?.lastname}
          </p>
          <p className="text-xs text-gray-400">2.2 KM away</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-5 text-sm">
        <div className="flex items-start gap-3">
          <i className="ri-map-pin-user-fill text-yellow-400 text-xl mt-1" />
          <div>
            <p className="text-gray-400 text-sm">Pickup</p>
            <p className="text-white font-medium break-words">{ride?.pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <i className="ri-map-pin-2-fill text-red-400 text-xl mt-1" />
          <div>
            <p className="text-gray-400 text-sm">Drop</p>
            <p className="text-white font-medium break-words">{ride?.destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <i className="ri-wallet-3-line text-green-400 text-xl mt-1" />
          <div>
            <p className="text-gray-400 text-sm">Fare</p>
            <p className="text-yellow-200 font-bold">₹{ride?.fare} (Cash)</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          onClick={() => {
            setConfirmRidePopupPanel(true);
            confirmRide();
          }}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium shadow-md transition-all duration-200 flex items-center justify-center gap-2"
        >
          <i className="ri-check-line text-lg" /> Accept Ride
        </button>

        <button
          onClick={() => setRidePopupPanel(false)}
          className="w-full py-3 rounded-xl bg-neutral-700/70 hover:bg-neutral-600 text-white font-medium flex items-center justify-center gap-2"
        >
          <i className="ri-close-line text-lg" /> Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
