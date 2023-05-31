import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Navbar from "../../components/Navbar/Navbar";
import { format } from "date-fns";
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css';

const Home = () => {
  const [idea, setIdea] = useState(null);
  const { user } = UserAuth();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [homepageWeather, setHomepageWeather] = useState(null);
  
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    //setCurrentDay(format(new Date(), "E, MMMM dd"));
    //setCurrentTime(format(new Date(), "pp"));


    

    (async () => {
      try {
        const locationHomeRef = doc(
          db,
          "users",
          user.uid,
          "locationHome",
          "locationHomepageID"
        );
        const docSnap = await getDoc(locationHomeRef);
        if (docSnap.exists()) {
          fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${
              docSnap.data().coordinates.lat
            }&lon=${
              docSnap.data().coordinates.lng
            }&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${weatherApiKey}`
          )
            .then((res) => res.json())
            .then((data) => {
              setHomepageWeather({
                city: docSnap.data().city,
                temp: data.current.temp,
                description: data.current.weather[0].description,
                img: data.current.weather[0].icon
              });
            });
        } else {
          console.log("NO SUCH DOCUMENT!");
        }
      } catch (err) {
        console.log("SOMETHING WENT WRONG", err);
      }
     
    })();

    const fetchIdea = async () => {
      try {
        const ideaRef = doc(
          db,
          "users",
          user.uid,
          "ideaToHome",
          "ideaToHomePageID"
        );
        const docSnap = await getDoc(ideaRef);
        if (docSnap.exists()) {
          setIdea(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.error("SOMETHING WENT WRONG:", err);
      }
    };

    if (user.uid) {
      fetchIdea();
    }
    const interval = setInterval(() => setValue(new Date()), 1000);

     return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  const handleIdeaHomepageArrowButton = () => {
    idea.extend = !idea.extend;
    setIdea(idea);
    const updateIdea = async () => {
      try {
        const extendRef = doc(
          db,
          "users",
          user.uid,
          "ideaToHome",
          "ideaToHomePageID"
        );
        await updateDoc(extendRef, {
          extend: idea.extend,
        });
      } catch (err) {
        console.error("SOMETHING WENT WRONG:", err);
      }
    };

    updateIdea();
  };

  return (
    <article id="home-container">
      <Navbar />
      <article id="time-location-homepage-container">
        <section className="time-homepage">
        <p>{currentDay}</p>
     
        <Clock value={value}
        size={130}
        />
      
      </section>
      {homepageWeather &&
        <section className="weather-homepage">
          <p>{homepageWeather.city}</p>
          <p>{homepageWeather.temp}&deg;</p>
          <p>{homepageWeather.description}</p>
          <img className="weather-image"
        src={`https://openweathermap.org/img/wn/${homepageWeather.img}@4x.png`} alt='weather icon'
      ></img>
        </section>
      }
      </article>

      {idea && (
        <section
          className={
            idea.extend ? "idea-homepage-visible" : "idea-homepage-hidden"
          }
        >
          <button
            className="down-arrow-button"
            onClick={handleIdeaHomepageArrowButton}
          >
            {idea.extend ? (
              <i className="fa-solid fa-angle-up fa-2xl"></i>
            ) : (
              <i className="fa-solid fa-angle-down fa-2xl"></i>
            )}
          </button>
          <q className="idea-homepage-quote">{idea.text}</q>
        </section>
      )}
      <NavLink className="feature-button" to="/notes">
        Notes
      </NavLink>
      <NavLink className="feature-button" to="/Calendar">
        Calendar
      </NavLink>
      <NavLink className="feature-button" to="/weather">
        Weather
      </NavLink>
      <NavLink className="feature-button" to="/ideas">
        Ideas
      </NavLink>
      <NavLink className="feature-button" to="/games">
        Games
      </NavLink>
    </article>
  );
};

export default Home;
