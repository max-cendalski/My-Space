import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { getDoc, getDocs, doc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const [idea, setIdea] = useState({});
  const { user } = UserAuth();

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const ideaRef = doc(db,"users",user.uid,"ideaToHome","ideaToHomePageID")
        const docSnap = await getDoc(ideaRef)
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setIdea(docSnap.data())
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.error("SOMETHING WENT WRONG:", err);
      }
    };
    fetchIdea();
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
      <section id="idea-home-page">{idea && <p>{idea.text}</p>}</section>
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
    </article>
  );
};

export default Home;
