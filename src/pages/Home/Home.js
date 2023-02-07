import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Navbar from "../../components/Navbar/Navbar";
import { format } from "date-fns";

const Home = () => {
  const [idea, setIdea] = useState(null);
  const { user } = UserAuth();
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(format(new Date(), "pp"));
    }, 1000);

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
    // eslint-disable-next-line
  }, []);

  return (
    <article id="home-container">
      <Navbar />
      {user ? (
        <h3>{user.displayName}</h3>
      ) : (
        <article>
          <h3>You need to be signed in to use all features! </h3>
        </article>
      )}
      <article id="time-location-container">
        <section className="time-container">{currentTime}</section>
        <section className="location-homepage-container"><h1>Aliso Viejo</h1></section>
      </article>
      {idea && (
        <section id="idea-home-page">
          <p>
            <q>{idea.text}</q>
          </p>
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
