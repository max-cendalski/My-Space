import Navbar from "../../components/Navbar/Navbar"

export default function Account() {
    return (
        <>
            <Navbar />
            <article id="account-container">

                <h1>My Account</h1>
                <section className="account-single-section">
                    <h2>Notes</h2>
                </section>
                <section className="account-single-section">
                    <h2>Todos</h2>
                </section>
                <section className="account-single-section">
                    <h2>Calendar</h2>
                </section>
                <section className="account-single-section">
                    <h2>Weather</h2>
                </section>
            </article>
        </>
    )
}