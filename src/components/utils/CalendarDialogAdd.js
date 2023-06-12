import React, { useEffect, useRef } from "react";


const CalendarDialogCreate = ({ showDialog, onClose, onSubmit }) => {
  const dialogRef = useRef(null);
  const inputRef = useRef(null)

  useEffect(() => {
    showDialog
      ? dialogRef.current.showModal()
      : dialogRef.current.open && dialogRef.current.close();
  }, [showDialog]);


  return (
    <article id="dialog-add-event-container">
      <dialog ref={dialogRef}>
        <h3>Add new event</h3>
        <form className='calendar-add-event-form'
          onSubmit={event => {
            event.preventDefault();
            let data = event.target.title.value
            if (data) {
              onSubmit(data)
              inputRef.current.value = ''
            }
          }}>
          <p>
            <input type="text" name="title" ref={inputRef} />
            <button className="calendar-add-event-form-button" type="submit">Create event</button>
          </p>
          <footer>
          <button
            className="calendar-close-dialog-button"
            onClick={() => {
              onClose();
              inputRef.current.value = '';
            }} >Close</button>
        </footer>
        </form>
      </dialog>
    </article>
  );
};

export default CalendarDialogCreate;

