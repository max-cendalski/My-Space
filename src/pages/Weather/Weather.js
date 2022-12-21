import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";

import { useState, useEffect } from "react";

const Weather = () => {
  const { user } = UserAuth();
  const [address, setAddress] = useState("");
  const [locationsFromDB, setLocationsFromDB] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const locationsFromDB = [];
    const urls = [];
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "weatherLocations")
        );
        querySnapshot.forEach((doc) => {
          locationsFromDB.push(doc.data());
        });
        for (const location of locationsFromDB) {
          urls.push(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&units=imperial&appid=${weatherApiKey}`
          );
        }

        Promise.all(urls.map((url) => fetch(url))).then((responses) =>
          Promise.all(responses.map((res) => res.json()))
            .then((data) => {
              for (var i = 0; i < data.length; i++) {
                locationsFromDB[i].temp = data[i].current.temp;
              }
              setLocationsFromDB(locationsFromDB);
            })
            .catch((error) => console.log("ERROR:", error))
        );
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    /*   return () => {
      isCanceled = true;
    }; */
    //eslint-disable-next-line
  }, []);

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            const locationArray = address.split(",");
            const locationToSave = {
              city: locationArray[0],
              country: locationArray[locationArray.length - 1],
              coordinates: latLng,
              temp: data.current.temp,
            };
            setLocationsFromDB([...locationsFromDB, locationToSave]);
          });
      })
      .catch((error) => console.error("Error", error));
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
      {isLoading && <p>Loading data from database ...</p>}
      {locationsFromDB && !isLoading &&
        locationsFromDB.map((location, index) => (
          <section className="temperature-container" key={index}>
            {location.city} - {location.temp}&deg;F
          </section>
        ))}
    </article>
  );
};

export default Weather;

/*     (async () => {
      try {
        await addDoc(
          collection(db, "users", user.uid, "weatherLocations"),
          locationToSave
        );
      } catch (err) {
        console.log("ERROR:", err);
      }
    })(); */
