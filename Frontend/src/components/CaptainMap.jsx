// components/CaptainMap.jsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const fallbackCenter = {
  lat: 20.5937, // India center fallback
  lng: 78.9629,
};

const CaptainMap = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.error('Geolocation error:', err);
          setError('Location permission denied or unavailable.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError('Geolocation not supported by this browser.');
    }
  }, []);

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <>
      {error && (
        <div style={{ color: 'red', paddingBottom: '1rem' }}>{error}</div>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={location || fallbackCenter}
        zoom={location ? 15 : 5}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </>
  );
};

export default CaptainMap;
