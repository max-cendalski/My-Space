import { useState, useEffect } from "react"
import { collection, deleteDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/Firebase";
import { UserAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar"

export default function Account() {
    const { user } = UserAuth()
    const [userStats, setUserStats] = useState({
        notes: 0,
        todos: 0,
        calendar: 0,
        weather: 0,
        games: 0
    })
    const [isLoading, setIsLoading] = useState(true)


    const [dialogStatus, setDialogStatus] = useState(false);

    useEffect(() => {
        async function getCollections() {
            try {
                const notesSnapshot = await getDocs(collection(db, "users", user.uid, "notes"))
                const todosSnapshot = await getDocs(collection(db, "users", user.uid, "todos"))
                const calendarSnapshot = await getDocs(collection(db, "users", user.uid, "calendarEvents"))
                const weatherSnapshot = await getDocs(collection(db, "users", user.uid, "weatherLocations"))
                setUserStats(prevState => ({
                    ...prevState,
                    notes: notesSnapshot.size,
                    todos: todosSnapshot.size,
                    calendar: calendarSnapshot.size,
                    weather: weatherSnapshot.size
                }))
            } catch (err) {
                console.error('error', err)
            }
        }

        async function getGameData() {
            const rpsRef = doc(db, "users", user.uid, "games", "rps")
            const rpsSnap = await getDoc(rpsRef)
            if (rpsSnap.exists()) {
                let total = rpsSnap.data().computer + rpsSnap.data().user
                setUserStats(prevState => ({ ...prevState, games: total }))
            } else {
                console.log('No such document!')
            }
        }
        Promise.all([getGameData(), getCollections()]).then(() => setIsLoading(false));
    }, [user.uid])





    const handleDeleteClick = () => {
        setDialogStatus(true);
    };

    const handleConfirm = () => {
        console.log("Account deleted");
        setDialogStatus(false);
    };

    const handleClose = () => {
        setDialogStatus(false);
    };
    return (
        <>
            <article>
                <Navbar />
                {isLoading && (<p className="loading-notification">Loading...</p>)}
                {!isLoading && (
                    <article id="account-container">
                        <h1>My Account</h1>
                        <section className="account-single-section">
                            <h2>Notes</h2>
                            {userStats.notes ? <p>You have penned down <span className="user-stats-number">{userStats.notes}</span> notes.</p> : <p>You don't have any notes</p>}
                        </section>
                        <section className="account-single-section">
                            <h2>Todos</h2>
                            {userStats.todos ? <p> There are <span className="user-stats-number">{userStats.todos}</span> tasks on your Todo list.</p> : <p>There are no tasks on your Todo list.</p>}
                        </section>
                        <section className="account-single-section">
                            <h2>Calendar</h2>
                            {userStats.calendar ? <p>Your calendar has <span className="user-stats-number">{userStats.calendar}</span> events marked.</p> : <p>Your calendar doesn't have any events marked</p>}
                        </section>
                        <section className="account-single-section">
                            <h2>Weather</h2>
                            {userStats.weather ? <p>You've set up <span className="user-stats-number">{userStats.weather}</span> locations in the Weather section.</p> : <p>You haven't set up any locations in the Weather section yet</p>}
                        </section>
                        <section className="account-single-section">
                            <h2>Games</h2>
                            {userStats.games ? <p>You've played <span className="user-stats-number">{userStats.games}</span> times in the RPS game.</p> : <p>You haven't played the RPS game yet.</p>}
                        </section>
                        <section id="delete-account-section">
                            <h3>Delete Your Account</h3>
                            <p>Once you delete your account, you will permanently lose all saved data and this cannot be undone.</p>
                            <button onClick={handleDeleteClick} className="delete-account-button">Delete Account</button>
                            {dialogStatus &&
                                <section id="delete-account-dialog-wrapper">
                                    <dialog open>
                                        <h3>Delete Your Account</h3>
                                        <p>Are you sure you want to delete your account? This process cannot be undone.</p>
                                        <button onClick={handleClose} className="close-dialog-account">Cancel</button>
                                        <button onClick={handleConfirm} className="confirm-delete-account-button">Confirm</button>
                                    </dialog>
                                </section>

                            }
                        </section>
                    </article>

                )}

            </article>

        </>
    )
}
