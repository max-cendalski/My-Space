import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import LocationSearch from "../../components/PlaceSearch/PlaceSearch";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { getDocs, doc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";

import { useState, useEffect } from "react";

const Weather = () => {
  const { user } = UserAuth();
  const [temperature, setTemperature] = useState([]);
  const [address, setAddress] = useState("");
  const [locationFromDB, setLocationsFromDB] = useState([]);
  //const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  //const [locationFromDB, setLocationFromDB] = useState({});
  //const [searchTemperature, setSearchTemperature] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const locationTest = [];
    const temporaryLocation = [];
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    (async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", user.uid, "weatherLocations")
        );
        querySnapshot.forEach((doc) => {
          locationTest.push(doc.data());
        });
        for (const doc of locationTest) {
          fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${doc.coordinates.lat}&lon=${doc.coordinates.lng}&units=imperial&appid=${weatherApiKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("data", data.current.temp);
              const objToSave = {
                city: doc.city,
                country: doc.country,
                coordinates: doc.coordinates,
                temp: data.current.temp,
              };
              temporaryLocation.push(objToSave);
            })
            .catch((error) => console.error("Error", error));
        }
      } catch (err) {
        console.log("Error:", err);
      }

      setLocations(temporaryLocation);
      setIsLoading(false)
    })();

    //eslint-disable-next-line
  }, []);

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const locationArray = address.split(",");
        const locationToSave = {
          city: locationArray[0],
          country: locationArray[locationArray.length - 1],
          coordinates: latLng,
        };
        (async () => {
          try {
            await addDoc(
              collection(db, "users", user.uid, "weatherLocations"),
              locationToSave
            );
          } catch (err) {
            console.log("ERROR:", err);
          }
        })();
        setLocations([...locations, locationToSave]);
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
      {isLoading === true ? (
        <p>Loading...</p>
      ) : (
        locations.map((location, index) => (
          <section className="temperature-container" key={index}>
            {location.city} - {location.temp}&deg;F
          </section>
        ))
      )}
    </article>
  );
};

export default Weather;

/*    {
     temperature && (
       <section>
         <h3 className="temperature-container">
           {locationFromDB.city} - {temperature}&deg;F
         </h3>
       </section>
     );
   }
 */
/*    <button onClick={handleTestButton}>Check Temperature</button>;
   {
     testArray.map((item) => (
       <h3 className="temperature-container" key={item.id}>
         {item.city},{item.country}: {item.temperature}
       </h3>
     ));
   } */

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

/*     const handleTestButton = (e) => {
        e.preventDefault();
        var dataArray = [
          {
            city: "Los Angeles",
            country: "US",
            id: 1,
          },
          {
            city: "Aliso Viejo",
            country: "US",
            id: 2,
          },

          {
            city: "Sydney",
            country: "Australia",
            id: 3,
          },
        ];
        var newArr = [];
        dataArray.forEach((item) => {
          geocodeByAddress(`${item.city},${item.country}`)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
              const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
              fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`
              )
                .then((response) => response.json())
                .then((data) => {
                  newArr.push({
                    city: item.city,
                    country: item.country,
                    id: item.id,
                    temperature: data.current.temp,
                  });
                })
                .catch((error) => console.error("Error", error));
            });
        });
        setTestArray(newArr);
      }; */

/*
       {
          const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
          fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${latLng.lat}&lon=${latLng.lng}&units=imperial&appid=${weatherApiKey}`
          )
            .then((response) => response.json())
            .then((data) =>
              setLocations([
                ...locations,
                {
                  city: item.city,
                  country: item.country,
                  temperature: data.current.temp,
                },
              ])
            )
            .catch((error) => console.error("Error", error));
        } */
