import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import { useState, useEffect } from "react";

const Weather = () => {
  const [temperature, setTemperature] = useState(0);
  //const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState(null);

  useEffect(() => {
    const fetchtWeather = async () => {
      const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&units=imperial&appid=${weatherApiKey}`;
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("data", data.current.temp);
        setTemperature(data.current.temp);
      } catch (err) {
        console.error("ERROR: ", err.message);
      }
    };

    fetchtWeather();
  }, []);

  const handleChange = address => {
    console.log("address", address);
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .catch((error) => console.error("Error", error));
      setAddress("")
  };


  console.log('latLng',latLng)

  return (
    <article>
      <Navbar />

      <article id="weather-page-container">
        <GoBack />
        <LocationSearch
          address={address}
          handleChange={handleChange}
          handleSelect={handleSelect}
        />
      </article>
    </article>
  );
};

export default Weather;
