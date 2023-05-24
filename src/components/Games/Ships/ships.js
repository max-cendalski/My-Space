import { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import GoBack from "../../GoBack/GoBack";
import ShipsComputerArea from "./computerArea";
import ShipsUserArea from "./userArea";

const ShipsGame = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      <Navbar />
      <GoBack />
      {isLoaded && (
        <article>
          <ShipsComputerArea />
          <ShipsUserArea />
        </article>
      )}
    </>
  );
};

export default ShipsGame;
