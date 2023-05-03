import { useState, useEffect, useRef } from "react";
import Navbar from "../../Navbar/Navbar";
import GoBack from "../../GoBack/GoBack";
import ShipsComputerArea from "./computerArea";
import ShipsUserArea from "./userArea";

const ShipsGame = () => {
  return (
    <>
      <Navbar />
      <GoBack />
      <ShipsComputerArea />
      <ShipsUserArea />
    </>
  );
};

export default ShipsGame;
