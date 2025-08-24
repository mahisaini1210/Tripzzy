import React from 'react';

const DeviceListPanel = ({ setVehiclePanel, setShowDeviceList }) => {
  const dummyDevices = [
    { id: 1, name: "Rider A", seats: 2, location: "Downtown" },
    { id: 2, name: "Rider B", seats: 1, location: "University Ave" },
    { id: 3, name: "Rider C", seats: 3, location: "City Center" },
  ];

  const selectDevice = (device) => {
    console.log("Selected Device:", device);
    setShowDeviceList(false);
    setVehiclePanel(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Available Carpools</h3>

      {dummyDevices.map((device) => (
        <button
          key={device.id}
          onClick={() => selectDevice(device)}
          className="w-full text-left border border-gray-300 bg-gray-100 hover:bg-gray-200 transition duration-150 p-4 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-900">{device.name}</p>
              <p className="text-sm text-gray-600">{device.location}</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-600 font-medium">{device.seats} seat{device.seats > 1 ? 's' : ''} available</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default DeviceListPanel;
