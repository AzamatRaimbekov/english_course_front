import { useState } from "react";
import clsx from "clsx";
import s from "./dropdown.module.scss";

const DropDownMenu = ({ title, className = "" }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => setShow(!show)}
      onMouseLeave={() => setShow(false)}
      className={clsx(s.container, className)}
      onMouseEnter={() => setShow(true)}
    >
      <p>{title}</p>
      <div className={clsx(s.menu, show && s.active)}>
        <p>Первый уровень</p>
        <p>Воторой уровень</p>
        <p>Третий уровень</p>
      </div>
    </div>
  );
};

export default DropDownMenu;
