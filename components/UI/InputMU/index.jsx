import { TextField } from "@mui/material";
import { forwardRef } from "react";
import s from "./input.module.scss";

// Это наш созданый компонент, который работает точно также, как и системный INPUT но имеет свои стили
// forwardRef - https://legacy.reactjs.org/docs/forwarding-refs.html
// ...props это мы спредом всё скопировали и запихнули в инпут
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
