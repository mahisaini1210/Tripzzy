import React, { useState, useEffect, useContext } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { SocketContext } from "../context/SocketContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.621,
  lng: 77.205,
};

const LiveTracking = ({ source, destination }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [captainPosition, setCaptainPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const { socket } = useContext(SocketContext);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Set center to source
  useEffect(() => {
    if (source?.lat && source?.lng) {
      setCurrentPosition(source);
    }
  }, [source]);

  // Route calculation
  useEffect(() => {
    if (
      isLoaded &&
      source?.lat &&
      source?.lng &&
      destination?.lat &&
      destination?.lng
    ) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
    }
  }, [isLoaded, source, destination]);

  // Listen for real-time captain updates
  useEffect(() => {
    if (!socket) return;

    const handleLocationUpdate = (data) => {
      const newPos = {
        lat: parseFloat(data.location?.ltd),
        lng: parseFloat(data.location?.lng),
      };

      if (!isNaN(newPos.lat) && !isNaN(newPos.lng)) {
        setCaptainPosition(newPos);
        setCurrentPosition(newPos);
      }
    };

    socket.on("captain-location-updated", handleLocationUpdate);

    return () => {
      socket.off("captain-location-updated", handleLocationUpdate);
    };
  }, [socket]);

  if (!isLoaded) return <div className="text-white text-center p-4">Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={15}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {directions && <DirectionsRenderer directions={directions} />}

      {source && (
        <Marker
          position={source}
          label="P"
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          }}
        />
      )}

      {destination && (
        <Marker
          position={destination}
          label="D"
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          }}
        />
      )}

      {captainPosition && (
        <Marker
          position={captainPosition}
          label="C"
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new window.google.maps.Size(40, 40),
          }}
        />
      )}
    </GoogleMap>
  );
};

export default LiveTracking;
