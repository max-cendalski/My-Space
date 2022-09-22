import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import NotesList from "../../components/Notes/NotesList";
import AddNoteForm from "../../components/Notes/AddNoteForm";

const Notes = () => {
  const { user } = UserAuth();
  /*   const [formData, setFormData] = useState({
    title: "",
    text: "",
    date: "",
  }) */ const [notes, setNotes] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  //const canSave = [...Object.values(formData)].every(Boolean);

  const getNotes = async () => {
    try {
      const notesData = await getDocs(
        collection(db, `users/${user.uid}`, "notes")
      );
      setNotes(notesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (e) {
      console.error("ERROR", e);
    }
  };

  /*   const handleAddNote = (e) => {
    e.preventDefault();
    const addNote = async () => {
      try {
        await addDoc(collection(db, "users", `${user.uid}`, "notes"), formData);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    };
    addNote();
    setFormData({
      title: "",
      text: "",
      date: "",
    });
    getNotes();
  };
 */
  /*   const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }; */

  const handleDeleteNote = (id) => {
    const deleteNote = async () => {
      const noteRef = doc(db, "users", `${user.uid}`, "notes", id);
      await deleteDoc(noteRef);
    };
    deleteNote();
    getNotes();
  };

  const handleEditNote = (id) => {
    console.log("whe");
  };

  const handleFormState = () => {
    setIsVisible(current => !current)
    console.log('visible',isVisible)
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <article className="notes-page-container">
      <Navbar />
      <button onClick={handleFormState}>Add Note</button>
      <NotesList
        notes={notes}
        deleteNote={handleDeleteNote}
        editNote={handleEditNote}
      />
      <AddNoteForm isVisible={isVisible} handleFormState={handleFormState} />
    </article>
  );
};

export default Notes;
