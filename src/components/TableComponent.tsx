import React from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

const menuItems = [
  {
    id: 1,
    label: "Akinro Destined, 10, 2000",
    name: "Akinro Destined",
    duration: 10,
    amount: 2000,
  },
  {
    id: 2,
    label: "Bliss Ellams, 4, 3400",
    name: "Bliss Ellams",
    duration: 4,
    amount: 3400,
  },
  {
    id: 3,
    label: "Pharoah Moses, 5, 4000",
    name: "Pharoah Moses",
    duration: 5,
    amount: 4000,
  },
];

const tableHead = ["Date", "Description/Unit", "Duration", "Amount"];

const TableComponent: React.FC = () => {
  const initForm = {
    duration: "",
    amount: "",
  };

  const [rows, setRows] = React.useState<
    {
      date: string;
      selected: string;
      selectedAmount: { duration: string; amount: string };
    }[]
  >([]);

  const increaseDuration = (index: number) => {
    const updatedRows = [...rows];
    const currentDuration = parseInt(
      updatedRows[index].selectedAmount.duration
    );
    updatedRows[index].selectedAmount.duration = (
      currentDuration + 1
    ).toString();
    setRows(updatedRows);
  };

  const decreaseDuration = (index: number) => {
    const updatedRows = [...rows];
    const currentDuration = parseInt(
      updatedRows[index].selectedAmount.duration
    );
    if (currentDuration > 0) {
      updatedRows[index].selectedAmount.duration = (
        currentDuration - 1
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
      updatedRows[i].selectedAmount = {
        duration: selectedItem.duration.toString(),
        amount: selectedItem.amount.toString(),
      };
    }
    setRows(updatedRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      { date: "04 July, 2024", selected: "", selectedAmount: initForm },
    ]);
  };

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
                <div className='flex gap-1'>
                  <CiSquareMinus
                    onClick={() => decreaseDuration(index)}
                    className='text-[30px] cursor-pointer'
                  />
                  <input
                    readOnly
                    type='text'
                    className='border border-gray-600 rounded-md w-9 h-8 flex place-content-center text-center items-center outline-none focus:outline-none'
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className='p-4 w-full flex justify-end'>
        <button
          className='text-blue-600 text-[13px] bg-none'
          color='primary'
          onClick={addRow}
        >
          Add new line
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
