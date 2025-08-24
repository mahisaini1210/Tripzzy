import React, { useState } from 'react';
import axios from 'axios';

const RideTypePanel = ({
    rideType,
    setRideType,
    setShowRideTypePanel,
    setVehiclePanel,
    setShowDeviceList,
    pickup,
    destination,
    setFare,
    genderPreference,
    setGenderPreference
}) => {
    const [loading, setLoading] = useState(false);

    const handleRideTypeSelect = async (selectedType) => {
        if (loading) return;

        if (!pickup || !destination) {
            alert("Please enter both pickup and destination locations");
            return;
        }

        if (selectedType === 'carpool' && !genderPreference) {
            alert("Please select a gender preference before continuing.");
            return;
        }

        setLoading(true);
        try {
            setRideType(selectedType);

            const endpoint = selectedType === 'carpool' ? 'carPoolFare' : 'get-fare';

            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/${endpoint}`,
                {
                    params: {
                        pickup,
                        destination,
                        rideType: selectedType,
                        ...(selectedType === 'carpool' && {
                            availableSeats: 3,
                            genderPreference
                        })
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            setFare(response.data);
            setShowRideTypePanel(false);

            if (selectedType === 'carpool') {
                setShowDeviceList(true);
            } else {
                setVehiclePanel(true);
            }
        } catch (error) {
            console.error("Error calculating fare:", error);
            alert("Failed to calculate fare. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-[#0f0f0f] rounded-2xl shadow-2xl max-w-md mx-auto text-white border border-gray-800">

            {/* Close */}
            <button
                className="absolute top-4 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-purple-500"
                onClick={() => !loading && setShowRideTypePanel(false)}
            >
                <i className="ri-arrow-down-wide-line text-2xl"></i>
            </button>

            <h3 className="text-2xl font-bold text-center mt-8 mb-6 tracking-wide text-purple-400">
                Choose Your Ride Type
            </h3>

            {/* Solo */}
            <button
                onClick={() => handleRideTypeSelect('solo')}
                disabled={loading}
                className={`w-full px-5 py-4 rounded-xl mb-4 transition-all duration-200 text-left ${
                    rideType === 'solo'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-[#1a1a1a] border border-gray-700 hover:border-purple-500'
                }`}
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h4 className="text-lg font-semibold">Solo Ride</h4>
                        <p className="text-xs text-gray-400">Private and quick</p>
                    </div>
                    {rideType === 'solo' && <i className="ri-check-line text-xl text-white" />}
                </div>
            </button>

            {/* Carpool */}
            <div
                className={`px-5 py-4 rounded-xl transition-all duration-200 ${
                    rideType === 'carpool'
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-[#1a1a1a] border border-gray-700 hover:border-purple-500'
                }`}
            >
                <button
                    onClick={() => setRideType('carpool')}
                    disabled={loading}
                    className="flex justify-between w-full items-center mb-2"
                >
                    <div>
                        <h4 className="text-lg font-semibold">Carpool</h4>
                        <p className="text-xs text-gray-400">Cheaper shared rides</p>
                    </div>
                    {rideType === 'carpool' && <i className="ri-check-line text-xl text-white" />}
                </button>

                {/* Gender Selection */}
                {rideType === 'carpool' && (
                    <div className="mt-3">
                        <label className="block text-sm mb-2 text-gray-300">Gender Preference</label>
                        <div className="flex gap-3 mb-4">
                            {['female', 'male', 'random'].map((option) => (
                                <button
                                    key={option}
                                    className={`px-3 py-1 rounded-full text-sm transition ${
                                        genderPreference === option
                                            ? 'bg-white text-black font-semibold'
                                            : 'bg-gray-800 text-white hover:bg-purple-500'
                                    }`}
                                    onClick={() => setGenderPreference(option)}
                                    disabled={loading}
                                >
                                    {option.charAt(0).toUpperCase() + option.slice(1)}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => handleRideTypeSelect('carpool')}
                            className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-gray-100 transition"
                            disabled={loading}
                        >
                            Confirm Carpool Ride
                        </button>
                    </div>
                )}
            </div>

            {loading && (
                <div className="text-center mt-4 text-sm text-gray-400">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Calculating fares...
                </div>
            )}
        </div>
    );
};

export default RideTypePanel;
