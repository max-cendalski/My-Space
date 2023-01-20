import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";

import { useState, useEffect } from "react";

const Weather = () => {
  const { user } = UserAuth();
  const [address, setAddress] = useState("");
  const [locationsFromDB, setLocationsFromDB] = useState([]);
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [singleLocationContainer, setSingleLocationContainer] =
    useState("single-location");
  const [detailLocationData, setDetailLocationData] = useState({});
  const [detailLocationContainer, setDetailLocationContainer] = useState(
    "detail-location-container"
  );

  useEffect(() => {
    const locationsFromDB = [];
    const urls = [];
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    (async () => {
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
    })();
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
            setSearchedLocations([...searchedLocations, locationToSave]);
          });
      })
      .catch((error) => console.error("Error", error));
    setAddress("");
  };

  const handleAddLocationToDB = (location) => {
    const locationsToKeep = searchedLocations.filter(
      (item) => item !== location
    );
    (async () => {
      try {
        await addDoc(
          collection(db, "users", user.uid, "weatherLocations"),
          location
        );
      } catch (err) {
        console.log("ERROR:", err);
      }
    })();
    setSearchedLocations(locationsToKeep);
    setLocationsFromDB([...locationsFromDB, location]);
  };

  const handleDBLocationsClick = (location) => {
    setDetailLocationData(location);
    setDetailLocationContainer("detail-location-container-visible");
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
      {isLoading && (
        <p className="loading-notification">Loading data from database ...</p>
      )}

      <article className="locations-fromDB-container">
        {detailLocationData && (
          <section className={detailLocationContainer}>
            {detailLocationData.city} - {detailLocationData.temp}&deg;F
          </section>
        )}
        {!isLoading &&
          locationsFromDB.map((location, index) => (
            <section
              className="single-location"
              onClick={() => handleDBLocationsClick(location)}
              key={index}
            >
              {location.city} - {location.temp}&deg;F
            </section>
          ))}
      </article>

      <article>
        {searchedLocations &&
          searchedLocations.map((location, index) => (
            <section
              className="searched-locations"
              onClick={() => handleAddLocationToDB(location)}
              key={index}
            >
              <section className="temperature-section">
                {location.city} = {location.temp}&deg;F
              </section>
              <button className="add-location-button">
                <i className="fa-solid fa-plus fa-2xl"></i>
              </button>
            </section>
          ))}
      </article>
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
