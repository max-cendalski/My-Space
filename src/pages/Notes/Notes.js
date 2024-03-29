import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import NotesList from "../../components/Notes/NotesList";
import AddNote from "../../components/Notes/AddNote";
import PlusButton from "../../icons/plus-icon.png";

const Notes = () => {
  const { user } = UserAuth();
  const [notes, setNotes] = useState([])
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, `users/${user.uid}`, "notes"),
      (snapShot) => {
        let notesList = [];
        snapShot.docs.forEach((doc) => {
          notesList.push({ id: doc.id, ...doc.data() });
        });
        setNotes(notesList.sort((a, b) => a.title.localeCompare(b.title)));
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      unsub();
    };

  }, [user.uid]);

  const handleDeleteNote = (id) => {
    const index = notes.findIndex((item) => item.id === id);
    const newNotes = [...notes];
    newNotes[index] = { ...newNotes[index], toBeRemoved: true };
    setNotes(newNotes);
    setTimeout(async () => {
      try {
        const noteRef = doc(db, "users", user.uid, "notes", id);
        await deleteDoc(noteRef);
        setNotes(notes.filter((item) => item.id !== id));
      } catch (err) {
        console.error("ERROR:", err);
      }
    }, 200);
  };

  const handleFormState = () => {
    setIsVisible((current) => !current);
  };

  return (
    <>
      <Navbar />
      <article id="notes-page-container">
        <AddNote isVisible={isVisible} handleFormState={handleFormState} />
        <NotesList
          isVisible={isVisible}
          notes={notes}
          deleteNote={handleDeleteNote}
          setIsVisible={setIsVisible}
        />
        {isVisible ? (

          <img onClick={handleFormState} className="notes-add-button" src={PlusButton} alt="add-note"></img>

        ) : null}

      </article>
    </>
  );
};

export default Notes;
