import { useState } from "react";
import { Link } from "react-router-dom";
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
            note.toBeRemoved ? `note-to-be-removed` : ""
          } `}
          key={note.id}
          onClick={() => {
            setSelectedNote(note);
          }}
        >
          <section>
            <img className="notes-pin" alt="pin" src={PinL} height="20px" />
            <h4 className="note-header-list">
              {note.title.substr(0, 10) + "..."}
            </h4>
            <p className="notes-text-small">
              {note.text.substr(0, 20) + "..."}
            </p>
          </section>
          {selectedNote && note.id === selectedNote.id && (
            <img
              className="note-close"
              src={Close}
              alt="x"
              onClick={handleCloseButton}
            />
          )}
          {selectedNote && note.id === selectedNote.id && (
            <article className="selected-note">
              <h4 className="note-header-list">{note.title}</h4>
              <p className="notes-text-small">{note.text}</p>
              <p className="date-paragraph">Created: {note.date}</p>
              <footer className="note-footer">
                <Link className="edit-link" to={`/notes/edit/${note.id}`}>
                  <img className="note-pencil" src={Pencil} alt="pencil-icon" />
                </Link>
                <img
                  className="note-trash"
                  src={TrashL}
                  alt="trash-icon"
                  onClick={() => deleteNote(note.id)}
                />
              </footer>
            </article>
          )}
        </section>
      ))}
    </article>
  );
};

export default NotesList;
