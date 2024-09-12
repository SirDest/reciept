import React, { Dispatch, SetStateAction, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import TableComponent from "./TableComponent";
import ReceiptModal from "./ReceiptModal";

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
    const existingData = localStorage.getItem("tableData");
    const data = existingData ? JSON.parse(existingData) : [];
    const updatedData = [...data, ...rows];

    localStorage.setItem("tableData", JSON.stringify(updatedData));

    setReceipt((prev) => !prev);
    setRows([]);
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
                <div className='bg-white w-full h-fit flex flex-col pt-7 pb-16 px-4 gap-3 rounded-t-md border-b-4 border-gray-500'>
                  <h1 className='text-[27px]'>Invoice</h1>
                  <div className='w-full h-fit flex flex-col text-[15px]'>
                    <h1 className='text-[13px]'>Date:</h1>
                    <p>04 Jul, 2024</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='w-full h-fit flex flex-col text-[15px]'>
                      <h1 className='text-[13px]'>Biiled from:</h1>
                      <p>Hospital test</p>
                    </div>
                    <div className='w-full h-fit flex flex-col text-[15px]'>
                      <h1 className='text-[13px]'>Billed to:</h1>
                      <p>Emmnual Afolabi</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='w-full h-fit flex flex-col text-[15px]'>
                      <h1 className='text-[13px]'>Service Provider</h1>
                      <p>Hospital Test</p>
                      <p>Lekki, Lagos Nigeria</p>
                      <p>08132556677</p>
                    </div>
                    <div className='w-full h-fit flex flex-col text-[15px]'>
                      <h1 className='text-[13px]'>Patient Details</h1>
                      <p>Emmanuel Afolabi</p>
                      <p>08132556677</p>
                    </div>
                  </div>
                </div>
                <TableComponent rows={rows} setRows={setRows} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ReceiptModal setReceipt={setReceipt} setModal={setModal} />
      )}
    </>
  );
};

export default Modal;
