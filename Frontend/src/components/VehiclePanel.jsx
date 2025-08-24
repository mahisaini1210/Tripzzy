import React from 'react';

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel, selectVehicle, fare }) => {
  const vehicles = [
    {
      type: 'car',
      name: 'UberGo',
      capacity: 4,
      wait: '2 mins away',
      desc: 'Affordable, compact rides',
      img: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
      price: fare?.car || 0,
    },
    {
      type: 'moto',
      name: 'Moto',
      capacity: 1,
      wait: '3 mins away',
      desc: 'Affordable motorcycle rides',
      img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
      price: fare?.moto || 0,
    },
    {
      type: 'auto',
      name: 'UberAuto',
      capacity: 3,
      wait: '3 mins away',
      desc: 'Affordable Auto rides',
      img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
      price: fare?.auto || 0,
    }
  ];

  return (
    <div className="w-full bg-gradient-to-br from-black to-neutral-900 px-5 py-6 rounded-t-3xl shadow-xl text-white">
      <button
        className="text-3xl text-yellow-400 hover:text-yellow-300 absolute top-3 left-1/2 transform -translate-x-1/2"
        onClick={() => setVehiclePanel(false)}
      >
        <i className="ri-arrow-down-wide-line"></i>
      </button>

      <h3 className="text-2xl font-bold text-center text-yellow-400 mt-10 mb-6">Choose Your Ride</h3>

      {vehicles.map((vehicle) => (
        <div
          key={vehicle.type}
          onClick={() => {
            setConfirmRidePanel(true);
            setVehiclePanel(false);
            selectVehicle(vehicle.type);
          }}
          className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-yellow-600 rounded-xl p-4 mb-4 backdrop-blur transition-all cursor-pointer"
        >
          <img src={vehicle.img} alt={vehicle.name} className="h-16 w-24 rounded-md object-cover shadow" />
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-yellow-300">
              {vehicle.name}
              <span className="ml-2 text-sm text-white">
                <i className="ri-user-3-fill"></i> {vehicle.capacity}
              </span>
            </h4>
            <p className="text-sm text-gray-300">{vehicle.wait}</p>
            <p className="text-xs text-gray-500">{vehicle.desc}</p>
          </div>
          <h2 className="text-xl font-bold text-yellow-300">₹{vehicle.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default VehiclePanel;
