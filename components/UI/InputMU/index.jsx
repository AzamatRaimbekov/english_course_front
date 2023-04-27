import { TextField } from "@mui/material";
import { forwardRef } from "react";
import s from "./input.module.scss";

const InputMU = forwardRef(
  ({ className, label, error, variant = "standard", ...props }, ref) => {
    return (
      <div className={className}>
        <TextField
          error={error?.message ? true : false}
          ref={ref}
          {...props}
          id="standard-basic"
          label={label}
          variant={variant}
        />
        {error?.message && <p className={s.p}>{error.message}</p>}
      </div>
    );
  }
);
InputMU.displayName = "InputMU";
export default InputMU;
