import { NavLink } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { getDoc, doc, collection, onSnapshot, setDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import Navbar from "../../components/Navbar/Navbar";
import { format } from "date-fns";
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css';
import Pencil from "../../icons/pencilS.png";
import NotesIcon from "../../icons/notes-icon.png";
import CalendarIcon from "../../icons/calendar-icon.png";
import QuoteIcon from "../../icons/quote-icon.png";
import WeatherIcon from "../../icons/weather-icon.png";
import GamesIcon from "../../icons/games-icon.png";


const Home = () => {
  const firstInputRef = useRef(null);
  const [quote, setQuote] = useState(null);
  const { user } = UserAuth();
  const [currentDay, setCurrentDay] = useState("");
  const [homepageWeather, setHomepageWeather] = useState(null);

  const [isNewTodoActive, setIsNewTodoActive] = useState(false)
  const [newTodoFormClass, setNewTodoFormClass] = useState("new-todo-form-homepage")
  const [newTodos, setNewTodos] = useState([
    { text: '', status: false },
    { text: '', status: false },
    { text: '', status: false },
    { text: '', status: false },
  ]);
  const [todoList, setTodoList] = useState([])
  const [isTodoListLarge, setIsTodoListLarge] = useState(false)

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    var screenWidth = window.innerWidth
    const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
    setCurrentDay(format(new Date(), "E, MMMM dd"));
    const interval = setInterval(() => setValue(new Date()), 1000);

    const fetchWeatherData = async () => {
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
    };


    const fetchQuote = async () => {
      try {
        const quoteRef = doc(
          db,
          "users",
          user.uid,
          "quoteToHome",
          "quoteToHomePageID"
        );
        const docSnap = await getDoc(quoteRef);
        if (docSnap.exists()) {
          let quoteToRender
          quoteToRender = docSnap.data()
          setQuote(screenWidth >= 1024 ? { ...quoteToRender, extend: true } : quoteToRender);
        } else {
          console.log('quote doesn\'t exists')
          try {
            setQuote({
              text: "Habits will form whether you want them or not. Whatever you repeat, you reinforce.",
              extend: false
            })
            await setDoc(
              doc(db, "users", user.uid, "quoteToHome", "quoteToHomePageID"),
              {
                text: "Habits will form whether you want them or not. Whatever you repeat, you reinforce.",
                extend: false
              }
            );
          } catch (err) {
            console.error("Something went wrong:", err);
          }
        }
      } catch (err) {
        console.error("Something went wrong:", err);
      }
    };

    if (user.uid) {
      fetchQuote();
      fetchWeatherData()
    }
    return () => {
      clearInterval(interval);
    };
  }, [user, isTodoListLarge]);


  useEffect(() => {
    if (isNewTodoActive && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isNewTodoActive]);

  useEffect(() => {
    if (!isTodoListLarge && todoList.length > 0) {

      const updatedTodoList = todoList.filter(todo => todo.status !== true);
      const todosToBeRemoved = todoList.filter(todo => todo.status === true);

      const todosCollection = collection(db, "users", user.uid, "todos");

      updatedTodoList.forEach(async (todo) => {
        if (todo.id && typeof todo.id === 'string') {
          const todoDoc = doc(todosCollection, todo.id);
          await updateDoc(todoDoc, { status: todo.status });
        }
      });

      todosToBeRemoved.forEach(async (todo) => {
        if (todo.id && typeof todo.id === 'string') {
          const todoDoc = doc(todosCollection, todo.id);
          await deleteDoc(todoDoc);
        }
      });
    }
    // eslint-disable-next-line
  }, [isTodoListLarge]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, `users/${user.uid}`, "todos"),
      (snapShot) => {
        let todoList = [];
        snapShot.docs.forEach((doc) => {
          todoList.push({ id: doc.id, ...doc.data() });
        });
        setTodoList(todoList.sort((a, b) => a.text.localeCompare(b.text)));
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, [user.uid]);

  useEffect(() => { // close todo window
    const handleClick = (e) => {
      if (!e.target.closest('.quick-access-element')) {
        setIsNewTodoActive(false);
        setNewTodoFormClass("new-todo-form-homepage")
        setIsTodoListLarge(false)
        setNewTodos([
          { text: '', status: false },
          { text: '', status: false },
          { text: '', status: false },
          { text: '', status: false },
        ])
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);



  const handleIdeaHomeExtendButton = () => {
    setQuote({ ...quote, extend: !quote.extend })
    const updateIdea = async () => {
      try {
        const extendRef = doc(
          db,
          "users",
          user.uid,
          "quoteToHome",
          "quoteToHomePageID"
        );
        await updateDoc(extendRef,
          { quote: quote, extend: !quote.extend }
        );
      } catch (err) {
        console.error("SOMETHING WENT WRONG:", err);
      }
    };
    updateIdea();
  };



  const handleExtendToDoForm = () => {
    if (!isNewTodoActive) {
      setIsNewTodoActive(true);
      setIsTodoListLarge(false)

    };
    setNewTodoFormClass("new-todo-form-homepage")
  }

  const handleTodoInputChange = (e, index) => {
    const { value } = e.target;
    setNewTodos(prevTodos => {
      const updatedTodos = [...prevTodos]
      updatedTodos[index] = { id: Date.now(), text: value, status: false };

      return updatedTodos
    });
  };


  const handleAddTodos = (e) => {
    e.preventDefault()
    let newTodosToUpdate = newTodos.filter( // checking if there are duplicate inputs and removing empty ones
      (todo, i, a) => a.map((val) => val.text).indexOf(todo.text) === i && todo.text !== "");
    setNewTodos([
      { text: '', status: false },
      { text: '', status: false },
      { text: '', status: false },
      { text: '', status: false },
    ])
    if (newTodosToUpdate.length > 0) {
      let filteredTodosToUpdate = newTodosToUpdate.filter( // checking for duplicate in "new" and old todos
        (newTodo) => !todoList.some((todo) => todo.text === newTodo.text)
      );
      if (filteredTodosToUpdate.length > 0) {
        addTodos(newTodosToUpdate)
        setTodoList([...newTodosToUpdate, ...todoList].sort((a, b) => a.text.localeCompare(b)))
        setIsNewTodoActive(false);
      } else {
        setNewTodoFormClass("new-todo-form-homepage")
        setIsNewTodoActive(false)
      }
    } else {
      setIsNewTodoActive(false)
    }
  }


  const handleExtendTodoList = () => {
    setIsTodoListLarge(true)
  }


  async function addTodos(todos) {
    const todosCollection = collection(db, "users", user.uid, "todos");

    for (const todo of todos) {
      const todoDocRef = doc(todosCollection);
      todo.id = todoDocRef.id;
      await setDoc(todoDocRef, todo);
    }
  }

  return (
    <>
      <Navbar />
      <article id="home-container">
        <section className="time-homepage">
          <p>{currentDay}</p>
          <Clock value={value}
            renderNumbers={true}
            size={todoList.length > 0 ? 100 : 140}
          />
        </section>

        {!!todoList.length &&
          <ul onClick={(e) => {
            if (!isTodoListLarge) {
              e.stopPropagation()
              handleExtendTodoList();
            }
          }}
            className={`todo-list-homepage-small ${isTodoListLarge ? "active" : ""}`}
          >
            {todoList.map((todo, index) => (
              <li
                style={{ textDecoration: todo.status ? "line-through" : "none" }}
                key={index}
                onClick={(e) => {
                  if (isTodoListLarge) {
                    e.stopPropagation()
                    setTodoList((prev) =>
                      prev.map((item) =>
                        item.id === todo.id
                          ? { ...item, status: !item.status }
                          : item
                      )
                    )
                  }
                }
                }>
                {todo.text}
              </li>
            ))}
          </ul>
        }

        <section className="weather-homepage">
          {homepageWeather &&
            <section>
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
        </section>

        {quote && (
          <section className="quote-homepage-container">
            <button
              className="down-arrow-button"
              onClick={handleIdeaHomeExtendButton}
            >
              {quote.extend ? (
                <i className="fa-solid fa-angle-up fa-2xl"></i>
              ) : (
                <i className="fa-solid fa-angle-down fa-2xl"></i>
              )}
            </button>
            <section
              className={
                quote.extend ? "quote-homepage-visible" : "quote-homepage-hidden"
              }
            >

              <q className="quote-homepage-quote">{quote.text}</q>
            </section>
          </section>
        )}

        <article className="quick-access-homepage">
          <section onClick={handleExtendToDoForm} className={`quick-access-element  ${isNewTodoActive ? "active" : ""}`}>
            <form className={`${newTodoFormClass} ${isNewTodoActive ? "active" : ""}`} onSubmit={handleAddTodos}>
              {newTodos.map((todo, index) => (
                <p key={index}>
                  <input
                    type="text"
                    value={todo.text}
                    maxLength="30"
                    className="new-todo-input-homepage"
                    placeholder="add todo"
                    onChange={(e) => handleTodoInputChange(e, index)}
                    ref={index === 0 ? firstInputRef : null}
                  />
                </p>
              ))}
              <button className="add-todo-button">Submit</button>
            </form>
            <img
              className={`todo-pencil ${isNewTodoActive ? "hidden" : ""}`}
              src={Pencil}
              alt="pencil-icon"
            />
          </section>
        </article>


        <section id="icons-homepage-container">
          <NavLink to="/notes">
            <img src={NotesIcon} alt="notes-icon" className="icon-homepage"></img>
          </NavLink>
          <NavLink to="/Calendar">
            <img src={CalendarIcon} alt="calendar-icon" className="icon-homepage"></img>
          </NavLink>
          <NavLink to="/weather">
            <img src={WeatherIcon} alt="weather-icon" className="icon-homepage"></img>
          </NavLink>
          <NavLink to="/quotes">
            <img src={QuoteIcon} alt="quote-icon" className="icon-homepage"></img>
          </NavLink>
          <NavLink to="/games">
            <img src={GamesIcon} alt="games-icon" className="icon-homepage"></img>
          </NavLink>
        </section>

      </article>
    </>
  );
};

export default Home;
