import React, { useState } from "react";
import "./App.css";
import ModalButton from "./components/ModalButton";

const App: React.FC = () => {
  return (
    <div className="bg-gray-700 w-full h-screen flex items-center place-content-center">
      <ModalButton />
    </div>
  );
};

export default App;
