import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IoArrowBackOutline, IoExitOutline } from "react-icons/io5";

interface myProps {
  setReceipt: Dispatch<SetStateAction<boolean>>;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const ReceiptModal = ({ setReceipt, setModal }: myProps) => {
  const [items, setItems] = useState([]);

  const exitReceipt = () => {
    setReceipt((prev) => !prev);
  };

  const saveReceipt = () => {
    setModal((prev) => !prev);
  };

  const closeModal = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setItems(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className='lg:w-[780px] w-full h-2/3 bg-green-600 flex flex-col fixed rounded overflow-hidden'>
      <div className='w-full h-fit flex justify-between items-center py-2 px-4 border-b border-gray-400'>
        <div className='flex w-fit h-fit gap-8 items-center'>
          <button
            className='h-fit flex items-center text-[20px]'
            onClick={exitReceipt}
          >
            <IoArrowBackOutline />
          </button>
          <p>Reciept modal.</p>
        </div>

        <div className='flex w-fit h-fit gap-8 items-center'>
          <button
            // onClick={saveReceipt}
            className='px-5 py-2 h-fit bg-blue-400 hover:bg-opacity-85 rounded flex items-center'
          >
            Save
          </button>
          <button
            className='h-fit flex items-center text-[20px]'
            onClick={closeModal}
          >
            <IoExitOutline />
          </button>
        </div>
      </div>
      <div className='modal-content bg-white w-full h-fit px-4 overflow-y-auto'>
        <div className='bg-gray-200 w-full h-fit p-4'>
          <div className='flex flex-col h-full w-full rounded-t-md'>
            {/* Content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
