import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import GoBack from "../GoBack/GoBack";
import ShipsComputerArea from "./shipCompArea";

const ShipsGame = () => {
  return (
    <>
      <Navbar />
      <GoBack />

      <ShipsComputerArea />
    </>
  );
};

export default ShipsGame;
