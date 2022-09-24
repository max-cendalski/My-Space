import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { UserAuth } from '../../context/AuthContext';
import DateToSave from '../../utils/Date';

const AddNoteForm = ({isVisible,  handleFormState}) => {
  const { user } = UserAuth();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    date: "",
  });

  const canSave = [...Object.values(formData)].every(Boolean);

  const handleAddNote = (e) => {
    e.preventDefault();
    const addNote = async () => {
      try {
        await addDoc(collection(db, 'users', user.uid, 'notes'), formData);
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
    handleFormState()
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
      <form className={isVisible ? "invisible" : "add-note-form"}>
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
    </article>
  );
};

export default AddNoteForm;
