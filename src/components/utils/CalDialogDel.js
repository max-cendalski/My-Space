import React, { useEffect, useRef } from "react";

const CalDialogDel = ({ showDialog, onClose, content }) => {
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

  return (
    <dialog ref={dialogRef}>
      <article>
        <p>{content}</p>
        <button onClick={onClose}>Close Dialog</button>
      </article>
    </dialog>
  );
};

export default CalDialogDel
