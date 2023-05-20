import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import { format } from "date-fns";
import NotesForm from "../../components/Forms/NotesForm";
import NotesErrorMsg from "../Modals/NotesErrorMsg";

const AddNote = ({ isVisible, handleFormState }) => {
  const { user } = UserAuth();
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    date: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);

  const canSave = [...Object.values(formData)].every(Boolean);

  const handleAddNote = (e) => {
    if (!canSave) {
      setErrorMsg(true);
      setTimeout(()=> {
        setErrorMsg(false)
      },3000)
      return;
    }
    const addNote = async () => {
      try {
        await addDoc(collection(db, "users", user.uid, "notes"), formData);
      } catch (e) {
        console.error("Error adding document:", e);
      }
    };
    addNote();
    handleFormState();
    setFormData({
      title: "",
      text: "",
      date: "",
    });
  };

  const handleChange = (e) => {
    setErrorMsg(false)
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      date: format(new Date(), "PP"),
    }));
  };

  return (
    <article className={isVisible ? "hidden" : "notes-form-container"}>
      <NotesForm
        formData={formData}
        handleChange={handleChange}
        handleCancel={handleFormState}
        handleSubmit={handleAddNote}
        canSave={canSave}
      />
      {errorMsg && <NotesErrorMsg />}
    </article>
  );
};

export default AddNote;
