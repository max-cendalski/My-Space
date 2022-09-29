import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { getDocs, getDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useState, useEffect } from "react";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [singleIdea, setSingleIdea] = useState("");
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
    for (var i = 0; i < 3; i++) {

      number = Math.floor(Math.random() * ideas.length);
      if (numbers.includes(ideas[number]) === false) {
        numbers.push(ideas[number])

      }
      else {
        console.log('whee')
         number = Math.floor(Math.random() * ideas.length);
         numbers.push(ideas[number])
      }
    }
    console.log('numbers',numbers)
    setIdeasToRender(numbers);
  };

  return (
    <>
      <Navbar />
      <article id="ideas-page-container">
        <GoBack />
        <h1>Ideas</h1>
        <button onClick={handleGenerateIdeas} className="generate-ideas-button">
          Generate 3 ideas
        </button>
        {ideasToRender &&
          ideasToRender.map((idea) => (
            <section key={idea.id}>
              <h4 className="single-idea">{idea.text}</h4>
            </section>
          ))}
      </article>
    </>
  );
};

export default Ideas;
