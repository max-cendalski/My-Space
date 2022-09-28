import { Link } from "react-router-dom";

const NotesList = ({ isVisible,notes, deleteNote }) => {
  return (
    <article>
      {notes.map((note) => (
        <section
          className={!isVisible ? "invisible" : "single-note-container"}
          key={note.id}
        >
          <h2 className="note-title">{note.title}</h2>
          <Link className="edit-link" to={`/notes/edit/${note.id}`}>
            <p className="text">{note.text}</p>
          </Link>
          <footer className="single-note-footer">
            <p className="date-paragraph">Created: {note.date}</p>
            <button
              className="delete-button"
              onClick={() => deleteNote(note.id)}
            >
              Delete
            </button>
          </footer>
        </section>
      ))}
    </article>
  );
};

export default NotesList;
