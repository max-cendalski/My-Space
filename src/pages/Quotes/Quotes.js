import Navbar from "../../components/Navbar/Navbar";
import {
  getDocs,
  getDoc,
  doc,
  setDoc,
  collection,
  updateDoc
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";

const Quotes = () => {
  const { user } = UserAuth();
  const [quotes, setQuotes] = useState([]);
  const [quotesToRender, setQuotesToRender] = useState([]);
  const [generateQuotesButtonStatus, setGenerateQuotesButton] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      const dataRef = doc(db, "users", user.uid, "dateForQuotes", "dateID");
      try {
        const dateForQuotes = await getDoc(dataRef);
        const quotesData = await getDocs(collection(db, "ideas"));
        const quotesToRenderData = await getDocs(
          collection(db, "users", user.uid, "quotes")
        );
        setQuotes(quotesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setQuotesToRender(
          quotesToRenderData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        if (dateForQuotes.data()) {
          let timeNow = new Date().getTime();
          let timeTodayToCompare = new Date(timeNow).toDateString().split(" ");
          timeTodayToCompare[4] = "23:59:59";
          let timeTodayToSave = new Date(
            timeTodayToCompare.join(" ")
          ).getTime();
          let timeBefore = new Date(dateForQuotes.data().timeToSave).getTime();
          if (timeTodayToSave - timeBefore >= 172800300) {
            setGenerateQuotesButton(true);
          }
        }
        else if (quotesToRender.length === 0) {
          setGenerateQuotesButton(true)
        }
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    if (user.uid) {
      fetchQuotes()
    }
    // eslint-disable-next-line
  }, [user.uid]);

  useEffect(()=> {
    console.log('qut',quotesToRender)
  },[quotesToRender])

  const handleGenerateQuotes = () => {
    var numbers = [];
    var number = 0;
    for (var i = 0; i < 3; i++) {
      number = Math.floor(Math.random() * quotes.length);
      if (numbers.includes(quotes[number]) === false) {
        numbers.push(quotes[number]);
      } else if (numbers.includes(quotes[number]) === true) {
        number = Math.floor(Math.random() * quotes.length);
        numbers.push(quotes[number]);
      }
    }
    setQuotesToRender(numbers.slice());

    const addDate = async () => {
      try {
        let dateToMiliseconds = new Date().getTime();
        let timeToChange = new Date(dateToMiliseconds).toString().split(" ");
        timeToChange[4] = "23:59:59";
        let timeToSave = new Date(timeToChange.join(" ")).getTime();
        await setDoc(doc(db, "users", user.uid, "dateForQuotes", "dateID"), {
          timeToSave,
        });
        if (quotesToRender.length === 0) {
          for (const item of numbers) {
            await setDoc(doc(db, "users", user.uid, "quotes", item.id), item);
          }
        } else {
          var counter = 0;
          for (const item of quotesToRender) {
            await updateDoc(
              doc(db, "users", user.uid, "quotes", item.id),
              numbers[counter]
            );
            counter++;
          }
        }

      } catch (err) {
        console.error("Something went wrong!");
      }
    };

    setGenerateQuotesButton(false);
    addDate();
  };

  const handleAddQuoteToHomepage = (id) => {
    const quoteToHomePage = quotesToRender.filter((item) => item.id === id);
    quoteToHomePage[0].extend = true
    const addQuote = async () => {
      try {
        await setDoc(
          doc(db, "users", user.uid, "quoteToHome", "quoteToHomePageID"),
          quoteToHomePage[0]
        );
      } catch (err) {
        console.error("Something went wrong:", err);
      }
    };
    addQuote();
  };

  return (
    <>
      <Navbar />
      <article id="quotes-container">
        <article className="quotes-header">
          <h1>Three Quotes for Inspiration</h1>
          {(generateQuotesButtonStatus) && (
            <button
              onClick={handleGenerateQuotes}
              className="generate-quotes-button"
            >
              Generate Three New Quotes!
            </button>
          )}
        </article>
        {quotesToRender &&
          quotesToRender.map((quote) => (
            <section className="single-quote" key={quote.id}>
              <p>
                <q className="quote-text">{quote.text}</q>
              </p>
              <button
                className="single-quote-button"
                onClick={() => handleAddQuoteToHomepage(quote.id)}
              >
                Add This Quote to Your Homepage
              </button>
            </section>
          ))}
      </article>
    </>
  );
};

export default Quotes;
