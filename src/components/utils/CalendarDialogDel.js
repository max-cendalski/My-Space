import React, { useEffect, useRef } from "react";


const CalendarDialogDel = ({ showDialog, onClose, content, onConfirm }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    showDialog
      ? dialogRef.current.showModal()
      : dialogRef.current.open && dialogRef.current.close();
  }, [showDialog]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  }

  return (
    <article id="dialog-delete-event">
      <dialog ref={dialogRef}>
        <p>Are you sure you want to delete that event?</p>
        <footer className="dialog-delete-event-footer">
          <button className="calendar-close-dialog-button" onClick={onClose}>Close</button>
          <button onClick={handleConfirm}>Delete </button>
        </footer>
      </dialog>
    </article>
  );
};

export default CalendarDialogDel


