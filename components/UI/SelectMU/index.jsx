import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { forwardRef } from "react";

import s from "./select.module.scss";

const SelectMU = forwardRef(
  ({
    value,
    label,
    onChange,
    options,
    className = "",
    width = 200,
    ...props
  }, ref) => {
    return (
      <div className={className}>
        <FormControl  sx={{ m: 0, minWidth: width }}>
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={value}
            label={label}
            ref={ref}
            {...props}
          >
            {options?.map((item) => (
              <MenuItem value={item.value}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
);

SelectMU.displayName = "SelectMU";
export default SelectMU;
