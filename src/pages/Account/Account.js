import { useState, useEffect } from "react"
import { collection, getDocs,getDoc, doc } from "firebase/firestore";
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

    useEffect(() => {
        async function getNotesRef() {
            try {
                const notesSnapshot = await getDocs(collection(db, "users", user.uid, "notes"))
                const todosSnapshot = await getDocs(collection(db, "users", user.uid, "todos"))
                const calendarSnapshot = await getDocs(collection(db, "users", user.uid, "calendarEvents"))
                const weatherSnapshot = await getDocs(collection(db, "users", user.uid, "weatherLocations"))
                const rpsRef = doc(db,"users",user.uid, "games","rps")
                const  rpsSnap = await getDoc(rpsRef)
                console.log('rps',rpsSnap)
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
        getNotesRef()

    }, [user.uid])

    return (
        <>
            <Navbar />
            <article id="account-container">

                <h1>My Account</h1>
                <section className="account-single-section">
                    <h2>Notes</h2>
                    <p>You have penned down <span className="user-stats-number">{userStats.notes}</span> notes.</p>
                </section>
                <section className="account-single-section">
                    <h2>Todos</h2>
                    <p> There are <span className="user-stats-number">{userStats.todos}</span> task on your Todo list.</p>
                </section>
                <section className="account-single-section">
                    <h2>Calendar</h2>
                    <p>Your calendar has <span className="user-stats-number">{userStats.calendar}</span> events marked.</p>
                </section>
                <section className="account-single-section">
                    <h2>Weather</h2>
                    <p>You've set up <span className="user-stats-number">{userStats.weather}</span> locations in the Weather section.</p>
                </section>
                <section className="account-single-section">
                    <h2>Games</h2>
                    <p>You've played <span className="user-stats-number">{userStats.games}</span> times in the RPS game.</p>
                </section>
            </article>
        </>
    )
}