import { useParams, useNavigate } from "react-router-dom";
import {useState} from 'react'
import {UserAuth} from "../../context/AuthContext"
import AddNoteForm from "../../components/Notes/AddNoteForm";
import Navbar from "../../components/Navbar/Navbar";
import db from '../../firebase/Firebase';
import {addDoc, collection} from 'firebase/firestore'


const NoteEdit = () => {
  const {noteId} = useParams()
  const navigate = useNavigate()

  const { user } = UserAuth();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    date: "",
  });


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
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  return (
    <article>
      <Navbar />
      <form className="edit-note-form">
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
        <button onClick={handleAddNote}>
          Add Note
        </button>
      </form>
    </article>
  );
}

export default NoteEdit;
