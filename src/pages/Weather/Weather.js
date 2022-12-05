import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { addDoc, collection, setDoc, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";

import { useState, useEffect } from "react";

const Weather = () => {
  const { user } = UserAuth();
  const [temperature, setTemperature] = useState(null);
  const [address, setAddress] = useState("");
  const [addressFromDB, setAddressFromDB] = useState("");
  const [latLng, setLatLng] = useState(null);
  const [location, setLocation] = useState({});



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

  const geoTest = () => {
    console.log("whee");
    const getDataFromDB = async () => {
      const docRef = doc(db, "users", user.uid, "weather", "location");
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data().location);
          setAddressFromDB(
            `${docSnap.data().location.city},${docSnap.data().location.country}`
          );
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log("err", err);
      }
    };
    getDataFromDB();

    geocodeByAddress(addressFromDB)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .catch((error) => console.error("Error", error));
    const locationToSave = addressFromDB.split(",");
    setLocation({
      city: locationToSave[0],
      country: locationToSave[locationToSave[1]],
    });
  };

  const handleSelect = (address) => {
    console.log("add", address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .catch((error) => console.error("Error", error));
    const locationToSave = address.split(",");

    setLocation({
      city: locationToSave[0],
      country: locationToSave[locationToSave.length - 1],
    });
    setAddress("");
  };

  const handleAddLocationToDB = () => {
    const addLocationToDB = async () => {
      try {
        await setDoc(doc(db, "users", user.uid, "weather", "location"), {
          location,
        });
      } catch (e) {
        console.error("Error adding document:", e);
      }
    };
    addLocationToDB();
    setAddress("");
  };
  console.log("addresfromDb", addressFromDB);
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
        <h3 className="temperature-container">
          {location.city} -  {temperature}&deg;F
        </h3>
      )}
      <button onClick={handleAddLocationToDB}>Add Location</button>
      <button onClick={geoTest}>Check geolocation</button>
    </article>
  );
};

export default Weather;
