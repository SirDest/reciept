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
    duration: 4,
    amount: 4000,
  },
];

const tableHead = ["Date", "Description/Unit", "Duration", "Amount"];

const TableComponent: React.FC = () => {
  const initform = {
    duration: "",
    amount: "",
  };
  const [selected, setSelected] = React.useState("");
  const [selectedAmount, setSelectAmount] = React.useState(initform);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedLabel = event.target.value;
    setSelected(selectedLabel);

    const selectedItem = menuItems.find((item) => item.label === selectedLabel);

    if (selectedItem) {
      setSelectAmount({
        duration: selectedItem.duration.toString(),
        amount: selectedItem.amount.toString(),
      });
    }
  };

  return (
    <div className="w-full h-fit bg-white ">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="">
            {tableHead.map((items, i) => (
              <th key={i} className="border-b text-black border-gray-300 p-4">
                {items}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="even:bg-blue-gray-50/50">
            <td className="p-4">04 July, 2024</td>
            <td className="p-4">
              <Box sx={{ minWidth: 250 }}>
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selected}
                    onChange={handleChange}
                  >
                    {menuItems.map(({ id, label, duration, amount }) => (
                      <MenuItem key={id} value={label}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </td>
            <td className="p-4">
              <div className="flex gap-1">
                <CiSquareMinus className="text-[30px] cursor-pointer" />
                <input
                  readOnly
                  type="text"
                  className="border border-gray-600 rounded-md w-9 h-8 flex place-content-center text-center items-center outline-none focus:outline-none "
                  placeholder="unit"
                  value={selectedAmount.duration}
                />
                <CiSquarePlus className="text-[30px] cursor-pointer" />
              </div>
            </td>
            <td className="p-4">{selectedAmount.amount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
