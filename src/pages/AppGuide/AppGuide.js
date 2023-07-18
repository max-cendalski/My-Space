import Navbar from "../../components/Navbar/Navbar";
import NotesIcon from "../../icons/notes-icon.png"
import CalendarIcon from "../../icons/calendar-icon.png";
import PlusIcon from "../../icons/plus-icon.png";
import PencilIcon from "../../icons/pencilS.png";
import TrashIcon from "../../icons/trash-icon.png";
import WeatherIcon from "../../icons/weather-icon.png";
import QuoteIcon from "../../icons/quote-icon.png";
import GamesIcon from "../../icons/games-icon.png";


const AppGuide = () => {
    return (
        <>
            <Navbar />
            <article id="app-guide-container">
                <h1>My-Space Guide</h1>
                <section className="app-guide-section-container">
                    <img src={NotesIcon} className="icon-app-guide" alt="notes-icon"></img>
                    <p>To access the Notes section, simply tap the large Notes icon on the Homepage.
                        In this section, you can jot down your thoughts and ideas. Each note has a title and text.
                        <br />
                        To add a note, tap the <img src={PlusIcon} className="icon-within-text" alt="plus-icon"></img> at the bottom of the screen.
                        To edit a note, begin by selecting the desired note from the note list and then tap <img src={PencilIcon} className="icon-within-text" alt="pencil-icon"></img>.
                        <br />
                        If you want to remove a note, simply tap <img src={TrashIcon} className="icon-within-text" alt="pencil-icon"></img>
                        <br />
                        Enjoy the convenience of managing your notes with ease in the Notes section of your app
                    </p>
                </section>
                <section className="app-guide-section-container">
                    <img src={CalendarIcon} className="icon-app-guide" alt="calendar-icon"></img>
                    <p>To use the Calendar feature, tap the Calendar icon on the Homepage.
                        Add events by tapping any day on the calendar and filling in the details. Edit events by selecting the day and tapping the event to modify its details.
                        <br />
                        To remove an event, tap the event and choose the Delete option. Enjoy managing your events with ease using the Calendar feature.
                        <br/>
                        Effortlessly manage your events using the Calendar feature and make the most of your scheduling.
                        </p>
                </section>
                <section className="app-guide-section-container">
                    <img src={WeatherIcon} className="icon-app-guide" alt="weather-icon"></img>
                    <p>To utilize the Weather feature in your app, simply tap the Weather icon on the Homepage.
                        In the Weather section, you can input the desired location by specifying the city and country. Add the location to the database by clicking <img src={PlusIcon} className="icon-within-text" alt="plus-icon"></img>.
                        <br />
                        Once added, you will be able to view detailed weather information for that location.
                        <br />
                        Furthermore, you have the option to add a specific location to the Homepage. In the location section, tap the "Add to Homepage" button located at the bottom.
                        This action will pin the chosen location to the Homepage for easy access.
                        <br />
                        Enjoy staying informed about the weather by utilizing the Weather feature in your app.</p>
                </section>
                <section className="app-guide-section-container">
                    <img src={QuoteIcon} className="icon-app-guide" alt="quote-icon"></img>
                    <p>To access the Quotes section in your app, click on the large icon with a face and bulb on the Homepage.
                        Inside the Quotes section, you can generate three new quotes once every three days. These quotes are designed to provide you with inspiration and motivation.
                        <br />
                        If you come across a quote that resonates with you, you have the option to add it to the Homepage. Simply select the desired quote from the generated list and click the "Add this Quote to Homepage" button.
                        This will pin the selected quote to the Homepage, allowing you to easily view and draw inspiration from it every day.
                        <br />
                        Enjoy the Quotes section in your app, where you can generate and add inspiring quotes to the Homepage for daily motivation and encouragement.</p>
                </section>
                <section className="app-guide-section-container">
                    <img src={GamesIcon} className="icon-app-guide" alt="games-icon"></img>
                    <p>To access the Games section in your app, simply click on the large computer icon located on the Homepage.
                        Inside the Games section, you can enjoy two exciting games: Tic Tac Toe and Rock Paper Scissors.
                        <br />
                        In the Tic Tac Toe game, you have the option to set different difficulty levels to challenge yourself.
                        Test your skills against the computer and see if you can emerge as the ultimate Tic Tac Toe champion.
                        <br />
                        In the Rock Paper Scissors game, your wins and losses will be tracked and added to the database.
                        Compete against the computer and strive to improve your win/loss ratio with each game played.
                        <br />
                        Have fun exploring the Games section of your app, where you can engage in the classic games of Tic Tac Toe and Rock Paper Scissors for hours of entertainment and friendly competition.</p>
                </section>
                <section className="app-guide-section-container">
                    <section className="icon-app-guide-quick-access">
                        <img src={PencilIcon} alt="pencil-icon"></img>
                    </section>
                    <p>To access the Todo List feature in your app, click on the pencil icon located on the quick access bar on the Homepage.
                        This will open a small form where you can add up to four todos at once. Simply enter your todos into the form and submit it.
                        <br />
                        Once submitted, a small todo list will appear under the clock on the Homepage.
                        This list will display your added todos, allowing you to keep track of your tasks.
                        <br />
                        To mark a todo as completed, click on the todo list itself.
                        This will expand the list, and you can then click on the individual todo that you have completed.
                        By doing so, you can easily manage and track your completed todos.
                        <br />
                        Enjoy the convenience of the Todo List feature in your app, which allows you to add, view, and mark todos as completed,
                        helping you stay organized and productive.</p>
                </section>
            </article>
        </>
    )
}

export default AppGuide;