import { useState, useEffect, useRef } from "react";
import Navbar from "../../Navbar/Navbar";
import GoBack from "../../GoBack/GoBack";
import ShipsComputerArea from "./computerArea";

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
