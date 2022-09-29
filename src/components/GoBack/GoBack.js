
import { useNavigate } from "react-router-dom"

const GoBack = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <i
      onClick={handleGoBack}
      className="back-arrow fa-solid fa-arrow-left fa-xl"
    ></i>
  );
}


export default GoBack;
