import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { getDocs, getDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";

const Ideas = () => {
  const { user } = UserAuth();
  const [ideas, setIdeas] = useState([]);
  const [ideasToRender, setIdeasToRender] = useState([]);

  const [generateIdea, setGenerateIdeasButton] = useState(false);

  useEffect(() => {
    const fetchIdeas = async () => {
      const dataRef = doc(db, "users", user.uid, "dateForIdeas", "dateID");
      try {
        const dateForIdeas = await getDoc(dataRef);
        const ideasData = await getDocs(collection(db, "ideas"));
        const ideasToRenderData = await getDocs(
          collection(db, "users", user.uid, "ideas")
        );
        setIdeas(ideasData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIdeasToRender(
          ideasToRenderData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        if (dateForIdeas.data()) {
          let timeNow = new Date().getTime()
          let timeTodayToCompare = new Date(timeNow).toDateString().split(" ")
          timeTodayToCompare[4] = "23:59:59"
          let timeTodayToSave = new Date(timeTodayToCompare.join(" ")).getTime()
          let timeBefore = new Date(dateForIdeas.data().timeToSave).getTime()
          if(timeTodayToSave - timeBefore >= 172800300) {
            setGenerateIdeasButton(true);
          }
        }
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
        numbers.push(ideas[number]);
      } else if (numbers.includes(ideas[number]) === true) {
        number = Math.floor(Math.random() * ideas.length);
        numbers.push(ideas[number]);
      }
    }
    setIdeasToRender(numbers.slice());
    const addDate = async () => {
      try {
        let dateToMiliseconds = new Date().getTime();
        let timeToChange = new Date(dateToMiliseconds).toString().split(" ");
        timeToChange[4] = "23:59:59";
        let timeToSave = new Date(timeToChange.join(" ")).getTime();
        await setDoc(doc(db, "users", user.uid, "dateForIdeas", "dateID"), {
          timeToSave,
        });
      } catch (err) {
        console.error("Something went wrong!");
      }
    };
    addDate()
  };

  const handleAddIdeaToHomepage = (id) => {
    const ideaToHomePage = ideasToRender.filter((item) => item.id === id);
    console.log('ideaTohoem:',ideaToHomePage)
    const addIdea = async () => {
       try {
        await setDoc(
          doc(db, "users", user.uid, "ideaToHome", "ideaToHomePageID"),
          ideaToHomePage[0]
        );
        for (const item of ideasToRender) {
          await setDoc(doc(db, "users", user.uid, "ideas", item.id), item);
        }
      } catch (err) {
        console.error("Something went wrong:", err);
      }
    };
    addIdea();
  };


  return (
    <div>
      <Navbar />
      <article id="ideas-page-container">
        <GoBack />
        <h1 id="ideas-header">Three ideas to think about</h1>
        <section>
        {
          (!generateIdea) &&
          <button
            onClick={handleGenerateIdeas}
            className="generate-ideas-button"
          >
            Generate 3 new ideas!
          </button>
        }
        </section>
        {
          ideasToRender &&
          ideasToRender.map((idea) => (
            <section className="single-idea" key={idea.id}>
            <p><q>{idea.text}</q></p>
            <button className="single-idea-button" onClick={()=>handleAddIdeaToHomepage(idea.id)}>Add Idea to Homepage</button>
            </section>
          ))
        }
      </article>
    </div>
  );
};

export default Ideas;
