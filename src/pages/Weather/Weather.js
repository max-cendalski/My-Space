import Navbar from "../../components/Navbar/Navbar"
import GoBack from "../../components/GoBack/GoBack";
import { useState, useEffect } from "react";

const Weather = () => {
  const weatherApiKey = process.env.REACT_APP_APP_WEATHER_API_KEY;
  const getWeather = async()=>{
    const weather = await fetch(
      'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=738338f10d8524c57d795ce279f2a0a7'
    );
      console.log("weahter", weather);
  }
  getWeather()

  return (
    <article>
      <Navbar />
      <article id="weather-page-container">
        <GoBack />
        <h1>Weather</h1>

      </article>
    </article>
  );
}

export default Weather
