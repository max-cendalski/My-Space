import React, { useEffect, useRef } from "react";

const CalDialogDel = ({ showDialog, onClose, content, onConfirm }) => {
  const dialogRef = useRef(null);

  // useEffect(() => {
  //   if (showDialog) {
  //     dialogRef.current.showModal();
  //   } else {
  //     if (dialogRef.current.open) {
  //       dialogRef.current.close();
  //     }
  //   }
  // }, [showDialog]);


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
    <article className="dialog-delete-event">
      <dialog ref={dialogRef}>
        <p>{content}</p>
        <footer className="dialog-delete-event-footer">
          <button onClick={onClose}>Close</button>
          <button onClick={handleConfirm}>Delete </button>
        </footer>

      </dialog>
    </article>
  );
};

export default CalDialogDel
