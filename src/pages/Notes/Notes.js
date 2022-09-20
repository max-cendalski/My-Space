import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar/Navbar"

const Notes = () => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    date: ''
  })

  const handleAddNote = e => {
    e.preventDefault()
    console.log('formData',formData)
  }


    const handleChange = e => {
        const type = e.target.type
        const name = e.target.name
        const value = e.target.value

        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const canSave = [...Object.values(formData)].every(Boolean)

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
    </article>
  )
}

export default Notes
