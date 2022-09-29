import Navbar from "../../components/Navbar/Navbar";
import GoBack from "../../components/GoBack/GoBack";
import { getDocs,getDoc, doc,collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { useState, useEffect } from "react";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [singleIdea, setSingleIdea] = useState('')
  const [ideaToRender, setIdeaToRender] = useState('')

  useEffect(() => {
    const fetchIdeas = async () => {
      const singleIdeaRef = doc(db, "ideas", "N5Kp9pe6M9mFbRrd8MZq");
      try {
        const ideasData = await getDocs(collection(db, "ideas"));
        const singleIdeaData = await getDoc(singleIdeaRef)
        setSingleIdea(singleIdeaData.data())
        console.log("singleIdeaData", singleIdea);
        setIdeas(ideasData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        console.error("ERROR", err);
      }
    };
    fetchIdeas()
    // eslint-disable-next-line
  }, []);
    //console.log("ideas", ideas);

  return (
    <>
      <Navbar />
      <article id="ideas-page-container">
        <GoBack />
        <h1>Ideas</h1>
        <button className="generate-ideas-button">Generate 3 ideas</button>

        <p>{singleIdea.text}</p>
      </article>
    </>
  );
};

export default Ideas;
