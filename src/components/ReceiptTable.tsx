import React from "react";

const tableHead = ["Date", "Description/Unit", "Duration (min)", "Amount ($)"];

interface myProps {
  rows: {
    date: string;
    selected: string;
    selectedAmount: {
      duration: string;
      amount: string;
    };
    originalValue: {
      duration: string;
      amount: string;
    };
  }[];
}

const ReceiptTable = ({ rows }: myProps) => {
  const calculateSubtotal = () => {
    return rows.reduce(
      (acc, row) => acc + parseFloat(row.selectedAmount.amount),
      0
    );
  };

  const calculateTax = (subtotal: number) => {
    // 5% tax
    const taxRate = 0.05;
    return subtotal * taxRate;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const discount = 0; // no discount
  const total = subtotal + tax - discount;

  return (
    <div className='w-full bg-white h-fit'>
      <table className='w-full'>
        <thead className='w-full'>
          <tr className='w-full'>
            {tableHead.map((item, i) => (
              <th
                key={i}
                className='border-b text-black border-gray-300 p-4 text-left'
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ date, selected, selectedAmount }, index) => (
            <tr
              key={index}
              className='even:bg-gray-200 border-b border-gray-200 '
            >
              <td className='p-4'>{date}</td>
              <td className='p-4'>{selected}</td>
              <td className='p-4'>{selectedAmount.duration}</td>
              <td className='p-4'>{selectedAmount.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='py-8 px-4 w-full flex justify-end'>
        <div className='w-[250px] h-fit text-[13px] flex flex-col justify-center gap-3'>
          <div className='flex w-full justify-between items-center p-1'>
            <p>Subtotal:</p>
            <p className='flex flex-row items-center text-[15px]'>
              $ {subtotal}
            </p>
          </div>
          <div className='flex w-full justify-between items-center p-1'>
            <p>Discount:</p>
            <p>{discount}</p>
          </div>
          <div className='flex w-full justify-between items-center border-b border-gray-300 p-1'>
            <p>Tax: (5%)</p>
            <p className='flex flex-row justify-between items-center text-[15px]'>
              $ {tax}
            </p>
          </div>
          <div className='flex w-full justify-between p-3 items-center'>
            <p>Total:</p>
            <p className='font-bold text-[20px]'>$ {total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptTable;
