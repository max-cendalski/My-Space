import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Navbar from "../../components/Navbar/Navbar";
import { format } from "date-fns";

const Home = () => {
  const [idea, setIdea] = useState(null);
  const { user } = UserAuth();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDay, setCurrentDay] = useState("");
  const [homepageWeather, setHomepageWeather] = useState(null);

  useEffect(() => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    setCurrentDay(format(new Date(), "E, MMMM dd"));
    setCurrentTime(format(new Date(), "pp"));

    const timeInterval = setInterval(() => {
      setCurrentTime(format(new Date(), "pp"));
    }, 1000);

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
                clouds: data.current.weather[0].description,
              });
            });
        } else {
          console.log("No such document!");
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
    return () => {
      clearInterval(timeInterval);
    };
  }, [user.uid]);

  const handleIdeaHomepageArrowButton = () => {
    console.log("idea.extend", idea.extend);
    idea.extend = !idea.extend;
    setIdea(idea)
    console.log('idea.exte',idea.extend)

    /*    if (idea.extend === true) {
      idea.extend = false;
      setIdea(idea);
      var el = document.querySelector(".idea-homepage-visible");
      console.log("el1", el);
      el.className = "idea-homepage-hidden";
    } else {
      idea.extend = true;
      setIdea(idea);
      el = document.querySelector(".idea-homepage-hidden");
      console.log("el2", el);
      el.className = "idea-homepage-visible";
    } */

    const saveExtend = async () => {
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
    saveExtend();
  };

  return (
    <article id="home-container">
      <Navbar />
      {homepageWeather && (
        <article id="time-location-container">
          <section className="time-container">
            <h4>{currentDay}</h4>
            <h2>{currentTime}</h2>
          </section>
          <section className="location-homepage-container">
            <h4>{homepageWeather.city}</h4>
            <h2>{homepageWeather.temp}&deg;</h2>
            <p>{homepageWeather.clouds}</p>
          </section>
        </article>
      )}
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
          <q>{idea.text}</q>
        </section>
      )}

      <NavLink className="feature-button" to="/notes">
        Notes
      </NavLink>
      <NavLink className="feature-button" to="/tasks">
        Tasks
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

/*      {idea && (
        <section className="idea-homepage-visible">
          <button
            className="down-arrow-button"
            onClick={() => handleIdeaHomepageArrowButton(idea)}
          >
            {idea.extend === true ? (
              <i className="fa-solid fa-angle-up fa-2xl"></i>
            ) : (
              <i className="fa-solid fa-angle-down fa-2xl"></i>
            )}
          </button>
          <q>{idea.text}</q>
        </section>
      )} */
