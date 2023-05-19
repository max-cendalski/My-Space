import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import { db } from '../../firebase/Firebase';
import { updateDoc, doc, getDoc } from 'firebase/firestore';

const NoteEdit = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [isLoading, setisLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    text: ""
  });

  const getNoteToUpdate = async () => {
    const noteToUpdateRef = doc(db, 'users', user.uid, 'notes', noteId);
    try {
      const docSnap = await getDoc(noteToUpdateRef);
      setFormData(docSnap.data());
    } catch (e) {
      console.error("ERROR:", e);
    }
    setisLoading(false);
  };

  useEffect(() => {
    getNoteToUpdate();
    //eslint-disable-next-line
  }, []);

  const handleUpdateNote = (e) => {
    e.preventDefault();
    const noteToUpdateRef = doc(db, 'users', user.uid, 'notes', noteId);

    const addNote = async () => {
      try {
        await updateDoc(noteToUpdateRef, formData);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    };
    addNote();
    setFormData({
      title: "",
      text: ""
    });
    navigate("/notes");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGoBack = () => {
    navigate(-1)
  }

  if (isLoading && !formData) return <p>Loading</p>
  return (
    <article>
      <Navbar />
      <article id="edit-note-container">

        <form className="note-form">
          <p className="field">
            <label className="label-standard" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </p>
          <p className="field">
            <label className="label-standard" htmlFor="text">
              Text
            </label>
            <textarea
              type="textarea"
              name="text"
              value={formData.text}
              onChange={handleChange}
            />
          </p>
          <button onClick={handleUpdateNote}>Submit</button>
        </form>
      </article>
    </article>
  );
};

export default NoteEdit;
