import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import NotesList from "../../components/Notes/NotesList";

const Notes = () => {
  const { user } = UserAuth();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    date: "",
  });
  const [notes, setNotes] = useState([]);
  const canSave = [...Object.values(formData)].every(Boolean);

  const getNotes = async () => {
    const notesData = await getDocs(collection(db, `users/${user.uid}`, "notes")
    );
    setNotes(notesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const handleAddNote = (e) => {
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteNote = (id) => {
    const deleteNote = async () => {
      const noteRef = doc(db, "users", `${user.uid}`, "notes", id);
      await deleteDoc(noteRef);
    };
    deleteNote();
    getNotes();
  };

  return (
    <article className="notes-page-container">
      <Navbar />
      <form className="add-note-form">
        <p>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="text">Text</label>
          <textarea
            type="textarea"
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
        </p>
        <p>
          <label htmlFor="date">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </p>
        <button onClick={handleAddNote} disabled={!canSave}>
          Add Note
        </button>
      </form>
      <NotesList notes={notes} deleteNote={handleDeleteNote} />
    </article>
  );
};

export default Notes;
