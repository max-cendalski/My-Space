import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Navbar from "../../components/Navbar/Navbar";
import { format } from "date-fns";
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css';
import Pencil from "../../icons/pencilS.png";

const Home = () => {
  const inputRef = useRef(null);
  const [idea, setIdea] = useState(null);
  const { user } = UserAuth();
  const [currentDay, setCurrentDay] = useState("");
  const [homepageWeather, setHomepageWeather] = useState(null);

  const [isNewTodoActive, setIsNewTodoActive] = useState(false)
  const [newTodoFormClass, setNewTodoFormClass] = useState("new-todo-form-homepage")
  const [todoPencil, setTodoPencil] = useState("note-pencil")
  const [newTodos, setNewTodos] = useState({
    todo1: "",
    todo2: "",
    todo3: "",
    todo4: ""
  })
  const [todoList, setTodoList] = useState([])

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    setCurrentDay(format(new Date(), "E, MMMM dd"));
    const interval = setInterval(() => setValue(new Date()), 1000);

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
            `https://api.openweathermap.org/data/3.0/onecall?lat=${docSnap.data().coordinates.lat
            }&lon=${docSnap.data().coordinates.lng
            }&units=imperial&exclude=minutely,hourly,daily,alerts&appid=${weatherApiKey}`
          )
            .then((res) => res.json())
            .then((data) => {
              setHomepageWeather({
                city: docSnap.data().city,
                temp: Math.round(data.current.temp),
                description: data.current.weather[0].description,
                img: data.current.weather[0].icon,
                humidity: data.current.humidity
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
          console.log("No idea added to homepage!");
        }
      } catch (err) {
        console.error("Something went wrong:", err);
      }
    };

    if (user.uid) {
      fetchIdea();
    }
    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {

    const handleClick = (e) => {
      if (!e.target.closest('.quick-access-element')) {
        setIsNewTodoActive(false);
        setNewTodoFormClass("new-todo-form-homepage")
        setTodoPencil("note-pencil")
        setNewTodos({
          todo1: "",
          todo2: "",
          todo3: "",
          todo4: ""
        })
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
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

  const handleExtendToDoForm = () => {
    if (!isNewTodoActive) {
      setIsNewTodoActive(true);

      inputRef.current.focus();

    };
    setTodoPencil("hidden")
    setNewTodoFormClass("new-todo-form-homepage")
  }

  const handleTodoInputChange = ({ target }) => {
    setNewTodos({ ...newTodos, [target.name]: target.value })
  }

  const handleAddTodos = (e) => {
    e.preventDefault()
    e.stopPropagation();
    setIsNewTodoActive(false);
    setNewTodoFormClass("new-todo-form-homepage")
    setTodoPencil("note-pencil")

    setTodoList([...todoList, ...Object.values(newTodos)]);
    setNewTodos({
      todo1: "",
      todo2: "",
      todo3: "",
      todo4: ""
    })
  }


  return (
    <article id="home-container">
      <Navbar />
      <article id="time-location-homepage-container">
        <section className="time-homepage">
          <p>{currentDay}</p>
          <Clock value={value}
            renderNumbers={true}
            size={110}
          />

        </section>
        {homepageWeather &&
          <section className="weather-homepage">
            <p>{homepageWeather.city}</p>
            <section className="weather-homepage-temp-image-section">
              <img className="weather-image"
                src={`https://openweathermap.org/img/wn/${homepageWeather.img}@4x.png`} alt='weather icon'
              ></img>
              <p>{homepageWeather.temp}&deg;</p>
            </section>
            <p>{homepageWeather.description}</p>
            <p>Humidity: {homepageWeather.humidity} %</p>
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



      <article className="quick-access-homepage">
        <section onClick={handleExtendToDoForm} className={`quick-access-element  ${isNewTodoActive ? "active" : ""}`}>
          <form className={`${newTodoFormClass} ${isNewTodoActive ? "active" : ""}`} onSubmit={handleAddTodos}>
            <p><input ref={inputRef} onChange={handleTodoInputChange} type="text" name="todo1" value={newTodos.todo1} className="new-todo-input-homepage" placeholder="add todo" /></p>
            <p><input onChange={handleTodoInputChange} type="text" name="todo2" value={newTodos.todo2} className="new-todo-input-homepage" placeholder="add todo" /></p>
            <p><input onChange={handleTodoInputChange} type="text" name="todo3" value={newTodos.todo3} className="new-todo-input-homepage" placeholder="add todo" /></p>
            <p><input onChange={handleTodoInputChange} type="text" name="todo4" value={newTodos.todo4} className="new-todo-input-homepage" placeholder="add todo" /></p>
            <button >Submit</button>
          </form>
          <img
            className={`todo-pencil ${isNewTodoActive ? "hidden" : ""}`}
            src={Pencil}
            alt="pencil-icon"
          />
        </section>
      </article>
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
      <ul className="todo-list-homepage">
        {todoList.map((item, index) =>
          <li key={index}>{item.trim()}</li>
        )}
      </ul>
    </article>
  );
};

export default Home;
