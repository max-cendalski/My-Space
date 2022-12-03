import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";


import { useState, useEffect } from "react";

const Weather = () => {
  const {user} = UserAuth()
  const [temperature, setTemperature] = useState(null);
  const [address, setAddress] = useState("");
  const [latLng, setLatLng] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (latLng !== null) {
      const fetchtWeather = async () => {
        const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`;
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
    }
  }, [latLng]);

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .catch((error) => console.error("Error", error));
    setAddress("");
     const cityToSave = address.split(",");
    setCity(cityToSave[0]);
     const addNote = async () => {
       try {
         await addDoc(collection(db, "users", user.uid, "weather"), {address});
       } catch (e) {
         console.error("Error adding document:", e);
       }
     };
  };

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
      {temperature && (
        <h3>
          {" "}
          Temperature in {city} is : {temperature}
        </h3>
      )}
    </article>
  );
};

export default Weather;
