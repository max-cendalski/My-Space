
import React, { useEffect, useRef } from "react";


const CalDialogCreate = ({ showDialog, onClose, content, onConfirm }) => {
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

  export default CalDialogCreate;
  
    // const CalDialogCreate = ({ isOpen, onClose, onSubmit }) => {
    //     if (!isOpen) return null;
    //     return (
    //         <article className="dialog-calendar">
    //             <h3>Add new event</h3>
    //             <form className='calendar-add-event-form' onSubmit={event => {
    //                 event.preventDefault();
    //                 onSubmit(event.target.elements.title.value);
    //             }}>
    //                 <p>
    //                     <input type="text" name="title" />
    //                     <button className="calendar-create-event-button" type="submit">Create event</button>
    //                 </p>
    //             </form>

    //         </article>
    //     );
    // };

    // export default CalDialogCreate;

