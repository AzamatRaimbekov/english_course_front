import { forwardRef } from "react";
import s from "./select.module.scss";

const Select = forwardRef(() => {
  return (
    <div>
      <div className={clsx(s.container, error?.message && s.isError)}>
        <select
          ref={ref}
          disabled={disable}
          defaultValue={defaultValue}
          placeholder={placeholder}
          {...props}
        >
          {defaultValue && (
            <option value="" hidden>
              {defaultValue}
            </option>
          )}

          {options?.map((option, index) => (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>

        <span className={s.icon}>
          <ArrowDown color="gray" />
        </span>
      </div>
      {error?.message && <p className={s.error}>{error?.message}</p>}
    </div>
  );
});
Select.displayName = "Select";
export default Select;
