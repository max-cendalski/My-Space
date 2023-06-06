import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PinL from "../../icons/PinL.png";
import TrashL from "../../icons/trashL.png";
import Close from "../../icons/closeS.png";
import Pencil from "../../icons/pencilS.png";

const NotesList = ({ isVisible, notes, deleteNote }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchedNotes, setSearchedNotes] = useState(notes)

  useEffect(() => {
    setSearchedNotes(notes)
  }, [notes])

  const handleCloseButton = (e) => {
    e.stopPropagation();
    setSelectedNote(null);
  };
  if (!isVisible) {
    return null;
  }

  const handleSelected = (e) => {
    e.stopPropagation();
    setSelectedNote(null);
  };

  const handleNoteSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();

    setSearchedNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery)
      )
    );
  };

  return (
    <>
      <article className="notes-list-container">
        <section className="notes-search-section">
          <input
            type="search"
            placeholder="search notes"
            className="notes-search-input"
            onChange={handleNoteSearch}
          ></input>
        </section>
        {searchedNotes.map((note) => (
          <section
            className={`single-note-container ${note.toBeRemoved ? "note-to-be-removed" : ""
              } `}
            key={note.id}
            onClick={() => {
              setSelectedNote(note);
            }}
          >
            <section>
              <img className="notes-pin" alt="pin" src={PinL} height="20px" />
              <h4 className="single-note-header-list">
                {note.title.substr(0, 10) + "..."}
              </h4>
              <p className="single-note-text-small">
                {note.text.substr(0, 30) + "..."}
              </p>
            </section>
            <article>
              <article id="notes-dialog-container">
                {selectedNote && note.id === selectedNote.id ? (
                  <dialog open>
                    <img
                      className="note-close-button"
                      src={Close}
                      alt="x-icon"
                      onClick={handleCloseButton}
                    />
                    <h4 className="dialog-note-header-list">{note.title}</h4>
                    <p className="dialog-note-text-small">{note.text}</p>
                    <p className="date-paragraph">Created: {note.date}</p>
                    <footer onClick={handleSelected} className="note-footer">
                      <Link className="edit-link" to={`/notes/edit/${note.id}`}>
                        <img
                          className="note-pencil"
                          src={Pencil}
                          alt="pencil-icon"
                        />
                      </Link>
                      <img
                        className="note-trash"
                        src={TrashL}
                        alt="trash-icon"
                        onClick={() => deleteNote(note.id)}
                      />
                    </footer>

                  </dialog>
                ) : <dialog></dialog>}
              </article>
            </article>
          </section>
        ))}
      </article>
      <article onClick={handleCloseButton} className={`${selectedNote ? "overlay" : "hidden"}`}></article>
    </>
  );
}

export default NotesList;
