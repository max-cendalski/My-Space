

const NotesForm = ({ formData, handleChange, handleCancel, handleSubmit, inputRef }) => {

  return (
    <article className="notes-form-container">
      <form className="note-form">
        <p className="field">
          <label className="label-standard" htmlFor="title">
            Title
          </label>
          <input
            ref={inputRef}
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
        </p>
        <textarea
          type="textarea"
          name="text"
          value={formData.text}
          onChange={handleChange}
        />
      </form>
      <footer className="notes-form-footer">
        <button className="note-form-button note-cancel-button" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="note-form-button note-submit-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </footer>
    </article>
  );
};

export default NotesForm;
