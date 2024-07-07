import React, { Dispatch, SetStateAction } from "react";
import { IoCloseOutline } from "react-icons/io5";
import TableComponent from "./TableComponent";

interface myProps {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ setModal }: myProps) => {
  const showmodal = () => {
    setModal((prev) => !prev);
  };

  return (
    <div className="w-1/2 h-2/3 bg-white flex flex-col fixed rounded overflow-hidden">
      <div className="w-full h-fit flex justify-between items-center py-2 px-4 border-b border-gray-400">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
        <div className="flex w-fit h-fit gap-8 items-center">
          <button className="px-5 py-2 h-fit bg-blue-400 hover:bg-opacity-85 rounded flex items-center">
            Save
          </button>
          <button
            className="h-fit flex items-center text-[20px]"
            onClick={showmodal}
          >
            <IoCloseOutline />
          </button>
        </div>
      </div>
      <div className="modal-content bg-white w-full h-fit px-4 overflow-y-auto">
        <div className="bg-gray-200 w-full h-[600px] p-4">
          <div className="flex flex-col h-full w-full rounded-t-md">
            <div className="bg-white w-full h-fit flex flex-col pt-7 pb-16 px-4 gap-3 rounded-t-md border-b-4 border-gray-500">
              <h1 className="text-[27px]">Invoice</h1>
              <div className="w-full h-fit flex flex-col text-[15px]">
                <h1 className="text-[13px]">Date:</h1>
                <p>04 Jul, 2024</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-full h-fit flex flex-col text-[15px]">
                  <h1 className="text-[13px]">Biiled from:</h1>
                  <p>Hospital test</p>
                </div>
                <div className="w-full h-fit flex flex-col text-[15px]">
                  <h1 className="text-[13px]">Billed to:</h1>
                  <p>Emmnual Afolabi</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-full h-fit flex flex-col text-[15px]">
                  <h1 className="text-[13px]">Service Provider</h1>
                  <p>Hospital Test</p>
                  <p>Lekki, Lagos Nigeria</p>
                  <p>08132556677</p>
                </div>
                <div className="w-full h-fit flex flex-col text-[15px]">
                  <h1 className="text-[13px]">Patient Details</h1>
                  <p>Emmanuel Afolabi</p>
                  <p>08132556677</p>
                </div>
              </div>
            </div>
            <TableComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
