import { useState } from "react";
import PinL from "../../icons/PinL.png";
import TrashL from "../../icons/trashL.png";
import Close from "../../icons/closeS.png";
import Pencil from "../../icons/pencilS.png";

const NotesList = ({ isVisible, notes, deleteNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const handleCloseButton = (e) => {
    e.stopPropagation();
    setSelectedNote(null);
  };
    if (!isVisible) {
      return null;
    }
  return (
    <article className="notes-page-container">
      {notes.map((note) => (
        <section
          className={`single-note-container ${
            isNaN(note.id.charAt(0))
              ? "single-note-container-tilt-left"
              : "single-note-container-tilt-right"
          } ${note === selectedNote ? "selected-note" : ""}  ${
            note.toBeRemoved ? "note-to-be-removed" : ""
          }`}
          key={note.id}
          onClick={() => {
            setSelectedNote(note);
          }}
        >

              {selectedNote && note.id === selectedNote.id ? (
            ""
              ) : (
                <img className="notes-pin" alt="pin" src={PinL} height="20px" />
              )}

              <h4 className="note-header-list">
                {" "}
                {selectedNote && note.id === selectedNote.id
                  ? note.title
                  : note.title.substr(0, 10) + "..."}{" "}
              </h4>

            <p className="notes-text-small">
              {selectedNote && note.id === selectedNote.id
                ? note.text
                : note.text.substr(0, 20) + "..."}{" "}
            </p>
            {selectedNote && note.id === selectedNote.id ? (
              <p className="date-paragraph">Created: {note.date}</p>
            ) : (
              ""
            )}
            {selectedNote && note.id === selectedNote.id && (
              <section>        <img
                  onClick={handleCloseButton}
                  className="note-close"
                  alt="close"
                  src={Close}
                />


              <footer className="note-footer">
                <img src={Pencil} alt="pencil" onClick={handleCloseButton} />
                <img
                  className="notes-trash"
                  src={TrashL}
                  alt="trash"
                  onClick={() => deleteNote(note.id)}
                />
              </footer>
              </section>
            )}

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
