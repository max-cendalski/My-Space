import Navbar from "../../components/Navbar/Navbar"

const Notes = () => {

  const handleAddNote = () => {
    console.log('whee')
  }
  return (
    <article className="notes-page-container">
      <Navbar />
      <button onClick={handleAddNote}>Add Note</button>
    </article>
  )
}

export default Notes
