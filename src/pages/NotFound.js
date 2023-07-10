import GoBack from "../components/GoBack/GoBack";
import Icon404 from "../../src/icons/404-error.png"

const Notfound = ()=> {
    return (
        <article id="not-found-container">
        
            <img className="not-found-image" src={Icon404} alt="not-found"></img>
            <h1>Oops page not found!</h1>
            <GoBack />
        </article>
    )
}

export default Notfound;