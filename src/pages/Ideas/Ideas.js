import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";

const Ideas = () => {
  const { user } = UserAuth();
  const [ideas, setIdeas] = useState([]);
  const [ideasToRender, setIdeasToRender] = useState("");

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const ideasData = await getDocs(collection(db, "ideas"));
        setIdeas(ideasData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchIdeas();

    // eslint-disable-next-line
  }, []);

  const handleGenerateIdeas = () => {
    var numbers = [];
    var number = 0;
    var counter = 3;
    for (var i = 0; i < counter; i++) {
      number = Math.floor(Math.random() * ideas.length);
      if (numbers.includes(ideas[number]) === false) {
        numbers.push(ideas[number]);
      } else if (numbers.includes(ideas[number]) === true) {
        numbers.pop();
        number = Math.floor(Math.random() * ideas.length);
        numbers.push(ideas[number]);
        counter++;
      }
    }
    setIdeasToRender(numbers);
  };

  const handleAddIdeaToHomepage = (id) => {
    console.log("id", id);

    const addIdea = async () => {
      try {
        await addDoc(collection(db, "users", user.uid, "ideas", ideasToRender));
      } catch (err) {
        console.error("ERROR:", err);
      }
    };
    addIdea();
  };

  return (
    <>
      <Navbar />
      <article id="ideas-page-container">
        <GoBack />
        <h1>Ideas</h1>
        {(!ideasToRender) &&
          <button onClick={handleGenerateIdeas} className="generate-ideas-button">
          Generate 3 ideas
        </button>
        }
        {ideasToRender &&
          ideasToRender.map((idea) => (
            <section className="single-idea" key={idea.id}>
              <h4 className="single-idea">{idea.text}</h4>
              <button onClick={() => handleAddIdeaToHomepage(idea.id)}>
                Add To Homepage
              </button>
            </section>
          ))}
      </article>
    </>
  );
};

export default Ideas;
