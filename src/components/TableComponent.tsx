import React, { useEffect } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import { formattedDate } from "./exports/Date";
import { menuItems } from "./exports/Menuitems";

const tableHead = ["Date", "Description/Unit", "Duration", "Amount ($)", ""];

const TableComponent = () => {
  const initForm = {
    duration: "0",
    amount: "0",
  };

  const [rows, setRows] = React.useState<
    {
      date: string;
      selected: string;
      selectedAmount: { duration: string; amount: string };
      originalValue: { duration: string; amount: string };
    }[]
  >(() => {
    const savedRows = localStorage.getItem("tableRows");
    return savedRows ? JSON.parse(savedRows) : [];
  });

  console.log("rows", rows);

  const addRow = () => {
    setRows([
      ...rows,
      {
        date: formattedDate,
        selected: "",
        selectedAmount: initForm,
        originalValue: initForm,
      },
    ]);
  };

  useEffect(() => {
    localStorage.setItem("tableRows", JSON.stringify(rows));
  }, [rows]);

  const increaseDuration = (index: number) => {
    const updatedRows = [...rows];
    const currentAmount = parseInt(updatedRows[index].selectedAmount.amount);
    const currentDuration = parseInt(
      updatedRows[index].selectedAmount.duration
    );

    const originalAmount = parseInt(updatedRows[index].originalValue.amount);
    const originalDuration = parseInt(
      updatedRows[index].originalValue.duration
    );

    if (currentDuration > 0) {
      const incrementDur = (originalDuration * 50) / 100;
      const incrementAmount = (originalAmount * 50) / 100;

      updatedRows[index].selectedAmount.duration = (
        currentDuration + incrementDur
      ).toString();
      updatedRows[index].selectedAmount.amount = (
        currentAmount + incrementAmount
      ).toString();
      setRows(updatedRows);
    }
  };

  const decreaseDuration = (index: number) => {
    const updatedRows = [...rows];
    const currentDuration = parseInt(
      updatedRows[index].selectedAmount.duration
    );
    const currentAmount = parseInt(updatedRows[index].selectedAmount.amount);

    const originalAmount = parseInt(updatedRows[index].originalValue.amount);
    const originalDuration = parseInt(
      updatedRows[index].originalValue.duration
    );

    if (currentDuration > originalDuration) {
      const incrementDur = (originalDuration * 50) / 100;
      const incrementAmount = (originalAmount * 50) / 100;

      updatedRows[index].selectedAmount.duration = (
        currentDuration - incrementDur
      ).toString();

      updatedRows[index].selectedAmount.amount = (
        currentAmount - incrementAmount
      ).toString();
    }
    setRows(updatedRows);
  };

  const handleChange = (event: SelectChangeEvent, i: number) => {
    const selectedLabel = event.target.value;
    const updatedRows = [...rows];
    updatedRows[i].selected = selectedLabel;

    const selectedItem = menuItems.find((item) => item.label === selectedLabel);

    if (selectedItem) {
      updatedRows[i].originalValue = {
        duration: selectedItem.duration.toString(),
        amount: selectedItem.amount.toString(),
      };
      updatedRows[i].selectedAmount = {
        duration: selectedItem.duration.toString(),
        amount: selectedItem.amount.toString(),
      };
    }
    setRows(updatedRows);
  };

  const deleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const calculateSubtotal = () => {
    return rows.reduce(
      (acc, row) => acc + parseFloat(row.selectedAmount.amount),
      0
    );
  };

  const calculateTax = (subtotal: number) => {
    const taxRate = 0.05; // 5% tax
    return subtotal * taxRate;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const discount = 0;
  const total = subtotal + tax - discount;

  return (
    <div className='w-full h-fit bg-white'>
      <table className='w-full min-w-max table-auto text-left'>
        <thead>
          <tr>
            {tableHead.map((item, i) => (
              <th key={i} className='border-b text-black border-gray-300 p-4'>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className='even:bg-blue-gray-50/50 border-b border-gray-200'
            >
              <td className='p-4'>{row.date}</td>
              <td className='p-4'>
                <Box sx={{ minWidth: 250 }}>
                  <FormControl fullWidth>
                    <Select
                      labelId={`select-label-${index}`}
                      id={`select-${index}`}
                      value={row.selected}
                      onChange={(e) => handleChange(e, index)}
                    >
                      {menuItems.map(({ id, label }) => (
                        <MenuItem key={id} value={label}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </td>
              <td className='p-4'>
                <div className='flex gap-1 items-center'>
                  <CiSquareMinus
                    onClick={() => decreaseDuration(index)}
                    className='text-[30px] cursor-pointer'
                  />
                  <input
                    type='text'
                    className='border border-gray-600 rounded-md w-9 h-9 flex place-content-center text-center items-center outline-none focus:outline-none'
                    placeholder='unit'
                    value={row.selectedAmount.duration}
                  />
                  <CiSquarePlus
                    onClick={() => increaseDuration(index)}
                    className='text-[30px] cursor-pointer'
                  />
                </div>
              </td>
              <td className='p-4'>{row.selectedAmount.amount}</td>
              <td className='p-4'>
                <button>
                  <IoTrashOutline onClick={() => deleteRow(index)} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='p-4 w-full flex justify-start'>
        <button
          className='text-blue-600 text-[13px] bg-none'
          color='primary'
          onClick={addRow}
        >
          Add new line
        </button>
      </div>
      <div className='py-8 px-4 w-full flex justify-end'>
        <div className='w-[250px] h-fit text-[13px] flex flex-col justify-center gap-3'>
          <div className='flex w-full justify-between items-center p-1'>
            <p>Subtotal:</p>
            <p>
              $ <span className='text-[15px]'>{subtotal}</span>
            </p>
          </div>
          <div className='flex w-full justify-between items-center p-1'>
            <p>Discount:</p>
            <p>{discount}</p>
          </div>
          <div className='flex w-full justify-between items-center border-b border-gray-300 p-1'>
            <p>Tax: (5%)</p>
            <p>
              $ <span className='text-[15px]'>{tax}</span>
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

export default TableComponent;
