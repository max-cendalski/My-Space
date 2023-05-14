import { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import NotesList from "../../components/Notes/NotesList";
import AddNoteForm from "../../components/Notes/AddNoteForm";

const Notes = () => {
  const { user } = UserAuth();
  const [notes, setNotes] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  /*   const getNotes = async () => {
    try {
      const notesData = await getDocs(collection(db, `users/${user.uid}`, 'notes'));
      setNotes(notesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.error("ERROR", err);
    }
  }; */

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, `users/${user.uid}`, "notes"),
      (snapShot) => {
        let notesList = [];
        snapShot.docs.forEach((doc) => {
          notesList.push({ id: doc.id, ...doc.data() });
        });
        setNotes(notesList);
      },
      (err) => {
        console.log(err);
      }
    );

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, []);

  const handleDeleteNote = async (id) => {
    console.log("id", id);

    // try {
    //   const noteRef = doc(db, "users", user.uid, "notes", id);
    //   await deleteDoc(noteRef);
    //   setNotes(notes.filter((item) => item.id !== id));
    // } catch (err) {
    //   console.error("ERROR:", err);
    // }
  };

  const handleFormState = () => {
    setIsVisible((current) => !current);
  };

  return (
    <>
      <Navbar />
      <article id="notes-list-container">
        <AddNoteForm isVisible={isVisible} handleFormState={handleFormState} />
        <NotesList
          isVisible={isVisible}
          notes={notes}
          deleteNote={handleDeleteNote}
        />
        {isVisible ? (
          <button onClick={handleFormState} className="notes-add-button">
            <i className="fa-solid fa-plus fa-2xl"></i>
          </button>
        ) : null}
      </article>
    </>
  );
};

export default Notes;
