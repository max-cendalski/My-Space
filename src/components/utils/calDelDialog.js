import React, { useEffect, useRef } from "react";

const DialogDel = ({ showDialogDel, onClose, contentOne }) => {
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
    showDialogDel
      ? dialogRef.current.showModal()
      : dialogRef.current.open && dialogRef.current.close();
  }, [showDialog]);

  return (
    <dialog ref={dialogRef}>
      <article>
        <p>{contentOne}</p>
        <button onClick={onClose}>Close Dialog</button>
      </article>
    </dialog>
  );
};

export default DialogDel
