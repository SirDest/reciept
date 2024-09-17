import React, { Dispatch, SetStateAction, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import TableComponent from "./TableComponent";
import ReceiptModal from "./ReceiptModal";
import User from "./User";

interface myProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setModal }: myProps) => {
  const [receipt, setReceipt] = useState(false);

  const [rows, setRows] = React.useState<
    {
      date: string;
      selected: string;
      selectedAmount: { duration: string; amount: string };
      originalValue: { duration: string; amount: string };
    }[]
  >([]);

  const showmodal = () => {
    setModal((prev) => !prev);
  };

  const showReceipt = () => {
    if (rows.length === 0) {
      return;
    }

    // for local storage...

    // const existingData = localStorage.getItem("tableData");
    // const data = existingData ? JSON.parse(existingData) : [];
    // const updatedData = [...data, ...rows];

    // localStorage.setItem("tableData", JSON.stringify(updatedData));

    setReceipt((prev) => !prev);
    // setRows([]);
  };

  return (
    <>
      {!receipt ? (
        <div className='lg:w-[780px] w-full h-2/3 bg-white flex flex-col fixed rounded overflow-hidden'>
          <div className='w-full h-fit flex justify-between items-center py-2 px-4 border-b border-gray-400'>
            <p>Medical Receipt.</p>
            <div className='flex w-fit h-fit gap-8 items-center'>
              <button
                onClick={showReceipt}
                className='px-5 py-2 h-fit bg-blue-400 hover:bg-opacity-85 rounded flex items-center'
              >
                Save
              </button>
              <button
                className='h-fit flex items-center text-[20px]'
                onClick={showmodal}
              >
                <IoCloseOutline />
              </button>
            </div>
          </div>
          <div className='modal-content bg-white w-full h-fit px-4 overflow-y-auto'>
            <div className='bg-gray-200 w-full h-fit p-4'>
              <div className='flex flex-col h-full w-full rounded-t-md'>
                <User />
                <TableComponent rows={rows} setRows={setRows} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ReceiptModal setReceipt={setReceipt} rows={rows} setModal={setModal} />
      )}
    </>
  );
};

export default Modal;
