
import { Link } from 'react-router-dom';

const NotesList = ({ notes, deleteNote }) => {
  return (
    <article>
      {notes.map((note) => (
        <section className="single-note-container" key={note.id}>
          <h3 className="note-title">{note.title}</h3>
          <p className="text">{note.text}</p>
          <p className="date-paragraph">Created: {note.date}</p>
          <Link to={`/notes/edit/${note.id}`}>
            <button className="edit-button">Edit</button>
          </Link>
          <button className="delete-button" onClick={() => deleteNote(note.id)}>
            Delete
          </button>
        </section>
      ))}
    </article>
  );
};

export default NotesList;
