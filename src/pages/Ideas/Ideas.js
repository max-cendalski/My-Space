import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { getDocs,getDoc, doc, setDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import { formatDistance, subDays,format} from "date-fns";

const Ideas = () => {
  const { user } = UserAuth();
  const [ideas, setIdeas] = useState([]);
  const [ideasToRender, setIdeasToRender] = useState([]);
  const [dateToCompare, setDateToCompare] = useState('')

  useEffect(() => {
    const fetchIdeas = async () => {
      const dataRef = doc(db,"users",user.uid,"dateForIdeas","dateID")
      try {
        const dateForIdeas = await getDoc(dataRef)
        const ideasData = await getDocs(collection(db, "ideas"));
        const ideasToRenderData = await getDocs(
          collection(db, "users", user.uid, "ideas")
        );
        setIdeas(ideasData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIdeasToRender(
          ideasToRenderData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setDateToCompare(dateForIdeas.data())
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
    console.log("ideas to render", ideasToRender);
  };


  const handleAddIdeaToHomepage = (id) => {
    const ideaToHomePage = ideasToRender.filter((item) => item.id === id);
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

  const handleCreateDate = () => {
     const addDate = async() => {
      try {
        let date = format(new Date(), "yyyy/mm/dd")
        await setDoc(
          doc(db, "users",user.uid, "dateForIdeas", "dateID"),{
            date
          })
      } catch(err) {
        console.error("Something went wrong!")
      }
     }
     addDate()
 /*
    const date2 = new Date(2022, 11, 2)
    console.log('date',date1)
    console.log('date',date2)
    console.log('from:',formatDistance(subDays(date1,1), date2,{ addSuffix: true }))
    let firstTry = formatDistance(subDays(date1,1), date2,{ addSuffix: true })
    console.log('firstTry:',firstTry[0]) */
  }
  //console.log(new Date())
  //console.log('dateformat',format(new Date(dateToCompare.date),"MM/dd/yyyy"))
  //console.log(formatDistance(subDays(new Date(), 1), dateToCompare[0], { addSuffix: true }))
  console.log('format',formatDistance(new Date(),1),new Date(12, 10, 2021))
  return (
    <div>
      <Navbar />
      <article id="ideas-page-container">
        <GoBack />
        <button onClick={handleCreateDate}>Create Date</button>
        <h1 id="ideas-header">Three ideas to think about</h1>
        {ideasToRender ? (
          ideasToRender.map((idea) => (
            <section className="single-idea" key={idea.id}>
              <p className="text"><q>{idea.text}</q></p>
              <button onClick={() => handleAddIdeaToHomepage(idea.id)}>
                Add To Homepage
              </button>
            </section>
          ))
        ) : (
          <article>
            <button
              onClick={handleGenerateIdeas}
              className="generate-ideas-button"
            >
              Generate 3 ideas
            </button>
          </article>
        )}
      </article>
    </div>
  );
};

export default Ideas;
/*
       console.log(ideaToHo);
        await addDoc(
          collection(db, "users", user.uid, "ideaToHomePage", ideaToHomePage.id),
          ideaToHomePage[0]
        );
        for (const item of ideasToRender) {
          await addDoc(collection(db, "users", user.uid, "ideas"), item); */
