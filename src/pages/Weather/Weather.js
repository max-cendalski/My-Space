import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { useState, useEffect } from "react";

const Weather = () => {
  const [temperature, setTemperature] = useState(0)
  useEffect(() => {
    const fetchtWeather = async () => {
      const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const API_URL = `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&units=imperial&appid=${weatherApiKey}`;
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("data", data.current.temp);
        setTemperature(data.current.temp)
      } catch (err) {
        console.error("ERROR: ", err);
      }
    };

    fetchtWeather();
  },[]);

  return (
    <article>
      <Navbar />
      <article id="weather-page-container">
        <GoBack />
        <h1>Weather</h1>
        <p>In Chicago there is : {temperature} degree fahrenheit</p>
      </article>
    </article>
  );
};

export default Weather;
