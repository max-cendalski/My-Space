
const NotesForm = ({formData, handleChange,handleCancel,handleSubmit,canSave}) => {


  return (
    <article className="notes-form-container">
      <form className="note-form">
        <p className="field">
          <label className="label-standard" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </p>
        <p className="field">
          <label className="label-standard" htmlFor="text">
            Text
          </label>
          <textarea
            type="textarea"
            name="text"
            value={formData.text}
            onChange={handleChange}
          />
        </p>
      </form>
      <footer className="notes-form-footer">
        <button className="note-button note-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="note-button note-submit-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </footer>
    </article>
  );
};

export default NotesForm;
