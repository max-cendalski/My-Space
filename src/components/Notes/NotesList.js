import { Link } from "react-router-dom";

const NotesList = ({ isVisible,notes, deleteNote }) => {
  return (
    <article id="notes-page-container">
      {notes.map((note) => (
        <article className="single-note-container" key={note.id}>
          <section>
            <p>{note.title}</p>


          </section>
        </article>
      ))}
    </article>
  );
};

export default NotesList;



//<p className="date-paragraph">Created: {note.date}</p>;


    // <footer className="single-note-footer">
    //   <button className="delete-button" onClick={() => deleteNote(note.id)}>
    //     Delete
    //   </button>
    // </footer>;


      // <Link className="edit-link" to={`/notes/edit/${note.id}`}>
      //   <p>{note.text}</p>
      // </Link>;
