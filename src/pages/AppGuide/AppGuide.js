import Navbar from "../../components/Navbar/Navbar";
import NotesIcon from "../../icons/notes-icon.png"
import CalendarIcon from "../../icons/calendar-icon.png";
import PlusIcon from "../../icons/plus-icon.png";
import PencilIcon from "../../icons/pencilS.png";
import TrashIcon from "../../icons/trash-icon.png";


const AppGuide = () => {
    return (
        <>
        <Navbar />
        <article id="app-guide-container">
            <h1> App Guide</h1>
            <section className="app-guide-section-container">
                <img src = {NotesIcon} className="icon-app-guide" alt="notes-icon"></img>
                <p>To access the Notes section, simply tap the large Notes icon on the Homepage.
                   In this section, you can jot down your thoughts and ideas. Each note has a title and text.
                   To add a note, tap the <img src={PlusIcon} className="icon-within-text" alt="plus-icon"></img> at the bottom of the screen.
                   To edit a note, begin by selecting the desired note from the note list and then tap <img src={PencilIcon} className="icon-within-text" alt="pencil-icon"></img>.
                   If you want to remove a note, simply tap <img src={TrashIcon} className="icon-within-text" alt="pencil-icon"></img> </p>
            </section>
            <section className="app-guide-section-container">
            <img src = {CalendarIcon} className="icon-app-guide" alt="notes-icon"></img>
            <p>To access the Notes section, simply tap the large Notes icon on the Homepage.
             In this section, you can jot down your thoughts and ideas. Each note has a title and text.
              To add a note, tap the plus icon at the bottom of the screen.
              To edit a note, begin by selecting the desired note from the note list and then tap the pen icon.
               If you want to remove a note, simply tap the trash icon </p>
        </section>
        </article>
        </>

    )
}

export default AppGuide;