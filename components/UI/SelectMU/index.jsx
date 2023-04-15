import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import s from "./select.module.scss";

const SelectMU = ({
  value,
  label,
  onChange,
  options,
  className = "",
  width = 200,
}) => {
  return (
    <div className={className}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: width }}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={onChange}
        >
          {options?.map((item) => (
            <MenuItem value={item.value}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectMU;
