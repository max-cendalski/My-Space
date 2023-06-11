import React, { useEffect, useRef } from "react";

const CalDialogDel = ({ showDialog, onClose, content,onConfirm }) => {
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
    <dialog ref={dialogRef}>
      <article>
        <p>{content}</p>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={onClose}>Close Dialog</button>
      </article>
    </dialog>
  );
};

export default CalDialogDel
