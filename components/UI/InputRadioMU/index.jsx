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
    console.log({ ...props });
    console.log(value);
    return (
      <div>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
          <RadioGroup
            {...props}
            //   aria-labelledby="demo-radio-buttons-group-label"
            // defaultValue={1}
            //   name="radio-buttons-group"
          >
            {list?.map((item) => (
              <FormControlLabel
                checked={value === item.id}
                onClick={() => onChange(item.id)}
                value={item.id}
                control={<Radio />}
                label={item.label}
              />
            ))}
            {/* <Radio
                checked={value === item.id}
                onChange={() => onChange(item.id)}
                value={item.id}
              /> */}
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
);

InputRadioMU.displayName = "InputRadioMU";
export default InputRadioMU;
