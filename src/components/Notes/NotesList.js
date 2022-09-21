const NotesList = ({ notes, deleteNote }) => {
  return (
    <article>
      {notes.map((note) => (
        <section className="single-note-container" key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.text}</p>
          <p>{note.date}</p>
          <button className="edit-button" onClick={() => deleteNote(note.id)}>
            Edit
          </button>

          <button className="delete-button" onClick={() => deleteNote(note.id)}>
            Delete
          </button>
        </section>
      ))}
    </article>
  );
};

export default NotesList;
