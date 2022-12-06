import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";

import { useState, useEffect } from "react";

const Weather = () => {
  const { user } = UserAuth();
  const [temperature, setTemperature] = useState(null);
  const [address, setAddress] = useState("");
  const [addressFromDB, setAddressFromDB] = useState(null);
  const [latLng, setLatLng] = useState(null);
  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid, "weather", "location");
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAddressFromDB(
            `${docSnap.data().location.city},${docSnap.data().location.country}`
          );
          console.log("Document data:", docSnap.data().location);
          geocodeByAddress(
            `${docSnap.data().location.city},${docSnap.data().location.country}`
          )
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
               const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
              fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`
              )
                .then((response) => response.json())
                .then((data) => setTemperature(data.current.temp))
                .catch((error) => console.error("Error", error));
              if (latLng === null) {
                console.log("wha");
              }
              setLocation({
                city: docSnap.data().location.city,
                country: docSnap.data().location.country,
              });
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log("err", err);
      }
    })();

    const fetchtWeather = async () => {
      try {
        const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("data", data.current.temp);
        setTemperature(data.current.temp);
      } catch (err) {
        console.error("ERROR: ", err.message);
      }
    };

    if (latLng === null) {
      console.log("wheeeee");
    }

    // eslint-disable-next-line
  }, [addressFromDB]);

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
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
          {location.city} - {temperature}&deg;F
        </h3>
      )}
    </article>
  );
};

export default Weather;

/*   useEffect(() => {
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
  }, [latLng]); */

/*
    const geoTest = () => {
      console.log("whee");
      const getDataFromDB = async () => {
        const docRef = doc(db, "users", user.uid, "weather", "location");
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().location);
            setAddressFromDB(
              `${docSnap.data().location.city},${
                docSnap.data().location.country
              }`
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
    }; */

/*       const handleAddLocationToDB = () => {
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
      }; */

/*           if (addressFromDB !== null) {
            geocodeByAddress(addressFromDB)
              .then((results) => getLatLng(results[0]))
              .then((latLng) => setLatLng(latLng))
              .catch((error) => console.error("Error", error));
            const locationToSave = addressFromDB.split(",");
            setLocation({
              city: locationToSave[0],
              country: locationToSave[locationToSave[1]],
            });
          }
          if (latLng !== null) {
            const fetchtWeather = async () => {
              try {
                const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`;
                const response = await fetch(API_URL);
                const data = await response.json();
                console.log("data", data.current.temp);
                setTemperature(data.current.temp);
              } catch (err) {
                console.error("ERROR: ", err.message);
              }
              fetchtWeather();
            };
          } */

/*  if (addressFromDB !== null) {
      geocodeByAddress(addressFromDB)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => setLatLng(latLng))
        .catch((error) => console.error("Error", error));
      const locationToSave = addressFromDB.split(",");
      setLocation({
        city: locationToSave[0],
        country: locationToSave[locationToSave[1]],
      });
    } */

/*     geocodeByAddress(addressFromDB)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setLatLng(latLng))
      .then((lat) => console.log("latlng", latLng))
      .catch((error) => console.error("Error", error));
    const locationToSave = addressFromDB.split(",");
    setLocation({
      city: locationToSave[0],
      country: locationToSave[locationToSave[1]],
    }); */
