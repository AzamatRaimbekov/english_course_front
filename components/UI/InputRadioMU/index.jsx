import React, { forwardRef } from "react";

import s from "./input-radio-mu.module.scss";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const InputRadioMU = forwardRef(
  ({ list, label, error, onChange, value, ...props }) => {
    return (
      <div>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
          <RadioGroup {...props}>
            {list?.map((item) => (
              <FormControlLabel
                checked={value === item.id}
                onClick={() => onChange(item.id)}
                value={item.id}
                control={<Radio />}
                label={item.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
);

InputRadioMU.displayName = "InputRadioMU";
export default InputRadioMU;
