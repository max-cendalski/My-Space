import React, { useEffect, useRef } from "react";


const CalDialogCreate = ({ showDialog, onClose, onSubmit }) => {
  const dialogRef = useRef(null);
  const inputRef = useRef(null)

  useEffect(() => {
    showDialog
      ? dialogRef.current.showModal()
      : dialogRef.current.open && dialogRef.current.close();
  }, [showDialog]);


  return (
    <article className="dialog-delete-event">
      <dialog ref={dialogRef}>
        <h3>Add new event</h3>
        <form className='calendar-add-event-form'
          onSubmit={event => {
            event.preventDefault();
            if (event.target.elements.title.value) {
              onSubmit(event.target.elements.title.value)
              inputRef.current.value = ''
            }
          }}>
          <p>
            <input type="text" name="title" ref={inputRef} />
            <button onClick={() => {
              onClose();
              inputRef.current.value = '';  // clear the input
            }} className="calendar-close-dialog-button">Close</button>
            <button className="calendar-create-event-button" type="submit">Create event</button>
          </p>
        </form>
      </dialog>
    </article>
  );
};

export default CalDialogCreate;

