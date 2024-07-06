import React, { useState } from "react";
import Modal from "./Modal";

const ModalButton: React.FC = () => {
  const [modal, setModal] = useState(false);
  const showmodal = () => {
    setModal((prev) => !prev);
    console.log(modal);
  };

  return (
    <>
      {!modal ? (
        <button
          onClick={showmodal}
          className="px-3 py-2 rounded text-[17px] bg-white hover:bg-gray-400 ease-in-out duration-300"
        >
          Click
        </button>
      ) : (
        <Modal setModal={setModal} />
      )}
    </>
  );
};

export default ModalButton;
