import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import { format } from "date-fns";

const AddNoteForm = ({ isVisible, handleFormState }) => {
  const { user } = UserAuth();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    date: format(new Date(), "PP"),
  });

  const canSave = [...Object.values(formData)].every(Boolean);

  const handleAddNote = (e) => {
    e.preventDefault();
    const addNote = async () => {
      try {
        await addDoc(collection(db, "users", user.uid, "notes"), formData);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    };
    addNote();
    setFormData({
      title: "",
      text: "",
    });
    handleFormState();
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
      <form className={isVisible ? "invisible" : "note-form"}>
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
        <button onClick={handleAddNote} disabled={!canSave}>
          Add Note
        </button>
      </form>
    </article>
  );
};

export default AddNoteForm;
