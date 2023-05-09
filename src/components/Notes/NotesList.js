import { Link } from "react-router-dom";
import PinL from "./../../PinL.png"



const NotesList = ({ isVisible,notes, deleteNote }) => {
  return (
    <article id="notes-page-container">
      {notes.map((note) => (
        <section
          className={`single-note-container ${
            isNaN(note.id.charAt(0))
              ? "single-note-container-tilt-left"
              : "single-note-container-tilt-right"
          }`}
          key={note.id}
        >
          <section>
            <img className="notes-pin" alt="pin" src={PinL} height="20px"/>
            <h5 className="notes-header-list">{note.title}</h5>
            <p className="notes-text-tiny">{note.text.substr(0,30)}...</p>
          </section>
        </section>
      ))}
    </article>
  );
};

export default NotesList;



//<p className="date-paragraph">Created: {note.date}</p>;


    // <footer className="single-note-footer">
    //           <button
    //             className="delete-button"
    //             onClick={() => deleteNote(note.id)}
    //           >
    //             Delete
    //           </button>
    //         </footer>

/*        <Link className="edit-link" to={`/notes/edit/${note.id}`}>
         <p>{note.text}</p>
       </Link>; */
