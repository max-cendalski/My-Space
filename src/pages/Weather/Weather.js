import Navbar from "../../components/Navbar/Navbar";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {
  getDocs,
  doc,
  collection,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { format } from "date-fns";

const Weather = () => {
  const { user } = UserAuth();
  const [address, setAddress] = useState("");
  const [locationsFromDB, setLocationsFromDB] = useState([]);
  const [searchedLocations, setSearchedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState("hidden");

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
          locationsFromDB.push({ id: doc.id, ...doc.data() });
        });

        locationsFromDB.sort((a, b) => {
          const cityA = a.city.toUpperCase();
          const cityB = b.city.toUpperCase();
          if (cityA < cityB) {
            return -1;
          }
          if (cityA > cityB) {
            return 1;
          } else {
            return 0;
          }
        });
        for (const location of locationsFromDB) {
          urls.push(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${location.coordinates.lat}&lon=${location.coordinates.lng}&units=imperial&exclude=minutely,hourly,daily&appid=${weatherApiKey}`
          );
        }

        Promise.all(urls.map((url) => fetch(url))).then((responses) =>
          Promise.all(responses.map((res) => res.json()))
            .then((data) => {
              for (var i = 0; i < data.length; i++) {
                locationsFromDB[i].temp = data[i].current.temp;
                locationsFromDB[i].tempFeelsLike = data[i].current.feels_like;
                locationsFromDB[i].cloudsDescription =
                  data[i].current.weather[0].description;
                locationsFromDB[i].timeZone = data[i].current.timeZone_offset;
                locationsFromDB[i].sunrise = format(
                  data[i].current.sunrise * 1000,
                  "p"
                );
                locationsFromDB[i].sunset = format(
                  data[i].current.sunset * 1000,
                  "p"
                );
                locationsFromDB[i].uvi = data[i].current.uvi;
                locationsFromDB[i].humidity = data[i].current.humidity;
                locationsFromDB[i].pressure = data[i].current.pressure;
                locationsFromDB[i].windSpeed = data[i].current.wind_speed;
                locationsFromDB[i].visibility = data[i].current.visibility;
                locationsFromDB[i].extend = false;
              }
              setIsLoading(false);
            })
            .catch((error) => console.log("ERROR:", error))
        );
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLocationsFromDB(locationsFromDB);
      }
    })();
  }, [searchedLocations, user.uid]);

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
              id: `${locationArray[0]}${latLng.lat}`,
              city: locationArray[0],
              country: locationArray[locationArray.length - 1],
              coordinates: latLng,
              temp: data.current.temp,
              extend: false,
            };
            if (
              locationsFromDB.some((item) => item.city === locationToSave.city)
            ) {
              setModal("modal-visible");
              setTimeout(() => {
                setModal("hidden");
              }, 1300);
            } else {
              let searchedLocationsToRender = searchedLocations.filter(
                (item) => item.city !== locationToSave.city
              );
              setSearchedLocations([
                ...searchedLocationsToRender,
                locationToSave,
              ]);
            }
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
        await setDoc(
          doc(db, "users", user.uid, "weatherLocations", location.id),
          location
        );
      } catch (err) {
        console.log("ERROR:", err);
      }
    })();
    setSearchedLocations(locationsToKeep);
    setLocationsFromDB([...locationsFromDB, location]);
  };

  const handleDBLocationArrowClick = (location) => {
    let locationIndex = locationsFromDB.findIndex(
      (item) => item.id === location.id
    );
    location.extend = !location.extend;
    const locationsToChange = Array.from(locationsFromDB);
    locationsToChange.slice(locationIndex, location);
    setLocationsFromDB(locationsToChange);
  };

  const handleDeleteLocation = (location) => {
      (async () => {
      try {
        await deleteDoc(
          doc(db, "users", user.uid, "weatherLocations", location.id)
        );
        setLocationsFromDB(
          locationsFromDB.filter((item) => item.id !== location.id)
        );
      } catch (err) {
        console.log("ERROR:", err);
      }
    })();
  };

  const handleAddLocationToHomepage = (location) => {
    const locationToHomepage = {
      city: location.city,
      country: location.country,
      temperature: location.temp,
      clouds: location.cloudsDescription,
      coordinates: location.coordinates,
      extended: true,
    };
    const addLocationToHome = async () => {
      try {
        await setDoc(
          doc(db, "users", user.uid, "locationHome", "locationHomepageID"),
          locationToHomepage
        );
      } catch (err) {
        console.error("Something went wrong:", err);
      }
    };
    addLocationToHome();
  };

  return (
    <>
      <Navbar />
      <article id="weather-page-container">
        <LocationSearch
          address={address}
          handleChange={handleChange}
          handleSelect={handleSelect}
        />

        {isLoading && (
          <p className="loading-notification">Loading data from database ...</p>
        )}

        <article id="locations-fromDB-container">
          {!isLoading &&
            locationsFromDB.map(location => (
              <section
                className={
                  location.extend === true
                    ? "detail-location"
                    : "single-location"
                }
                id={location.id}
                key={location.id}
              >
                <p className="location-header">
                  {location.city} - {location.temp}&deg;F
                </p>
                <button
                  className="down-arrow-button"
                  onClick={() => handleDBLocationArrowClick(location)}
                >
                  {location.extend === true ? (
                    <i className="fa-solid fa-angle-up fa-xl"></i>
                  ) : (
                    <i className="fa-solid fa-angle-down fa-xl"></i>
                  )}
                </button>
                <section className="detail-location-data">
                  <p>Feels like {location.tempFeelsLike}&deg;F</p>
                  <p>
                    Clouds: <em>{location.cloudsDescription}</em>
                  </p>
                  <p>Sunrise: {location.sunrise}</p>
                  <p>Sunset: {location.sunset}</p>
                  <p>UV index: {location.uvi}</p>
                  <p>Humidity: {location.humidity} %</p>
                  <p>Pressure: {location.pressure} hPa</p>
                  <p>Wind Speed: {location.windSpeed} m/s</p>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteLocation(location)}
                  >
                    Delete
                  </button>
                </section>
                <button
                  className="add-location-to-homepage"
                  onClick={() => handleAddLocationToHomepage(location)}
                >
                  Add Location to Homepage
                </button>
              </section>
            ))}
          <article>
            {searchedLocations &&
              searchedLocations.map((location, index) => (
                <section
                  className="searched-locations"
                  onClick={() => handleAddLocationToDB(location)}
                  key={location.city}
                >
                  <section className="temperature-section">
                    {location.city} : {location.temp}&deg;F
                  </section>
                  <button className="add-location-button">
                    <i className="fa-solid fa-plus fa-2xl"></i>
                  </button>
                </section>
              ))}
          </article>
        </article>

        <article className={modal}>
          <h3 className="modal-info">
            You already have this location in your database!
          </h3>
        </article>
      </article>
    </>
  );
};

export default Weather;
