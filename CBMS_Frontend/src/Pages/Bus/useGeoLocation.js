import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    // console.log(location);
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  const MINUTE_MS = 60000;

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
      //   console.log("Logs every minute");
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  return location;
};

export default useGeoLocation;
