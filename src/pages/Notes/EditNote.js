import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import { db } from "../../firebase/Firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import NotesForm from "../../components/Forms/NotesForm";
import NotesErrorMsg from "../../components/Modals/NotesErrorMsg";


const NoteEdit = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { user } = UserAuth();
  const [isLoading, setisLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    text: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const canSave = [...Object.values(formData)].every(Boolean);


  const getNoteToUpdate = async () => {
    const noteToUpdateRef = doc(db, "users", user.uid, "notes", noteId);
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
     if (!canSave) {
       setErrorMsg(true);
       setTimeout(() => {
         setErrorMsg(false);
       }, 3000);
       return;
     }
    const noteToUpdateRef = doc(db, "users", user.uid, "notes", noteId);

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
      text: "",
    });
    navigate("/notes");
  };

  const handleChange = (e) => {
    setErrorMsg(false)
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    navigate(-1);
  };

  if (isLoading && !formData) return <p>Loading</p>;
  return (
    <>
      <Navbar />
      <NotesForm
        formData={formData}
        handleChange={handleChange}
        handleCancel={handleCancelEdit}
        handleSubmit={handleUpdateNote}
        canSave={canSave}
      />
      {errorMsg && <NotesErrorMsg />}
    </>
  );
};

export default NoteEdit;
