import { useState, useEffect} from "react"
import { collection, addDoc, getDocs } from "firebase/firestore"
import {db} from "../../firebase/Firebase"
import { UserAuth } from "../../context/AuthContext"
import Navbar from "../../components/Navbar/Navbar"
import NotesList from "../../components/Notes/Notes"

const Notes = () => {
  const {user}  = UserAuth()
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    date: ''
  })
  const [notes, setNotes] = useState([])
  const canSave = [...Object.values(formData)].every(Boolean)




 const getNotes = async() => {
  const notesCollectionRef = collection(db, `users/${user.uid}`,'notes')
  const notesData = await getDocs(notesCollectionRef)
  setNotes(notesData.docs.map((doc) =>({...doc.data(), id: doc.id})))
 }

  useEffect(()=> {
    getNotes()
  },[])

  const handleAddNote = e => {
    e.preventDefault()
    const addNote = async() => {
      try {
        await addDoc(collection(db, "users", `${user.uid}`,"notes"),{formData})
      } catch(e) {
        console.error("Error adding document:" ,e)
      }
    }
    addNote()
    setFormData({
      title: '',
      text: '',
      date: ''
    })
  }

  const handleChange = e => {
    const name = e.target.name
    const value = e.target.value

    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }))
  }

  return (
    <article className="notes-page-container">
      <Navbar />
      <button className="add-note-button" onClick={handleAddNote}>Add Note</button>
      <form>
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
          <input
            type="text"
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
        <button onClick={handleAddNote} disabled={!canSave}>Submit</button>
      </form>
      <NotesList data={notes}/>
    </article>
  )
}

export default Notes
