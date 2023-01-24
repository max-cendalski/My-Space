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
                locationsFromDB[i].extend = false;
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
              extend: false
            };
         /*    locationsFromDB.forEach((item) => {
              console.log("whee");
              if (item.city === locationToSave.city) {
                setModal("modal-visible");
                console.log("searche", searchedLocations);
                setTimeout(() => {
                  setModal("hidden");
                }, 1000);
              }
            }); */
            if (locationsFromDB.includes(locationToSave)) {
              console.log('whee')
            }
            //setSearchedLocations([...searchedLocations, locationToSave]);
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

  const handleDBLocationArrowClick = (location) => {
    if (location.extend === false) {
      location.extend = true;
      let itemToExtend = locationsFromDB.findIndex(
        (item) => item.city === location.city
      );
      let locationsToRender = Array.from(locationsFromDB);
      locationsToRender.splice(itemToExtend, 1, location);
      setLocationsFromDB(locationsToRender);
      var el = document.querySelectorAll(".single-location");
      el.forEach((item) => {
        if (item.firstChild.data === location.city) {
          item.className = "detail-location";
        }
      });
    } else {
      console.log("location:", location);
      location.extend = false;
      let itemToHide = locationsFromDB.findIndex(
        (item) => item.city === location.city
      );
      let locationsToRender = Array.from(locationsFromDB);
      locationsToRender.splice(itemToHide, 1, location);
      setLocationsFromDB(locationsToRender);
      el = document.querySelectorAll(".detail-location");
      el.forEach((item) => {
        if (item.firstChild.data === location.city) {
          item.className = "single-location";
        }
      });
    }
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
        {!isLoading &&
          locationsFromDB.map((location, index) => (
            <section className="single-location" key={index}>
              {location.city} - {location.temp}&deg;F
              <button className="down-arrow-button">
                {location.extend === true ? (
                  <i
                    className="fa-solid fa-angle-up fa-xl"
                    onClick={() => handleDBLocationArrowClick(location)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-angle-down fa-xl"
                    onClick={() => handleDBLocationArrowClick(location)}
                  ></i>
                )}
              </button>
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

      <article className={modal}>
        <h3 className="modal-info">
          You already have this location in your database!
        </h3>
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
