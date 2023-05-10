import { Checkbox, FormControlLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import React, { useState } from "react";
import clsx from "clsx";
import { cloneDeep } from "lodash";
import s from "./check-box.module.scss";

const CheckBoxMU = ({
  className,
  Label = "Label",
  list,
  onChange,
  title = "Вопрос",
  error,
  maxValues = 2,
}) => {
  const [array, setArray] = useState([]);
  const onChangeChekcBox = (e) => {
    const id = parseInt(e.target.value);
    const arrayCurrency = cloneDeep(array) || [];
    const indexArray = arrayCurrency.indexOf(id);
    if (indexArray === -1) {
      if (arrayCurrency.length === maxValues) return;
      arrayCurrency.push(id);
      setArray(arrayCurrency);
      onChange(arrayCurrency);
    } else {

      arrayCurrency.splice(indexArray, indexArray + 1);
      setArray(arrayCurrency);
      onChange(arrayCurrency);
    }
  };

  return (
    <div className={className}>
      <p className={s.title}>{title}</p>
      <div className={clsx(s.grid)}>
        {list?.map((item) => (
          <FormGroup key={item.id}>
            <FormControlLabel
              checked={array?.includes(item.id)}
              onChange={onChangeChekcBox}
              value={item.id}
              control={<Checkbox />}
              label={item.label}
            />
          </FormGroup>
        ))}
      </div>
      {error && <p className={s.errorText}>{error?.message}</p>}
    </div>
  );
};

export default CheckBoxMU;
